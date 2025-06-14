import NextAuth, {CredentialsSignin} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {query} from "@/lib/db";
import {randomBytes, randomUUID} from "crypto";
import {isSamePassword} from "@/lib/password";

class CustomError extends CredentialsSignin {
    name: string;
    message: string;
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
        this.message = message.replaceAll(" ", "_")
        this.code = this.message;
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "E-mail et mot de passe",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Mot de passe", type: "password"}
            },
            async authorize(credentials ) {
                console.log("Authentification_avec_e-mail_et_mot_de_passe", credentials);
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const rows = await query<{id:string; email:string; password_hash:string; is_email_verified: boolean}[]>(`
                SELECT id, email, password_hash, is_email_verified
                FROM users
                WHERE email = $1
                `, [credentials.email as string]);
                if (rows.length === 0) {
                    console.log("Aucun utilisateur trouvé avec cet e-mail");
                    throw new CustomError("Aucun utilisateur trouvé avec cet e-mail");
                }
                const user = rows[0];

                if (!user.is_email_verified) {
                    console.log("Compte non vérifié");
                    throw new CustomError("Compte non validé, veuillez vérifier votre e-mail.");
                }
                const isPasswordValid = await isSamePassword(credentials.password as string, user.password_hash as string);
                if (!isPasswordValid) {
                    console.log("Mot de passe invalide");
                    throw new CustomError("Mot de passe invalide");
                }

                return {
                    id: user.id,
                    email: user.email,
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 jours,
        updateAge: 24 * 60 * 60, // 24 heures,
        generateSessionToken:() => randomUUID?.() ?? randomBytes(32).toString("hex"),
    },
    jwt: {
    },
    callbacks: {
         jwt({ token , user}) {
             if (user) {
                 token.id = user.id;
             }
            return token;
        },
         session({ session, token }) {
            session.user.id = token.id as string ?? "";
            return session;
        }
    },
    pages: {
        signIn: "/authentification/login",
    },
})
import NextAuth, {CredentialsSignin} from "next-auth";
import {Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {getUserById, query, TSafeUser} from "@/lib/db/db";
import {randomBytes, randomUUID} from "crypto";
import {isSamePassword} from "@/lib/password";
import {JWT} from "next-auth/jwt";

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
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const rows = await query<{id:string; email:string; password_hash:string; is_email_verified: boolean; role: string}[]>(`
                SELECT id, email, password_hash, is_email_verified, role
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
                    role: user.role
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
                 console.log("JWT callback - User authenticated", user);
             }
            return token;
        },
         async session({ session, token }: {session: Session, token: JWT}) {
             const user = (await getUserById(token.id as string))[0];
            session.user.id = token.id as string ?? "";
            session.user.role = (user as TSafeUser)?.role ?? "user"; // Assurez-vous que le rôle est défini
            return session;
        }
    },
    pages: {
        signIn: "/authentification/login",
    },
})
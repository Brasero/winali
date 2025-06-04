import {NextRequest} from "next/server";
import crypto from "node:crypto";
import {query} from "@/lib/db";
import {signInSchema} from "@/lib/zod";
import {hashPassword} from "@/lib/password";
import {sendVerificationMail} from "@/lib/mail";
import {ValidateEmailTemplate} from "@/components/utils/EmailTemplate";

const createTable = async () => {
    return await query(`
    CREATE TABLE IF NOT EXISTS users
(
    id                UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    email             VARCHAR(255)             NOT NULL UNIQUE,
    password_hash     VARCHAR(255)             NOT NULL,
    is_email_verified BOOLEAN                  NOT NULL DEFAULT FALSE,
    first_name        VARCHAR(255)             NOT NULL,
    last_name         VARCHAR(255)             NOT NULL,
    birth_date        TIMESTAMP WITH TIME ZONE NOT NULL,
    validation_token  VARCHAR(255)             NULL,
    created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
    `)
}



export async function POST(req: NextRequest) {
    await createTable();
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({error: "JSON invalide"}), {status: 400});
    }
    const isSafe =  signInSchema.safeParse(body);
    if (!isSafe.success) {
        return new Response(JSON.stringify({error: isSafe.error}), {status: 400});
    }
    const {email, first_name, last_name, birth_date, password} = isSafe.data;
    const hashedPassword = await hashPassword(password);
    const validateToken = crypto.randomUUID();
    const validateURL = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${validateToken}`;
    try {
        const res = await query(`
            SELECT email FROM users WHERE email = $1;
        `, [email]);
        if (res.length > 0) {
            return new Response(JSON.stringify({error: "Déjà inscrit"}), {status: 400});
        }

        await query(`
            INSERT INTO users (email, password_hash, first_name, last_name, birth_date, validation_token, is_email_verified)
            VALUES ($1, $2, $3, $4, $5, $6, FALSE)
        `, [email, hashedPassword, first_name, last_name, birth_date, validateToken]);

        await sendVerificationMail(email, ValidateEmailTemplate({verifyUrl: validateURL}))

        return new Response(JSON.stringify({message: "Inscription réussie."}), {status: 201});
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        return new Response(JSON.stringify({error: "Erreur lors de l'inscription"}), {status: 500});
    }
}
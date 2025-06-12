import {query} from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";
import {NextRequest, NextResponse} from "next/server";
import {sendVerificationMail} from "@/lib/mail";
import {ValidateEmailTemplatePreLunch} from "@/components/utils/EmailTemplate";

const createTable = async () => {
    return await query(`
        CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verification_token TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
    `)
}
const subscribeSchema = z.object({
    email: z.string().email(),
})

export async function POST(request: NextRequest) {
    await createTable();
    let body: {email: string, ref?: string};
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({error: "JSON invalide"}, {status: 400});
    }

    const parseResult = subscribeSchema.safeParse(body);
    if (!parseResult.success) {
        return NextResponse.json({error: "Email invalide"}, {status: 400});
    }
    const {email} = parseResult.data;
    const ref = body.ref || null
    const token = crypto.randomUUID();

    try {
        const res = await query(`
            SELECT email FROM subscribers WHERE email = $1;
        `, [email])
        if (res.length > 0) {
            return NextResponse.json({ message: "Déjà abonné"});
        }

        if (!process.env.NEXT_PUBLIC_APP_URL) {
            throw new Error("Aucun lien pour l'envoi d'e-mail, completer la variable NEXT_PUBLIC_APP_URL")
        }

        await query(
            `INSERT INTO subscribers (email, verification_token) VALUES ($1, $2)`,
            [email, token]
        );

        const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}${ref ? `&ref=${ref}` : ""}`;

        await sendVerificationMail(email, ValidateEmailTemplatePreLunch({verifyUrl: verificationLink}), "Confirmation d’inscription au pré-lancement de Winali");

        return NextResponse.json({message: "E-mail enregistré, un e-mail de confirmation vous a été envoyé."}, {status: 200});
    } catch(err) {
        console.error("Subscribe Error: ", err);
        return NextResponse.json({ error: "Erreur de server" }, {status: 500})
    }
}
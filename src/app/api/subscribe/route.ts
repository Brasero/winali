import {query} from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";
import {NextRequest, NextResponse} from "next/server";

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
    let body: unknown;
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
    const token = crypto.randomUUID();

    try {
        const {rows: existingRows} = await query<{email: string}>(`
            SELECT email FROM subscribers WHERE email = $1
        `, [email])
        if (existingRows.length > 0) {
            return NextResponse.json({ message: "Déjà abonné"});
        }

        await query(
            `INSERT INTO subscribers (email, verification_token) VALUES ($1, $2)`,
            [email, token]
        );

        return NextResponse.json({message: "E-mail enregistré"})
    } catch(err) {
        console.error("Subscribe Error: ", err);
        return NextResponse.json({ error: "Erreur de server" }, {status: 500})
    }
}
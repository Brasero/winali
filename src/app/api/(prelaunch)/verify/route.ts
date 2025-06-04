import {NextRequest, NextResponse} from "next/server";
import {query} from "@/lib/db";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({error: "Token manquant"}, {status: 400})
    }

    try {
        const res = await query(
            "SELECT id, email FROM subscribers WHERE verification_token = $1",
            [token]
        )
        if (res.length === 0) {
            return NextResponse.json({error: "Token invalide"}, {status: 404})
        }
        const subscriber = res[0];
        await query(
            `UPDATE subscribers
            SET is_verified = TRUE, verification_token = NULL
            WHERE id = $1`,
            [subscriber.id]
        )

        return NextResponse.redirect(new URL("/merci", req.url))
    } catch (error) {
        console.error("Verify error : ", error)
        return NextResponse.json({error: "Erreur serveur"}, {status: 500})
    }
}
import {NextRequest, NextResponse} from "next/server";
import {query} from "@/lib/db";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
        return new Response(JSON.stringify({error: "Token manquant"}), {status: 400});
    }
    try {
        const res = await query(
            "SELECT id, email FROM users WHERE validation_token = $1",
            [token]
        );
        if (res.length === 0) {
            return new Response(JSON.stringify({error: "Token invalide"}), {status: 404});
        }
        const user = res[0];
        await query(
            `UPDATE users
             SET is_email_verified = TRUE, validation_token = NULL
             WHERE id = $1`,
            [user.id]
        );

        return NextResponse.redirect(new URL("/merci", req.url));
    } catch (error) {
        console.error("Verify error : ", error);
        return new Response(JSON.stringify({error: "Erreur serveur"}), {status: 500});
    }
}
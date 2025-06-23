import {NextRequest, NextResponse} from "next/server";
import {query} from "@/lib/db";
import {sendEmail} from "@/lib/mail";
import {referralLinkEmail} from "@/components/utils/EmailTemplate";

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
        const referrer_token = crypto.randomUUID();
        const is_referred = searchParams.get("ref");
        let referrer: {id: string} | null = null;
        if (is_referred) {
            const referrerRes = await query<{id: string}[]>(
                "SELECT id FROM subscribers WHERE referrer_token = $1",
                [is_referred]
            )
            if (referrerRes.length === 0) {
                return NextResponse.json({error: "Token de parrain invalide"}, {status: 404})
            }
            referrer = referrerRes[0];
            // Check if the subscriber is already referred by this referrer
            const existingReferrals = await query(
                "SELECT * FROM subscribers WHERE id = $1 AND referrer_token = $2",
                [subscriber.id, is_referred]
            )
            if (existingReferrals.length > 0) {
                return NextResponse.json({message: "Déjà référé"}, {status: 200})
            }
        }
        const emails = await query<{email:string}[]>(
            `UPDATE subscribers
            SET is_verified = TRUE, verification_token = NULL, referrer_token = $2, referrer_id = $3
            WHERE id = $1
            RETURNING email`,
            [subscriber.id, referrer_token, referrer?.id || null]
        )
        const referralLink = `${process.env.NEXT_PUBLIC_APP_URL}/waiting?ref=${referrer_token}`;
        
        await sendEmail(emails[0].email, referralLinkEmail({verifyUrl: referralLink}), "Votre lien de réferencement Winali !");

        return NextResponse.redirect(new URL("/merci", req.url))
    } catch (error) {
        console.error("Verify error : ", error)
        return NextResponse.json({error: "Erreur serveur"}, {status: 500})
    }
}
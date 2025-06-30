import {NextResponse, NextRequest} from "next/server";
import {getUserByEmail, query} from "@/lib/db/db";
import {sendEmail} from "@/lib/mail";
import {resetPasswordEmail} from "@/components/utils/EmailTemplate";

export async function POST(req: NextRequest) {
    let body: FormData;
    try {
        body = await req.formData();
    } catch {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password?error=informations+invalide`, {status: 302});
    }

    const email = body.get('email') as string;
    
    if (!email) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password?error=email+manquant`, {status: 302});
    }
    
    const rows = await getUserByEmail(email);
    if (rows.length === 0) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password?error=email+inconnu`, {status: 302});
    }
    const user = rows[0];
    if (!user.is_email_verified) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password?error=email+non+verifié`, {status: 302});
    }
    const resetToken = crypto.randomUUID(); // Generate a unique reset token
    await query(`
        UPDATE users SET validation_token = $1, updated_at = NOW() WHERE id = $2
    `, [resetToken, user.id]);
    await sendEmail(email, resetPasswordEmail({verifyUrl: `${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password/${resetToken}`}), "Réinitialisation de votre mot de passe Winali");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password?success=true`, {status: 302});
}
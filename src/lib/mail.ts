import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationMail = async (to: string, react: React.FC) => {
    try {
        const {data, error} = await resend.emails.send({
            from: "PartyChance <noreply@digicci.fr>",
            to: [to],
            subject: "Validation de votre inscription",
            react
        })

        if (error) {
            return error
        }
        return data;
    }catch(error){
        return error;
    }
}
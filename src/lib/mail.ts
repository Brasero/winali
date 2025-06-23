import {Resend} from "resend"
import {ReactNode} from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (to: string, react: ReactNode, subject?: string) => {
    try {
        const {data, error} = await resend.emails.send({
            from: "Winali <noreply@winali.fr>",
            to: [to],
            subject: subject || "Winali",
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
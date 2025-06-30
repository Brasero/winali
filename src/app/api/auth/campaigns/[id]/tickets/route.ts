import {stripe} from "@/lib/stripe";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {getCampaignsById, query} from "@/lib/db/db";

export async function POST(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({error: "User ID not found"}, {status: 400});
    }
    const campaignId = (await params).id
    const {quantity} = await req.json()
    const campaignRows = await getCampaignsById(campaignId)
    if (campaignRows.length === 0) {
        return NextResponse.json({error: "Campaign not found"}, {status: 400})
    }
    const campaign = campaignRows[0]
    const amount = quantity * campaign.ticket_price
    const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
            price_data: {
                currency: "eur",
                product_data: {name: `Ticket ${campaign.title} x${quantity}`, description: campaign.description},
                unit_amount: campaign.ticket_price * 100
            },
            quantity: parseInt(quantity),
        }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/campaigns/${campaign.id}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/campaigns/${campaign.id}/cancel`,
        metadata: {campaignID: campaign.id, userId, ticketCount: quantity, ticketPrice: campaign.ticket_price, total: amount }
    });
    await query(`INSERT INTO stripe_transactions (campaign_id, user_id, stripe_charge_id, type, amount) VALUES ($1, $2, $3, 'payment', $4)`,
        [campaignId, userId, stripeSession.id, amount]);
    return NextResponse.json({ url: stripeSession.url })
}
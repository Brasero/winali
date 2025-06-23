import {stripe} from "@/lib/stripe";
import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";
import {getCampaignsById, getUserById, query} from "@/lib/db";
import {handleDrawAndClose} from "@/lib/utils/draw";
import {sendEmail} from "@/lib/mail";
import {SellerCampaignSuccessEmail, WinnerCampaignEmail} from "@/components/utils/EmailTemplate";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const buf = await req.text();
    const sig = (await headers()).get("stripe-signature")!;
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({error: "Webhook Error: " + (err instanceof Error ? err.message : "Unknown error")}, {status: 400});
    }
    if (event.type === "checkout.session.completed") {
        console.log("Checkout session completed:", event.data.object.id);
        const sess = event.data.object as Stripe.Checkout.Session;
        const {campaignID: campaignId, userId, ticketCount, ticketPrice, total}  = sess.metadata!;
        if (!campaignId || !userId || !ticketCount) {
            console.error("Missing metadata in session:", sess.metadata);
            return NextResponse.json({error: "Missing metadata in session"}, {status: 400});
        }
        const totalParsed = parseFloat(total || "0");
        const ticketCountParsed = parseInt(ticketCount, 10);
        if (isNaN(ticketCountParsed) || isNaN(totalParsed)) {
            console.error("Invalid quantity or total in session metadata:", ticketCount, total);
            return NextResponse.json({error: "Invalid quantity or total"}, {status: 400});
        }
        const txRows = await query<{id: string}[]>(
            `SELECT id FROM stripe_transactions WHERE stripe_charge_id = $1`,
            [sess.id]
        )
        if( txRows.length === 0) {
            console.error("Transaction not found for session:", sess.id);
            return NextResponse.json({error: "Transaction not found"}, {status: 404});
        }
        const stripeTxId = txRows[0].id;
        // Insert the ticket purchase into the database
        for (let i = 0; i < ticketCountParsed; i++) {
            const ticket_rows = await query(
                `INSERT INTO tickets (campaign_id, buyer_id, amount_paid) VALUES ($1, $2, $3) RETURNING id`,
                [campaignId, userId, ticketPrice]
            );
            const ticketId = ticket_rows[0].id;
            // Insert into ticket_transactions
            await query(`
                INSERT INTO ticket_payments (ticket_id, stripe_transaction_id)
                VALUES ($1, $2)
            `, [ticketId, stripeTxId]);
        }
        // check if the campaign is fully funded and allow overflow equal false
        const campaignRows = await getCampaignsById(campaignId);
        if (campaignRows.length === 0) {
            console.error("Campaign not found for ID:", campaignId);
            return NextResponse.json({error: "Campaign not found"}, {status: 404});
        }
        const campaign = campaignRows[0];
        // Check if the campaign is fully funded
        const ticketCountRows = await query<{count: number}[]>(
            `SELECT COUNT(*) as count FROM tickets WHERE campaign_id = $1`,
            [campaignId]
        );
        const ticketCountInCampaign = ticketCountRows[0].count;
        if (ticketCountInCampaign >= campaign.min_tickets && !campaign.allow_overflow) {
            // Close the campaign and draw a winner
            const winningTicket = await handleDrawAndClose(campaignId)
            if (!winningTicket) {
                console.error("Failed to draw a winner for campaign:", campaignId);
                return NextResponse.json({error: "Failed to draw a winner"}, {status: 500});
            }
            // notify the seller
            const seller = (await getUserById(campaign.seller_id))[0];
            if (!seller) {
                console.error("Seller not found for campaign:", campaignId);
                return NextResponse.json({error: "Seller not found"}, {status: 404});
            }
            // Notify the winner
            const winner = (await getUserById(winningTicket.buyer_id))[0];
            await sendEmail(seller.email, SellerCampaignSuccessEmail({sellerName: `${seller.first_name} ${seller.last_name}`, campaignTitle: campaign.title}), "Votre campagne est un succès - Winali");
            if (winner) {
                await sendEmail(winner.email, WinnerCampaignEmail({winnerName: `${winner.first_name} ${winner.last_name}`, campaignTitle: campaign.title}), "Vous avez gagné le lots - Winali");
            }
        }
    }
    return NextResponse.json({received: true}, {status: 200});
}
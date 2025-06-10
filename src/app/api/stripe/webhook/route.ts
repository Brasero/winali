import {stripe} from "@/lib/stripe";
import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";
import {query} from "@/lib/db";

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
    }
    return NextResponse.json({received: true}, {status: 200});
}
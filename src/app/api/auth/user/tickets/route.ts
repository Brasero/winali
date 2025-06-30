import {NextResponse} from "next/server";
import {auth} from "@/auth";
import {query} from "@/lib/db/db";

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await query<{
    campaign_id: string;
    campaign_title: string;
    tickets_id: string;
    total_spent: number;
    purchased_at: string;
    is_closed?: boolean; // Optional, if you want to include campaign status
  }[]>(`
      SELECT
          c.id AS campaign_id,
          c.title AS campaign_title,
          c.is_closed AS is_closed,
          t.id AS tickets_id,
          t.amount_paid AS total_spent,
          t.purchased_at AS purchased_at
      FROM tickets t
               JOIN campaigns c ON t.campaign_id = c.id
      WHERE t.buyer_id = $1
      GROUP BY t.id, c.id
      ORDER BY t.id
  `, [session.user.id! as string]);
  if (rows.length === 0) {
    return NextResponse.json({ error: "No tickets found" }, { status: 404 });
  }
  return NextResponse.json(rows, { status: 200 });
}
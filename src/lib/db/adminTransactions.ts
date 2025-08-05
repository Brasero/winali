import {TAdminTransaction} from "@/lib/db/types";
import {query} from "@/lib/db/db";

export const getAdminTransactions = async (page: number, amount: number): Promise<TAdminTransaction[]> => {
  const offset = (page - 1) * amount;
  const rows = await query<TAdminTransaction[]>(`
    SELECT
      t.id,
      u.last_name || ' ' || u.first_name AS "user",
      c.title AS campaign,
      t.type,
      t.amount,
      t.commission_amount,
      t.net_amount,
      t.created_at as date
    FROM stripe_transactions t
    JOIN users u ON t.user_id = u.id
    JOIN campaigns c ON t.campaign_id = c.id
    ORDER BY t.created_at DESC
    LIMIT $1 OFFSET $2;
  `, [amount, offset]);
  return rows.map(row => ({
    ...row,
    status: row.status || 'pending', // Assuming status is not included in the query, set a default
  }));
}
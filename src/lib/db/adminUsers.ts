import {query} from "@/lib/db/db";
import {TAdminUser} from "@/lib/db/types";

export const getAdminUsers = async (page: number, amount: number): Promise<TAdminUser[]> => {
  const offset = (page - 1) * amount;
  const rows = await query<TAdminUser[]>(`
      SELECT
          u.id,
          u.last_name || ' ' || u.first_name AS name,
          u.email,
          u.created_at AS registration_date,
          u.is_email_verified AS email_verified,
          COALESCE(c.campaigns_count, 0) AS campaigns_count,
          COALESCE(t.tickets_count, 0) AS tickets_count,
          COALESCE(t.total_spent, 0) AS total_spent
      FROM users u
               LEFT JOIN (
          SELECT seller_id, COUNT(*) AS campaigns_count
          FROM campaigns
          GROUP BY seller_id
      ) c ON u.id = c.seller_id
               LEFT JOIN (
          SELECT buyer_id, COUNT(*) AS tickets_count, SUM(amount_paid) AS total_spent
          FROM tickets
          GROUP BY buyer_id
      ) t ON u.id = t.buyer_id
      ORDER BY u.created_at DESC
    LIMIT $1 OFFSET $2;
  `, [amount, offset]);
  return rows.map(user => ({
    ...user,
    status: user.email_verified ? 'active' : 'pending',
    total_spent: user.total_spent || 0,
  }));
}
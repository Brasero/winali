import {query} from "@/lib/db/db";
import {TAdminCampaign} from "@/lib/db/types";

export const getAdminCampaigns = async (page: number, amount: number): Promise<TAdminCampaign[]> => {
  const offset = (page - 1) * amount;
  const rows = await query<TAdminCampaign[]>(`
    SELECT
      c.id,
      c.title,
      u.last_name || ' ' || u.first_name AS seller,
      CASE
        WHEN c.is_drawn THEN 'tirage_fait'
        WHEN c.end_date < NOW() AND c.allow_overflow = false THEN 'clos'
        ELSE 'en_cours'
      END AS status,
      COUNT(t.id) AS tickets_sold,
      c.min_tickets AS tickets_target
    FROM campaigns c
    JOIN users u ON c.seller_id = u.id
    LEFT JOIN tickets t ON t.campaign_id = c.id
    GROUP BY c.id, u.last_name, u.first_name, c.created_at
    ORDER BY c.created_at DESC
    LIMIT $1 OFFSET $2;
  `, [amount, offset]);
  return rows;
}

export async function getAdminCampaignQuantity(): Promise<number> {
  const result = await query<{ count: number }[]>(`
    SELECT COUNT(*) AS count FROM campaigns;
  `);
  return result[0]?.count || 0;
}
import { neon } from "@neondatabase/serverless";

export async function query(
    query: string,
    params?: string[]
){
    if(!process.env.DATABASE_DATABASE_URL) throw new Error("URL de la database manquante")
    const sql = neon(process.env.DATABASE_DATABASE_URL)
    const data = await sql.query(query, params);
    return data;
}

export const getCampaignsById = async (campaignId:string) => {
    const rows = await query(`
    SELECT 
    id,seller_id,title,description,image_urls,ticket_price,min_tickets,end_date,is_closed,created_at
    FROM campaigns
    WHERE id=$1
    `,[campaignId])
    return rows
}

export const getTicketByCampaignId = async (campaignId:string) => {
    const rows = await query(`
    SELECT
    id,buyer_id,amount_paid,purchased_at
    FROM tickets
    WHERE campaign_id = $1
    `,[campaignId])
    return rows
}

export const getCampaignAndTicketByCampaignId = async (campaignId:string) => {
    const rows = await query(`
    SELECT
    c.id,c.seller_id,c.title,c.description,c.image_urls,c.ticket_price,c.min_tickets,c.end_date,c.is_closed,c.created_at,
    COALESCE(
      json_agg(t.*) FILTER (WHERE t.id IS NOT NULL),
        '[]'    
    ) AS tickets
    FROM campaigns c
    LEFT JOIN tickets t
    ON c.id= t.campaign_id
    WHERE c.id=$1
    GROUP BY c.id
    `,[campaignId])
    return rows
}
export const getUserById = async (userId:string) => {
    const rows = await query(`
        SELECT * FROM users WHERE id= $1
    `,[userId])
    return rows
}
import { neon } from "@neondatabase/serverless";
import {util} from "zod";
import Omit = util.Omit;

export async function query<T = Record<string, unknown>[]>(
    query: string,
    params?: (string | number | boolean | unknown)[]
): Promise<T> {
    if(!process.env.DATABASE_DATABASE_URL) throw new Error("URL de la database manquante")
    const sql = neon(process.env.DATABASE_DATABASE_URL)
    const data = await sql.query(query, params);
    return data as T;
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

export interface Campaign {
    id: string;
    title: string;
    ticket_price: number;
    min_tickets: number;
    ticket_sells: number;
    is_closed: boolean;
    created_at: string;
    collected: number;
    seller_id: string;
    tickets: [];
    user?: {
        last_name: unknown;
        first_name: unknown;
    }
}
export const getCampaignAndTicketByCampaignId = async (campaignId:string): Promise<Campaign[]> => {
    const rows = await query<Campaign[]>(`
    SELECT
    c.id,c.seller_id,c.title,c.description,c.image_urls,c.ticket_price,c.min_tickets,c.end_date,c.is_closed,c.created_at,
    COALESCE(
      json_agg(t.*) FILTER (WHERE t.id IS NOT NULL),
        '[]'    
    ) AS tickets,
    count(t.id) AS ticket_sells
    FROM campaigns c
    LEFT JOIN tickets t
    ON c.id= t.campaign_id
    WHERE c.id=$1
    GROUP BY c.id
    `,[campaignId])
    return rows
}
export const getCampaignAndTicketDetailBySellerId = async (sellerId: string) => {
    return await query<Campaign[]>(`
        SELECT 
        c.id, c.created_at, c.end_date, c.description, c.description, c.min_tickets, c.title, c.ticket_price, c.is_closed,
        COALESCE(
            json_agg(t.*) FILTER ( WHERE t.id IS NOT NULL),
            '[]'
        ) AS tickets,
        count(t.id) AS ticket_sells
        FROM campaigns c
        LEFT JOIN tickets t 
        ON t.campaign_id = c.id
        WHERE c.seller_id = $1
        GROUP BY c.id
    `, [sellerId])
}

export type TUser = {
    id: string;
    email: string;
    password_hash: string;
    is_email_verified: boolean;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    validation_token: string | null;
    is_seller: boolean;
}

export type TSafeUser = Omit<TUser, "password_hash" | "validation_token">

export const getUserById = async (userId:string) => {
    const rows = await query<TSafeUser[]>(`
        SELECT 
        id,
        first_name,
        last_name,
        email,
        is_email_verified,
        is_seller,
        created_at,
        birth_date,
        updated_at
        FROM users WHERE id= $1
    `,[userId])
    return rows
}
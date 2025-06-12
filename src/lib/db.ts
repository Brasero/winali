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
    allow_overflow: boolean;
    tickets: [];
    image_urls?: string[];
    description: string;
    user?: {
        last_name: unknown;
        first_name: unknown;
    }
}

export const getCampaignsById = async (campaignId:string) => {
    const rows = await query<Campaign[]>(`
    SELECT
    id,seller_id,title,description,image_urls,ticket_price,min_tickets,end_date,is_closed,created_at, allow_overflow
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

export const getCampaignAndTicketByCampaignId = async (campaignId:string): Promise<Campaign[]> => {
    const rows = await query<Campaign[]>(`
    SELECT
    c.id,c.seller_id,c.title,c.description,c.image_urls,c.ticket_price,c.min_tickets,c.end_date,c.is_closed,c.created_at,c.allow_overflow,
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

export interface HeroCampaign extends Campaign {
    description: string;
    image_urls: string[];
}

export const getHeroCampaign = async () => {
    return await query<HeroCampaign[]>(`
        SELECT
        c.id, c.created_at, c.end_date, c.description, c.min_tickets, c.title, c.ticket_price, c.is_closed, c.image_urls,
        COALESCE(
            json_agg(t.*) FILTER ( WHERE t.id IS NOT NULL),
            '[]'
        ) AS tickets,
        count(t.id) AS ticket_sells
        FROM campaigns c
        LEFT JOIN tickets t
        ON t.campaign_id = c.id
        WHERE c.is_closed = false
        GROUP BY c.created_at, c.id
        ORDER BY c.created_at DESC
        LIMIT 1
    
    `)
}

export type BuyerSectionCampaign = Omit<HeroCampaign, "tickets" | "ticket_sells" | "min_tickets" | "ticket_price" > & {
    total_tickets: number;
    ticket_price: number;
    tickets_sold: number;
}

export const getBuyerSectionCampaigns = async () => {
    return await query<BuyerSectionCampaign[]>(`
        SELECT
        c.id,
        c.created_at,
        c.end_date,
        c.description,
        c.min_tickets AS total_tickets,
        c.title,
        c.ticket_price AS ticket_price,
        c.is_closed,
        c.image_urls,
        count(t.id) AS tickets_sold
        FROM campaigns c
        LEFT JOIN tickets t
        ON t.campaign_id = c.id
        WHERE c.is_closed = false
        GROUP BY c.id, c.created_at
        ORDER BY c.created_at DESC
        LIMIT 3
    `)
}

export const getCampaigns = async () => {
    return await query<BuyerSectionCampaign[]>(`
    SELECT
        c.id,
        c.created_at,
        c.end_date,
        c.description,
        c.min_tickets AS total_tickets,
        c.title,
        c.ticket_price AS ticket_price,
        c.is_closed,
        c.image_urls,
        count(t.id) AS tickets_sold
        FROM campaigns c
        LEFT JOIN tickets t
        ON t.campaign_id = c.id
        WHERE c.is_closed = false
        GROUP BY c.id
        ORDER BY tickets_sold DESC
    `)
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

export const getUserByEmail = async (email: string) => {
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
        FROM users WHERE email= $1
    `,[email])
    return rows
}

export interface IWinner {
    first_name: string;
    last_name: string;
    item: string;
    ticket_number: string;
    date: string;
    image: string;
}
export const getTwoLastWinner = async () => {
    return await query<IWinner[]>(`
        SELECT
        u.first_name,
        u.last_name,
        c.title AS item,
        t.id AS ticket_number,
        t.purchased_at AS date,
        c.image_urls[1] AS image
        FROM tickets t
        JOIN campaigns c ON t.campaign_id = c.id
        JOIN users u ON t.buyer_id = u.id
        WHERE c.is_closed = true
        ORDER BY t.purchased_at DESC
        LIMIT 2
    `)
}
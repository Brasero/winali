"use server";
import {neon} from "@neondatabase/serverless";

export async function getData() {
    if (!process.env.DATABASE_DATABASE_URL) {
        throw new Error("DATABASE_DATABASE_URL n'est pas définie.")
    }
    const sql = neon(process.env.DATABASE_DATABASE_URL)
    const data = await sql`SELECT * FROM subscribers;`;
    return data;
}
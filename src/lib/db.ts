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
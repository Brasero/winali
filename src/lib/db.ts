import {Client, QueryResultRow} from "@neondatabase/serverless"

if (!process.env.DATABASE_DATABASE_URL) {
    throw new Error("DATABASE_DATABASE_URL n'est pas défini");
} else {
    console.log(process.env.DATABASE_DATABASE_URL);
}

export const db = new Client({
    connectionString: process.env.DATABASE_DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

export async function query(
    text: string,
    params?: unknown[]
): Promise<{ rows }> {
    const result = db.query(text, params);
    return { rows: result };
}
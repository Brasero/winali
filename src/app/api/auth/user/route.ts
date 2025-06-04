import {auth} from "@/auth";
import {query} from "@/lib/db";

export async function GET() {
    const session = await auth();
    console.log("session:", session);
    if (!session || !session.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
    const rows = await query(`
        SELECT id, email, first_name, last_name, birth_date, created_at, updated_at, is_seller
        FROM users
        WHERE id = $1
    `, [session.user.id! as string]);
    if (rows.length === 0) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
    const user = rows[0];
    return new Response(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
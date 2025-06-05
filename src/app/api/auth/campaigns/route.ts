import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {query} from "@/lib/db";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    // Get some user information
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({error: "User ID not found"}, {status: 400});
    }
    const rows = await query(`
        SELECT 
            id,
            first_name,
            last_name,
            email,
            is_seller
        FROM users
        WHERE id = $1
    `, [userId]);
    if (rows.length === 0) {
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    const user = rows[0];
    // Check if the user is a seller
    if (!user.is_seller) {
        return NextResponse.json({error: "User is not a seller"}, {status: 403});
    }
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400});
    }
    const {title, description, end_date, ticket_price, min_tickets, image_urls, allow_overflow} = body;
    if (!title || !description || !end_date || !ticket_price || !min_tickets || !image_urls) {
        return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }
    // Validate end_date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
        return NextResponse.json({error: "Invalid end_date format, expected YYYY-MM-DD"}, {status: 400});
    }
    // Validate ticket_price and min_tickets
    if (isNaN(ticket_price) || isNaN(min_tickets)) {
        return NextResponse.json({error: "ticket_price and min_tickets must be numbers"}, {status: 400});
    }
    // Validate image_urls
    if (!Array.isArray(image_urls) || image_urls.length === 0) {
        return NextResponse.json({error: "image_urls must be a non-empty array"}, {status: 400});
    }
    // Insert the campaign into the database
    const result = await query(`
        INSERT INTO campaigns (seller_id, title, description, end_date, ticket_price, min_tickets, image_urls, allow_overflow)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `, [userId, title, description, end_date, ticket_price, min_tickets, JSON.stringify(image_urls), allow_overflow || false]);
    if (result.length === 0) {
        return NextResponse.json({error: "Failed to create campaign"}, {status: 500});
    }
    const campaignId = result[0].id;
    return NextResponse.json({message: "Campaign created successfully", campaignId}, {status: 201});
}
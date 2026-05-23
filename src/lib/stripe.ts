import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-08-27.basil",
    typescript: true,
    maxNetworkRetries: 3,
    telemetry: false,
    }
)
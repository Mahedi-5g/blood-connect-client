import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST() {
    try {
        const headersList = await headers();
        const origin =
            headersList.get("origin") || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: process.env.STRIPE_SECRET_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/funding`,
        });

        return NextResponse.json({
            url: session.url,
        });

    } catch (err) {
        console.error("Stripe Checkout Error:", err);

        return NextResponse.json(
            {
                error: err.message,
            },
            {
                status: err.statusCode || 500,
            }
        );
    }
}
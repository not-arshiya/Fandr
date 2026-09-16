import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { creatorUsername, amount } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Support ${creatorUsername}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      creatorUsername: creatorUsername,
    },
    success_url: `${process.env.NEXTAUTH_URL}/${creatorUsername}?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/${creatorUsername}?canceled=true`,
  });

  return Response.json({ url: session.url });
}
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return Response.json({ error: `Webhook signature verification failed` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const client = await clientPromise;
    const db = client.db("fandr");

      await db.collection("payments").insertOne({
      amount: session.amount_total / 100,
      currency: session.currency,
      customerEmail: session.customer_details?.email || null,
      creatorUsername: session.metadata.creatorUsername,
      stripeSessionId: session.id,
      createdAt: new Date(),
    });
  }

  return Response.json({ received: true });
}
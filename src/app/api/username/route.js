import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const { username } = await request.json();

  if (!username || username.length < 3) {
    return Response.json({ error: "Username too short" }, { status: 400 });
  }

  const normalized = username.toLowerCase();

  if (!/^[a-z0-9-]+$/.test(normalized)) {
    return Response.json(
      { error: "Only lowercase letters, numbers, and hyphens allowed" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("fandr");

  const existing = await db.collection("users").findOne({ username: normalized });
  if (existing) {
    return Response.json({ error: "Username already taken" }, { status: 409 });
  }

  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set: { username: normalized } }
  );

  return Response.json({ success: true, username: normalized });
}
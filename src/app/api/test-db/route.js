import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("fandr");
    const collections = await db.listCollections().toArray();
    return Response.json({ success: true, collections });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
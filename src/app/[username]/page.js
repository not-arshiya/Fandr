import clientPromise from "@/lib/mongodb";

export default async function ProfilePage({ params }) {
  const { username } = await params;

  const client = await clientPromise;
  const db = client.db("fandr");
  const user = await db.collection("users").findOne({ username });

  if (!user) {
    return <div style={{ padding: "40px" }}>User not found.</div>;
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <img
        src={user.image}
        alt={user.name}
        style={{ width: "100px", borderRadius: "50%" }}
      />
      <h1>{user.name}</h1>
      <p>@{user.username}</p>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function SupportButton({ username }) {
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(false);

  async function handleSupport() {
    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creatorUsername: username, amount }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{ width: "60px", marginRight: "10px" }}
      />
      <button onClick={handleSupport} disabled={loading}>
        {loading ? "Loading..." : `Support $${amount}`}
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function RedeemButton({
  token,
}: {
  token: string;
}) {
  const [loading, setLoading] = useState(false);

  const redeem = async () => {
    setLoading(true);

    const res = await fetch("/api/redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Link already redeemed");
      window.location.reload();
    }
  };

  return (
    <button
      onClick={redeem}
      disabled={loading}
      className="w-full mt-7 py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition disabled:opacity-60"
    >
      {loading ? "Redeeming..." : "Redeem Link"}
    </button>
  );
}
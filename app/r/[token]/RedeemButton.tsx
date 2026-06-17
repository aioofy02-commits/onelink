"use client";

import { useState } from "react";

export default function RedeemButton({ token }: { token: string }) {
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
      alert(data.error || "Access expired");
      window.location.reload();
    }
  };

  return (
    <button
      onClick={redeem}
      disabled={loading}
      className="w-full mt-7 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#0A66C2] to-cyan-500 hover:scale-[1.02] transition-all shadow-[0_0_35px_rgba(10,102,194,0.45)] disabled:opacity-60"
    >
      {loading ? "Processing..." : "Redeem Now"}
    </button>
  );
}
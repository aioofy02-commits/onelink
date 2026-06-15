"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });

      const data = await res.json();

      if (data.token) {
        setGenerated(
          `${window.location.origin}/r/${data.token}`
        );
      } else {
        alert(data.error || "Failed to generate link");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(generated);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <main className="min-h-screen relative overflow-hidden bg-black text-white flex items-center justify-center px-4">

  {/* Background Glow */}
  <div className="absolute w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full top-10 left-10"></div>
  <div className="absolute w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full bottom-10 right-10"></div>

  <div className="relative max-w-2xl w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

    <h1 className="text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      OneLink
    </h1>

    <p className="text-center text-zinc-400 mt-3 mb-8">
      Secure One-Time Link Generator
    </p>

    <input
      type="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="https://example.com"
      className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none"
    />

    <button
      onClick={generateLink}
      className="w-full mt-4 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition"
    >
      Generate Link
    </button>

    {generated && (
      <div className="mt-6">

        <p className="mb-2 text-zinc-400">
          Generated Link
        </p>

        <div className="p-4 rounded-xl bg-black/30 border border-white/10 break-all">
          {generated}
        </div>

        <button
          onClick={copyLink}
          className="w-full mt-4 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500"
        >
          {copied ? "✅ Copied!" : "📋 Copy Link"}
        </button>

      </div>
    )}

  </div>
</main>
  );
}
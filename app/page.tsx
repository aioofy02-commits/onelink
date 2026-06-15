
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [password, setPassword] = useState("");

  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const generateLink = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    const verify = await fetch("/api/verify-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });

    if (!verify.ok) {
      alert("Wrong Password");
      return;
    }

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          note,
        }),
      });

      const data = await res.json();

      if (data.token) {
        const link = `${window.location.origin}/r/${data.token}`;

        setGenerated(link);
        setShowPopup(true);
      }
        
      else {
        alert(data.error || "Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      generated
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <main className="min-h-screen relative overflow-hidden bg-black text-white flex items-center justify-center px-4 py-10">

        <div className="absolute w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full top-0 left-0"></div>

        <div className="absolute w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full bottom-0 right-0"></div>

        <div className="relative max-w-2xl w-full">

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center justify-center gap-3 mb-4">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                ✓
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  OneLink
</h1>

            </div>

            <p className="text-center text-zinc-400 mt-4 mb-10 text-lg">
  Create secure, single-use links with password protection
</p>

            <label className="block mb-2 text-sm text-zinc-400">
              TARGET URL
            </label>

            <input
              type="url"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="https://example.com"
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 mb-6 outline-none focus:border-purple-500"
            />

            <label className="block mb-2 text-sm text-zinc-400">
              NOTE (OPTIONAL)
            </label>

            <textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              maxLength={500}
              placeholder="Add a message..."
              className="w-full h-32 resize-none p-4 rounded-2xl bg-black/30 border border-white/10 mb-2 outline-none focus:border-purple-500"
            />

            <p className="text-right text-xs text-zinc-500 mb-6">
              {note.length}/500
            </p>

            <label className="block mb-2 text-sm text-zinc-400">
              GENERATION PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter Password"
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 mb-8 outline-none focus:border-purple-500"
            />

            <button
  onClick={generateLink}
  className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.4)]"
>
  ⚡ Generate Secure Link
</button>

          </div>

        </div>

      </main>

     {showPopup && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">

    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-zinc-950 p-8 shadow-2xl">

  <div className="flex justify-center">
    <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-4xl">
      ✓
    </div>
  </div>

  <h2 className="text-center text-3xl font-bold mt-5">
    Link Created
  </h2>

  <p className="text-center text-zinc-400 mt-2">
    Your secure one-time link is ready
  </p>

 <div className="mt-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-700 break-all">
  <p className="text-white text-sm font-mono">
    {generated}
  </p>
</div>

  <button
    onClick={copyLink}
    className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold"
  >
    {copied
      ? "✅ Copied!"
      : "📋 Copy Link"}
  </button>

  <button
    onClick={() => setShowPopup(false)}
    className="w-full mt-3 py-4 rounded-2xl border border-zinc-700"
  >
    Close
  </button>

</div>

  </div>
)}
    </>
  );
}
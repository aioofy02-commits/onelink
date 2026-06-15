"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] =
    useState("");

  const router = useRouter();

  const login = async () => {
    const res = await fetch(
      "/api/admin-login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Wrong Password");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-zinc-800"
        />

        <button
          onClick={login}
          className="w-full mt-4 py-4 rounded-xl bg-blue-600"
        >
          Login
        </button>

      </div>

    </main>
  );
}
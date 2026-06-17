import RedeemButton from "./RedeemButton";
import { supabase } from "@/lib/supabase";

export default async function RedeemPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const { data } = await supabase
    .from("links")
    .select("*")
    .eq("token", token)
    .single();

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Link Not Found</h1>
          <p className="text-zinc-400 mt-3">This link does not exist.</p>
        </div>
      </main>
    );
  }

  if (data.is_redeemed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <div className="text-6xl mb-4">⚠️</div>

          <h1 className="text-3xl font-bold">
            Already Redeemed
          </h1>

          <p className="text-zinc-400 mt-3">
            This one-time link has already been used.
          </p>

          <a
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-white text-black font-semibold"
          >
            Go Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">

        <div className="text-6xl mb-5">🔐</div>

        <h1 className="text-3xl font-bold">
          Secure One-Time Link
        </h1>

        {data.note && (
          <p className="text-zinc-400 mt-4">
            {data.note}
          </p>
        )}

        <p className="text-zinc-500 mt-4 text-sm">
          This link can be opened only once. Click the button below to redeem it.
        </p>

        <RedeemButton token={token} />

      </div>
    </main>
  );
}
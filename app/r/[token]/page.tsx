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
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white/5 border border-white/10 rounded-3xl p-8">
          <h1 className="text-3xl font-bold">Link Unavailable</h1>
          <p className="text-slate-400 mt-3">
            This access link is no longer available.
          </p>
        </div>
      </main>
    );
  }

  if (data.is_redeemed) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl">
            🔒
          </div>

          <h1 className="text-3xl font-bold">
            Access Expired
          </h1>

          <p className="text-slate-400 mt-3">
            This premium access session has expired.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white flex items-center justify-center px-4 py-10">
      <div className="absolute w-96 h-96 bg-blue-600/25 blur-[120px] rounded-full top-0 left-0" />
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full bottom-0 right-0" />

      <div className="relative max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 text-center shadow-2xl">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0A66C2] to-cyan-500 flex items-center justify-center text-4xl mb-6 shadow-lg">
          💼
        </div>

        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 mb-3">
          Premium Access
        </p>

        <h1 className="text-3xl font-bold">
          LinkedIn Premium
        </h1>

        <p className="text-slate-400 mt-4">
          Your premium redemption link is ready.
        </p>

        {data.note && (
          <div className="mt-5 rounded-2xl bg-black/30 border border-white/10 p-4 text-slate-300 text-sm">
            {data.note}
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-blue-500/10 border border-blue-400/20 p-4">
          <p className="text-sm text-slate-300">
            Click below to continue and activate your premium access.
          </p>
        </div>

        <RedeemButton token={token} />
      </div>
    </main>
  );
}
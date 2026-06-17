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
    return <main className="min-h-screen bg-black text-white flex items-center justify-center">Link Not Found</main>;
  }

  if (data.is_redeemed) {
    return <main className="min-h-screen bg-black text-white flex items-center justify-center">Already Redeemed</main>;
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
        <div className="text-6xl mb-5">🔐</div>
        <h1 className="text-3xl font-bold">Secure One-Time Link</h1>
        <p className="text-zinc-400 mt-4">Click redeem now to open the target link.</p>
        <RedeemButton token={token} />
      </div>
    </main>
  );
}
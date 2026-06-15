import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function RedirectPage({
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
  <main className="min-h-screen bg-black text-white flex items-center justify-center">

    <div className="text-center">

      <h1 className="text-5xl font-bold mb-4">
        404
      </h1>

      <p className="text-zinc-400">
        Link not found.
      </p>

    </div>

  </main>
);
  }

  if (data.is_redeemed) {
    return (
  <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

    <div className="max-w-md w-full text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="text-6xl mb-4">
        ⚠️
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Link Already Redeemed
      </h1>

      <p className="text-zinc-400 mb-6">
        This one-time link has already been used and is no longer available.
      </p>

      <a
        href="/"
        className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Go Home
      </a>

    </div>

  </main>
);
  }

  await supabase
    .from("links")
    .update({
      is_redeemed: true,
      click_count: data.click_count + 1,
    })
    .eq("token", token);

  redirect(data.original_url);
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function AdminPage() {

    const cookieStore =
  await cookies();

const admin =
  cookieStore.get("admin");

if (!admin) {
  redirect("/admin/login");
}
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .order("created_at", { ascending: false });

  const totalLinks = links?.length || 0;

  const redeemedLinks =
    links?.filter((link) => link.is_redeemed).length || 0;

  const activeLinks =
    links?.filter((link) => !link.is_redeemed).length || 0;

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Total Links
          </p>

          <h2 className="text-4xl font-bold">
            {totalLinks}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Redeemed
          </p>

          <h2 className="text-4xl font-bold text-green-500">
            {redeemedLinks}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Active
          </p>

          <h2 className="text-4xl font-bold text-blue-500">
            {activeLinks}
          </h2>
        </div>

      </div>

      <div className="bg-zinc-900 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b border-zinc-800">

              <th className="text-left p-4">
                Token
              </th>

              <th className="text-left p-4">
                URL
              </th>

              <th className="text-left p-4">
                Clicks
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Link
              </th>

            </tr>
          </thead>

          <tbody>

            {links?.map((link) => (
              <tr
                key={link.id}
                className="border-b border-zinc-800"
              >

                <td className="p-4 font-mono">
                  {link.token}
                </td>

                <td className="p-4 max-w-md truncate">
                  {link.original_url}
                </td>

                <td className="p-4">
                  {link.click_count}
                </td>

                <td className="p-4">

                  {link.is_redeemed ? (
                    <span className="text-red-500">
                      Redeemed
                    </span>
                  ) : (
                    <span className="text-green-500">
                      Active
                    </span>
                  )}

                </td>

                <td className="p-4">
                  <a
                    href={`/r/${link.token}`}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Open
                  </a>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
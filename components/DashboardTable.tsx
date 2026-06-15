"use client";

import { useState } from "react";

export default function DashboardTable({
  links,
}: {
  links: any[];
}) {
  const [search, setSearch] = useState("");

  const filtered = links.filter(
    (link) =>
      link.token
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      link.original_url
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const deleteLink = async (id: string) => {
    const ok = confirm(
      "Delete this link?"
    );

    if (!ok) return;

    await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    location.reload();
  };

  const copyLink = async (
    token: string
  ) => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/r/${token}`
    );

    alert("Copied!");
  };

  return (
    <div>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full mb-4 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
      />

      <div className="bg-zinc-900 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b border-zinc-800">

              <th className="p-4 text-left">
                Token
              </th>

              <th className="p-4 text-left">
                URL
              </th>

              <th className="p-4 text-left">
                Clicks
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filtered.map((link) => (
              <tr
                key={link.id}
                className="border-b border-zinc-800"
              >

                <td className="p-4">
                  {link.token}
                </td>

                <td className="p-4 truncate max-w-md">
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

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      copyLink(
                        link.token
                      )
                    }
                    className="px-3 py-2 rounded-lg bg-blue-600"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() =>
                      deleteLink(
                        link.id
                      )
                    }
                    className="px-3 py-2 rounded-lg bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
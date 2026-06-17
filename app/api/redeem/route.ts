import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Link not found" },
        { status: 404 }
      );
    }

    if (data.is_redeemed) {
      return NextResponse.json(
        { error: "This link has already been redeemed" },
        { status: 410 }
      );
    }

    await supabase
      .from("links")
      .update({
        is_redeemed: true,
        click_count: (data.click_count || 0) + 1,
      })
      .eq("token", token);

    return NextResponse.json({
      url: data.original_url,
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
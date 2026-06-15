
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { url, note } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400 }
      );
    }

    const token = nanoid(12);

    const { error } = await supabase
      .from("links")
      .insert([
        {
          token,
          original_url: url,
          note,
        },
      ]);

    if (error) {
      console.log(
        "SUPABASE ERROR:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      token,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

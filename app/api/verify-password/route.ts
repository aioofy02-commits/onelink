import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (
    password === process.env.GENERATOR_PASSWORD
  ) {
    return NextResponse.json({
      success: true,
    });
  }

  return NextResponse.json(
    {
      error: "Wrong Password",
    },
    {
      status: 401,
    }
  );
}
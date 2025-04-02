import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@example.com" && password === "12345") {
    return NextResponse.json({ token: "mock-jwt-token" });
  }

  return NextResponse.json(
    { message: "نام کاربری یا رمز عبور اشتباه است." },
    { status: 401 }
  );
}

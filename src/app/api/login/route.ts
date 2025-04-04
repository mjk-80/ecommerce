//این تابع برای بررسی اطلاعات ورودی (ایمیل و رمز عبور ) استفاده میشود
//برای اینکه authorization انجام شود باید مقادیر زیر را وارد کنید
//email = admin@example.com
//password = 12345

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

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Lỗi khôi phục mật khẩu" });
  }
}

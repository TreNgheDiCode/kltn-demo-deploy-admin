import { DataCountries } from "@/lib/country";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countries = DataCountries;

    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    console.log("GET COUNTRY ERROR", error);
    return NextResponse.json(
      { error: "Lấy thông tin địa chỉ thất bại" },
      { status: 500 }
    );
  }
}

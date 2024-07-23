import { GetSchools } from "@/data/schools";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    let page = undefined;
    let pageSize = undefined;
    if (searchParams.has("page")) {
      page = parseInt(searchParams.get("page") as string);
    }
    if (searchParams.has("pageSize")) {
      pageSize = parseInt(searchParams.get("pageSize") as string);
    }

    const schools = await GetSchools(page, pageSize);

    return NextResponse.json({ schools }, { status: 200 });
  } catch (error) {
    console.log("GET SCHOOLS API ERROR", error);

    return NextResponse.json(
      { error: "Lỗi lấy danh sách trường học" },
      { status: 500 }
    );
  }
}

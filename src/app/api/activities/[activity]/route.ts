import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params = { activity: "" } }) {
  try {
    console.log(params, req.url, req.nextUrl.searchParams.getAll("orderBy"));
    return NextResponse.json({ error: "Unknown" });
  } catch (error) {
    return NextResponse.json({ error: "Unknown" });
  }
}

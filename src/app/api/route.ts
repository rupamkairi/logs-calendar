import db, { execute } from "@/utils/database/surrealdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let result = await execute(() => db.select("person"));
    return NextResponse.json({ message: "Success", result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error });
  }
}

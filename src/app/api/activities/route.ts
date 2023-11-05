import { NextRequest, NextResponse } from "next/server";
import { DateTime, Duration } from "luxon";
import db, { execute } from "@/utils/database/surrealdb";
import { activities } from "@/utils/database/tables";

export async function GET(req: NextRequest) {
  try {
    let result = (await execute(() => db.select(activities))) ?? [];

    return NextResponse.json({
      result,
      // body,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // console.log(body);

    let date = DateTime.fromFormat(body.date, "yyyy-MM-dd");
    let start_time = Duration.fromISOTime(body.start_time);
    let end_time = Duration.fromISOTime(body.end_time);
    // console.log(date.plus(start_time).toISO(), date.plus(end_time).toISO());

    let datetime = DateTime.now();
    if (body.datetime) datetime = DateTime.fromISO(body.datetime);

    let start_datetime = date.plus(start_time);
    if (body.start_datetime)
      start_datetime = DateTime.fromISO(body.start_datetime);

    let end_datetime = date.plus(end_time);
    if (body.start_datetime)
      start_datetime = DateTime.fromISO(body.end_datetime);

    let data = {
      title: body.title,
      details: body.details,
      attachments: body.attachments,
      datetime: datetime.toISO(),
      start_datetime: start_datetime?.toISO(),
      end_datetime: end_datetime.toISO(),
    };
    let result = await execute(() => db.insert(activities, data));

    return NextResponse.json({
      data,
      body,
      result,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

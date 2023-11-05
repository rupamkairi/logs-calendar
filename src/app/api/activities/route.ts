import { NextRequest, NextResponse } from "next/server";
import { DateTime, Duration } from "luxon";

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

    return NextResponse.json({
      result: {
        title: body.title,
        details: body.details,
        attachments: body.attachments,
        datetime: datetime.toISO(),
        start_datetime: start_datetime?.toISO(),
        end_datetime: end_datetime.toISO(),
      },
      body,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

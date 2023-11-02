import { NextRequest, NextResponse } from "next/server";
import { DateTime, Duration } from "luxon";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let datetime = DateTime.now();
    if (body.datetime) datetime = DateTime.fromISO(body.datetime);

    let start_datetime = null;
    if (body.start_datetime)
      start_datetime = DateTime.fromISO(body.start_datetime);

    let end_datetime = DateTime.now();
    if (body.start_datetime)
      start_datetime = DateTime.fromISO(body.end_datetime);

    return NextResponse.json({
      result: {
        datetime: datetime.toISO(),
        start_datetime: start_datetime?.toISO(),
        end_datetime: end_datetime.toISO(),
        body,
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

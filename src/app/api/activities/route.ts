import {
  insertActivity,
  mergedCreateActivity,
  postActivity,
} from "@/types/dto/activities.dto";
import db, { execute } from "@/utils/database/surrealdb";
import { activities } from "@/utils/database/tables";
import { DateTime, Duration } from "luxon";
import { NextRequest, NextResponse } from "next/server";
import sample_activities from "@/../data/sample/activities.json";

export async function GET(req: NextRequest) {
  try {
    let result =
      (await execute(() => db.select(activities))) ?? sample_activities.result;

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
    const payload: postActivity = await req.json();
    let body = { ...payload } as mergedCreateActivity;
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

    let data: insertActivity = {
      title: body.title,
      details: body.details,
      attachments: body.attachments,
      datetime: datetime.toISO()!,
      start_datetime: start_datetime?.toISO()!,
      end_datetime: end_datetime.toISO()!,
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

import { DateTime } from "luxon";
import { Merge, Nullablelify, Optionalablify } from "../tsutils";

export type activity = {
  id: string;
  datetime: string;
  start_datetime: string;
  end_datetime: string;
  title: string;
  details: string;
  attachments: string;
};

export type postActivity = {
  date: string;
  _date: typeof DateTime;
  start_date?: string;
  start_time: string;
  end_date?: string;
  end_time: string;
  title: string;
  details: string;
  attachments: string;
};

// export type insertActivity = Partial<activity>;
export type insertActivity = {
  datetime: string;
  start_datetime: string;
  end_datetime: string;
  title: string;
  details: string;
  attachments: string;
};

export type mergedCreateActivity = Merge<postActivity, insertActivity>;

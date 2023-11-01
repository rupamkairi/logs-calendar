"use client";

import React, { Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function LogsCalendar() {
  return (
    <div className="max-h-screen">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: new Date() },
          { title: "event 2", date: new Date() },
        ]}
        dateClick={(arg) => {
          console.log(arg);
        }}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <Fragment>
      <div>{eventInfo.timeText}</div>
      <div>{eventInfo.event.title}</div>
    </Fragment>
  );
}

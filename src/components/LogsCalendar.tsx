"use client";

import React, {
  Fragment,
  LegacyRef,
  ReactNode,
  forwardRef,
  useRef,
} from "react";
import FullCalendar from "@fullcalendar/react";
import luxonPlugin, {
  toLuxonDateTime,
  toLuxonDuration,
} from "@fullcalendar/luxon3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { computePosition, autoPlacement } from "@floating-ui/dom";
import "@/styles/fc-overwrites.css";
import LogForm from "./LogForm";

export function LogsCalendar() {
  const tooltipRef = useRef<HTMLDivElement>(null);

  async function compP(reference: HTMLElement, tooltip: HTMLElement) {
    const { x, y } = await computePosition(reference, tooltip, {
      placement: "right-start",
      middleware: [
        autoPlacement({
          alignment: "start",
          autoAlignment: false,
        }),
      ],
    });
    console.log({ x, y });
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  return (
    <div className="max-h-screen container mx-auto">
      <FullCalendar
        plugins={[luxonPlugin, dayGridPlugin, interactionPlugin]}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        events={[
          { title: "Event 1", date: new Date() },
          { title: "Event 2", date: new Date(), display: "background" },
        ]}
        selectable={true}
        selectMirror={false}
        unselectAuto={false}
        selectOverlap={true}
        selectAllow={(selectInfo) => {
          // console.log("selectAllow", selectInfo);
          return true;
        }}
        dateClick={(arg) => {
          // console.log("dateClick", arg);
          const reference = arg.dayEl,
            tooltip = tooltipRef.current as HTMLElement;
          compP(reference, tooltip);
        }}
        select={(arg) => {
          // console.log("select", arg);
        }}
        unselect={(arg) => {
          // console.log("unselect", arg);
        }}
      />
      <Tooltip ref={tooltipRef}>
        <LogForm />
      </Tooltip>
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <Fragment>
      <div>{eventInfo.timeText}</div>
      <div>, {eventInfo.event.title}</div>
    </Fragment>
  );
}

const Tooltip = forwardRef<
  HTMLDivElement | HTMLElement,
  { children: ReactNode }
>(function Tooltip({ children }, ref) {
  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className="absolute z-30">
      <div className="bg-white rounded shadow">
        <>{children}</>
      </div>
    </div>
  );
});

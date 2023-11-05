import "@/styles/fc-overwrites.css";
import { autoPlacement, computePosition } from "@floating-ui/dom";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import luxonPlugin from "@fullcalendar/luxon3";
import FullCalendar from "@fullcalendar/react";
import {
  Fragment,
  LegacyRef,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import LogForm from "./LogForm";
import { EventSourceInput } from "@fullcalendar/core/index.js";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function LogsCalendar() {
  const { data, error, isLoading } = useSWR("/api/activities", fetcher);

  const [fullCalendar, setFullCalendar] = useState<any>(null);
  const [events, setEvents] = useState<EventSourceInput>();

  useEffect(() => {
    if (!data) return;

    const { result } = data;
    // console.log(result[0]);
    let _events = [];
    result?.forEach((el: any) => {
      let _event = {
        title: el.title,
        date: new Date(el.datetime),
      };

      console.log({
        start: new Date(el.start_datetime),
        end: new Date(el.end_datetime),
      });

      _events.push(_event);
    });

    setEvents(_events);
  }, [data]);

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
    // console.log({ x, y });
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  return (
    <div className="max-h-screen container mx-auto">
      <FullCalendar
        plugins={[luxonPlugin, dayGridPlugin, interactionPlugin]}
        eventContent={RenderEventContent}
        initialView="dayGridMonth"
        // events={[
        //   { title: "Event 1", date: new Date() },
        //   { title: "Event 2", date: new Date(), display: "background" },
        // ]}
        events={events}
        selectable={true}
        selectMirror={false}
        unselectAuto={false}
        selectOverlap={true}
        selectAllow={(selectInfo) => {
          // console.log("selectAllow", selectInfo);
          return true;
        }}
        eventClick={(arg) => {
          console.log(arg);
        }}
        dateClick={(arg) => {
          // console.log("dateClick", arg);
          setFullCalendar(arg);
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
        <LogForm calendar={fullCalendar} />
      </Tooltip>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function RenderEventContent(eventInfo: any) {
  return (
    <Fragment>
      <div className="border">
        {/* <div>{eventInfo.timeText}</div> */}
        <div>, {eventInfo.event.title}</div>
      </div>
    </Fragment>
  );
}

const Tooltip = forwardRef<
  HTMLDivElement | HTMLElement,
  { children: ReactNode }
>(function Tooltip({ children }, ref) {
  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className="absolute z-30">
      <div className="">
        <>{children}</>
      </div>
    </div>
  );
});

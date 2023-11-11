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
import { EventInput, EventSourceInput } from "@fullcalendar/core/index.js";
import { useUIStore } from "@/store/store";
import { activity } from "@/types/dto/activities.dto";
import LogsExport from "./LogsExport";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function LogsCalendar() {
  const { showForm, toggleForm } = useUIStore();

  const { data, error, isLoading } = useSWR("/api/activities", fetcher);

  const [fullCalendar, setFullCalendar] = useState<any>(null);
  const [events, setEvents] = useState<EventSourceInput>();

  useEffect(() => {
    if (!data) return;

    const result = data.result as activity[];
    console.log(result);
    let _events: EventInput[] = [];
    result?.forEach((el) => {
      let _event: EventInput = {
        title: el.title,
        date: new Date(el.datetime),
        start: new Date(el.start_datetime),
        end: new Date(el.end_datetime),
        overlap: false,
      };

      // console.log({
      //   start: new Date(el.start_datetime),
      //   end: new Date(el.end_datetime),
      // });

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
    <div className="max-h-screen container mx-auto px-2">
      <div>
        <LogsExport />
      </div>
      <FullCalendar
        plugins={[luxonPlugin, dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "title",
          right: "prev,next today",
        }}
        // dayCellContent={RenderDayCellContent}
        eventContent={RenderEventContent}
        initialView="dayGridMonth"
        eventOverlap={false}
        slotEventOverlap={false}
        selectOverlap={false}
        selectMirror={false}
        unselectAuto={false}
        expandRows={false}
        selectable={true}
        events={events}
        selectAllow={(selectInfo) => {
          // console.log("selectAllow", selectInfo);
          return true;
        }}
        eventClick={(arg) => {
          console.log(arg);
        }}
        dateClick={(arg) => {
          // console.log("dateClick", arg);
          if (!showForm) toggleForm();
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
        {showForm && <LogForm calendar={fullCalendar} />}
      </Tooltip>

      {/* <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

function RenderDayCellContent(dayInfo: any) {
  console.log(dayInfo);

  return (
    <Fragment>
      <div></div>
    </Fragment>
  );
}

function RenderEventContent(eventInfo: any) {
  return (
    <Fragment>
      <div className="rounded px-2 font-semibold bg-primary overflow-scroll">
        <div className="flex items-center">
          {/* <div>{eventInfo.timeText}</div> */}
          <div className="text-primary-content"> {eventInfo.event.title}</div>
        </div>
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

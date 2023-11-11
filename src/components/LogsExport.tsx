import { Icon } from "@iconify/react";

export default function LogsExport() {
  return (
    <div className="mt-4 mb-8 flex justify-between items-center">
      <div>{/* <h1 className="text-4xl font-black">Logs Calendar</h1> */}</div>
      <div className="flex gap-2">
        <button className="btn">
          <Icon icon={"ic:round-settings"} className="h-4 w-4" />
        </button>
        <button className="btn btn-accent">Export</button>
      </div>
    </div>
  );
}

import { useState, type ReactNode } from "react";
import ScheduleLeft from "./schedule-left";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ScheduleRight from "./schedule-right";
import { useEventData } from "@/hooks/useEventData";

dayjs.extend(localizedFormat);

export default function Schedule(): ReactNode {
  // Fetch event data using the custom hook
  const { scheduleData } = useEventData();
  if (!scheduleData || Object.keys(scheduleData).length === 0) {
    return null;
  }

  const currentDate = dayjs().format("LL");

  const [date, setDate] = useState<string>(
    currentDate in scheduleData ? currentDate : Object.keys(scheduleData)[0]
  );

  return (
    <section
      id="schedule"
      className="my-20 w-full flex border-t-1 border-b-1 border-light-gray/90 max-lg:flex-col"
    >
      <ScheduleLeft
        dates={Object.keys(scheduleData)}
        setDate={setDate}
        date={date}
      />
      <ScheduleRight scheduleData={scheduleData} date={date} />
    </section>
  );
}

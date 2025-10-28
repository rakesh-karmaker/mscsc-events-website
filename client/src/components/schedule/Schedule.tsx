import type { ScheduleType } from "@/types/globalTypes";
import { useState, type ReactNode } from "react";
import ScheduleLeft from "./ScheduleLeft";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ScheduleRight from "./ScheduleRight";

dayjs.extend(localizedFormat);

type ScheduleProps = {
  scheduleData: { [date: string]: ScheduleType[] };
};

export default function Schedule({ scheduleData }: ScheduleProps): ReactNode {
  const currentDate = dayjs().format("LL");

  const [date, setDate] = useState<string>(
    currentDate in scheduleData ? currentDate : Object.keys(scheduleData)[0]
  );

  return (
    <section
      id="schedule"
      className="my-20 w-full flex border-t-1 border-b-1 border-light-gray/90"
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

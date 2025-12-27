import type { ScheduleType } from "@/types/global-types";
import type { ReactNode } from "react";
import Icon from "../ui/icon";

export default function ScheduleCard({
  scheduleData,
}: {
  scheduleData: ScheduleType;
}): ReactNode {
  return (
    <div className="w-full h-fit pl-10 max-lg:pl-0 py-5 border-b-2 border-primary last:border-b-0">
      <div className="w-full pr-[calc((100vw-var(--max-width))/2)] max-lg:px-[calc((100vw-var(--max-width))/2)]! flex max-sm:flex-col gap-3 items-center max-sm:items-start">
        <div className="w-16 h-16 rounded-sm bg-primary flex justify-center items-center">
          <Icon
            iconName={scheduleData.icon}
            className="text-white w-9 h-9 min-w-9 min-h-9"
          />
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex flex-col">
            <span className="text-[0.95rem] font-medium text-primary/80">
              {scheduleData.time}
            </span>
            <h4 className="text-[1.3rem] font-medium text-primary">
              {scheduleData.title}
            </h4>
          </div>
          <p className="text-[0.9rem]/[120%] text-text">
            {scheduleData.description}
          </p>
        </div>
      </div>
    </div>
  );
}

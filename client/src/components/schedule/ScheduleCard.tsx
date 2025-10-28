import type { ScheduleType } from "@/types/globalTypes";
import type { ReactNode } from "react";
import Icon from "../ui/Icon";

export default function ScheduleCard({
  scheduleData,
  isLast,
}: {
  scheduleData: ScheduleType;
  isLast: boolean;
}): ReactNode {
  return (
    <div
      className="w-full h-fit pl-10 max-lg:pl-0 py-5 border-b-1 border-light-gray/90"
      style={{
        borderBottom: isLast
          ? "none"
          : "1px solid color-mix(in oklab, var(--light-gray) 90%, transparent)",
      }}
    >
      <div className="w-full pr-[calc((100vw-var(--max-width))/2)] max-lg:!px-[calc((100vw-var(--max-width))/2)] flex max-sm:flex-col gap-3 items-center max-sm:items-start">
        <div className="w-16 h-16 rounded-sm bg-blue flex justify-center items-center">
          <Icon
            iconName={scheduleData.icon}
            className="text-white w-9 h-9 min-w-9 min-h-9"
          />
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex flex-col">
            <span className="text-[0.95rem] font-medium text-blue">
              {scheduleData.time}
            </span>
            <h4 className="text-[1.3rem] font-medium text-black">
              {scheduleData.title}
            </h4>
          </div>
          <p className="text-[0.9rem]/[120%] text-black/90">
            {scheduleData.description}
          </p>
        </div>
      </div>
    </div>
  );
}

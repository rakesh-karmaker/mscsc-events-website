import type { ScheduleType } from "@/types/global-types";
import { useRef, type ReactNode } from "react";
import ScheduleCard from "./schedule-card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type ScheduleRightProps = {
  scheduleData: { [date: string]: ScheduleType[] };
  date: string;
};

export default function ScheduleRight({
  scheduleData,
  date,
}: ScheduleRightProps): ReactNode {
  const currentScheduleData = scheduleData[date] || [];
  const segmentContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (segmentContainerRef.current) {
      // Kill existing animations and ScrollTriggers
      gsap.killTweensOf(segmentContainerRef.current.children);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === segmentContainerRef.current) {
          trigger.kill();
        }
      });

      gsap.utils
        .toArray<HTMLElement>(segmentContainerRef.current.children)
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: segmentContainerRef.current,
              },
            }
          );
        });
    }
  }, [currentScheduleData]);

  return (
    <div
      className="w-full h-full overflow-hidden border-l-1 max-lg:border-l-0 border-light-gray/90 flex flex-col max-lg:border-t-1"
      ref={segmentContainerRef}
    >
      {currentScheduleData.map((item, index) => {
        const isLast = index === currentScheduleData.length - 1;
        return <ScheduleCard key={index} scheduleData={item} isLast={isLast} />;
      })}
    </div>
  );
}

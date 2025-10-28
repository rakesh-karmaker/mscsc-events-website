import {
  useRef,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import PrimaryBtn from "../ui/PrimaryBtn";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import animateTextReveal from "@/animations/textReveal";
import animateScheduleLeft from "@/animations/scheduleLeft";
import animateFadeUp from "@/animations/fadeUp";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type ScheduleLeftProps = {
  dates: string[];
  setDate: Dispatch<SetStateAction<string>>;
  date: string;
};

export default function ScheduleLeft({
  dates,
  setDate,
  date,
}: ScheduleLeftProps): ReactNode {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current && contentRef.current && subHeadingRef.current) {
      animateTextReveal(headingRef.current);
      animateFadeUp(subHeadingRef.current);
      animateScheduleLeft(contentRef.current);
    }
  }, []);

  return (
    <div className="w-fit ml-[calc((100vw-var(--max-width))/2)] max-sm:mr-[calc((100vw-var(--max-width))/2)] relative p-10 max-lg:!px-0 border-l-1 max-lg:border-l-0 border-light-gray/90">
      <div className="sticky top-[calc(var(--nav-height)+2rem)] w-full min-w-[50ch] max-xl:min-w-[30ch] max-sm:min-w-full  h-fit flex flex-col gap-6">
        <div className="w-full flex flex-col gap-3">
          <h2
            className="text-5xl font-semibold max-xl:text-4xl"
            ref={headingRef}
          >
            Event Schedule
          </h2>
          <p
            className="text-[1.1rem]/[135%] max-xl:text-[1rem] text-black/90 max-w-[40ch]"
            ref={subHeadingRef}
          >
            A detailed overview of all sessions, competitions, and key
            highlights of the fest.
          </p>
        </div>
        <div className="flex flex-col gap-4" ref={contentRef}>
          {dates.map((dateItem, index) => (
            <DateItem
              key={index}
              date={dateItem}
              setDate={setDate}
              currentDate={date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DateItem({
  date,
  setDate,
  currentDate,
}: {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  currentDate: string;
}) {
  return (
    <PrimaryBtn
      onClick={() => setDate(date)}
      className={
        currentDate === date
          ? ""
          : `before:!bg-light-gray/20 !text-black after:!bg-blue hover:!text-white`
      }
    >
      <span className="w-fit flex gap-1 items-center">
        <RiCalendarScheduleFill />
        <span>{date}</span>
      </span>
    </PrimaryBtn>
  );
}

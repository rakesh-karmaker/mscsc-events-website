import type { ExplorionPastEventType } from "@/types/event-data-types";
import { useEffect, useRef, useState, type ReactNode } from "react";
import FaCalendarAlt from "~icons/fa7-solid/calendar-alt";
import PrimaryBtn from "../ui/primary-btn";
import FaArrowRightLong from "~icons/fa6-solid/arrow-right-long";
import GoLocation from "~icons/ic/baseline-location-on";
import Counter from "../ui/counter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import animateFadeUp from "@/animations/fade-up";
import dayjs from "dayjs";

gsap.registerPlugin(useGSAP);

export default function EventCard({
  pastEventData,
}: {
  pastEventData: ExplorionPastEventType;
}): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useEffect(() => {
    function updateCardHeight() {
      if (contentRef.current) {
        setCardHeight(contentRef.current.offsetHeight);
      }
    }
    updateCardHeight();
    window.addEventListener("resize", updateCardHeight);
    return () => {
      window.removeEventListener("resize", updateCardHeight);
    };
  }, []);

  useGSAP(() => {
    if (cardRef.current) {
      animateFadeUp(cardRef.current);
    }
  });

  return (
    <div
      className="w-full h-full flex gap-17 bg-secondary-bg border-2 rounded-md overflow-hidden justify-between max-lg:flex-col-reverse max-lg:gap-2"
      ref={cardRef}
    >
      <div
        className="w-full h-full p-7 max-sm:p-4 flex flex-col gap-12 justify-between"
        ref={contentRef}
      >
        <div className="w-full flex flex-col gap-7">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-4xl max-sm:text-2xl font-medium text-primary">
              {pastEventData.eventName}
            </h3>
            <EventTags
              location={pastEventData.eventLocation}
              date={pastEventData.eventDate}
            />
          </div>
          <div className="w-full flex flex-col gap-3 z-99">
            <p className="text-[1.1rem]/[135%] max-sm:text-[1rem]/[135%] text-text">
              {pastEventData.eventDescription}
            </p>
            <PrimaryBtn
              className="group flex items-center"
              onClick={() => [
                window.open(`/${pastEventData.eventSlug}`, "_blank"),
              ]}
            >
              Explore Event{" "}
              <FaArrowRightLong className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </PrimaryBtn>
          </div>
        </div>
        <div className="w-full h-full flex gap-30 max-xl:gap-10 max-sm:flex-wrap max-sm:gap-5">
          <EventMetaDataCounter count={pastEventData.participantCount}>
            Participants
          </EventMetaDataCounter>
          <EventMetaDataCounter count={pastEventData.segments.length}>
            Interesting Segments
          </EventMetaDataCounter>
        </div>
      </div>
      <div
        className="w-full flex max-lg:h-100! max-sm:h-55! relative max-w-200 max-lg:max-w-full max-lg:before:hidden before:absolute before:w-1/3 before:h-full before:left-0 before:top-0 before:bg-linear-to-r before:from-secondary-bg before:to-secondary-bg/0 before:z-10"
        style={cardHeight ? { height: cardHeight } : {}}
      >
        <img
          src={pastEventData.eventBannerUrl}
          alt={pastEventData.eventName}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}

function EventMetaDataCounter({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}): ReactNode {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Counter
          value={count}
          height={window.innerWidth < 1280 ? 55 : 72}
          className="text-[4.5rem] max-xl:text-[3rem] font-light max-w-[calc(1ch*0.92)] text-primary"
          willRepeat={false}
        />
        <span className="text-[4.5rem]/[100%] max-xl:text-[3rem]/[100%] font-extralight h-fit pb-3 text-primary">
          +
        </span>
      </div>
      <p className="text-2xl font-medium -mt-2 max-xl:text-lg text-text">
        {children}
      </p>
    </div>
  );
}

function EventTags({
  location,
  date,
}: {
  location: string;
  date: string;
}): ReactNode {
  return (
    <div className="w-full flex gap-3 flex-wrap">
      <div className="px-3 py-1.5 bg-primary rounded-sm text-white flex gap-1 items-center text-sm">
        <GoLocation />
        <p>{location}</p>
      </div>
      <div className="px-3 py-1.5 bg-primary rounded-sm text-white flex gap-1 items-center text-sm">
        <FaCalendarAlt />
        <p>{dayjs(date).format("DD MMM YYYY")}</p>
      </div>
    </div>
  );
}

import EventAside from "@/components/es-page/es-aside";
import EventInfo from "@/components/es-page/es-info";
import { useEventData } from "@/hooks/use-event-data";
import type {
  ExplorionExperienceType,
  ExplorionSegmentType,
} from "@/types/event-data-types";
import { useEffect, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

export function isEventType(
  item: ExplorionSegmentType | ExplorionExperienceType
): item is ExplorionSegmentType {
  return "segmentSlug" in item;
}

export default function Event(): ReactNode {
  const seSlug: string = useParams().seSlug || "";
  const { segmentData, eventMetaData, experienceData } = useEventData();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [seSlug]);

  if (!eventMetaData) {
    throw new Error("Event data not loaded");
  }

  const data = [...(segmentData ?? []), ...(experienceData ?? [])].find(
    (segment: ExplorionSegmentType | ExplorionExperienceType) =>
      (isEventType(segment) && segment.segmentSlug === seSlug) ||
      (!isEventType(segment) && segment.experienceSlug === seSlug)
  );
  if (!data) {
    throw new Error(`Event with ID ${seSlug} not found`);
  }

  return (
    <>
      <Helmet>
        <title>
          {eventMetaData.eventName} - {data.title}
        </title>
      </Helmet>
      <section className="w-full max-w-max-width h-full flex gap-10 max-lg:gap-5 max-md:flex-col-reverse py-7">
        <EventAside activeSlug={seSlug} />
        <div className="w-full h-full p-4 border-2 rounded-md border-primary">
          <EventInfo eventData={data} />
        </div>
      </section>
    </>
  );
}

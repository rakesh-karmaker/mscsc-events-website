import type {
  ExplorionExperienceType,
  ExplorionSegmentType,
} from "@/types/event-data-types";
import type { ReactNode } from "react";
import Icon from "../ui/icon";
import { GoPeople } from "react-icons/go";
import { FaGlobeAsia } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import FormattedTextContent from "../ui/formatted-text-content/formatted-text-content";

export default function EventInfo<
  T extends ExplorionSegmentType | ExplorionExperienceType,
>({ eventData }: { eventData: T }): ReactNode {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <div className="w-14 min-w-14 h-14 rounded-md bg-primary flex justify-center items-center">
          <Icon iconName={eventData.icon} className="text-4xl text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-primary">
          {eventData.title}
        </h1>
      </div>
      {"segmentSlug" in eventData ? (
        <>
          <div className="w-full flex gap-3">
            <div className="px-3 py-1.5 bg-primary rounded-sm text-white flex gap-1.5 items-center">
              <GoPeople />
              <p>{eventData.teamType}</p>
            </div>
            <div className="px-3 py-1.5 bg-primary rounded-sm text-white flex gap-1.5 items-center">
              {eventData.locationType === "online" ? (
                <FaGlobeAsia />
              ) : (
                <IoLocationOutline />
              )}
              <p>{eventData.locationType}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 mt-3">
            <h2 className="text-2xl font-medium text-primary">Overview</h2>
            <FormattedTextContent content={eventData.summary} />
          </div>
        </>
      ) : null}
      <div className="w-full flex flex-col gap-2 mt-3">
        <h2 className="text-2xl font-medium text-primary">
          {"segmentSlug" in eventData ? "Segment" : "Experience"} Details
        </h2>
        <FormattedTextContent content={eventData.details} />
      </div>
      {"segmentSlug" in eventData ? (
        <div className="w-full flex flex-col gap-2 mt-3">
          <h2 className="text-2xl font-medium text-primary">
            {"segmentSlug" in eventData ? "Segment" : "Experience"} Rules
          </h2>
          <FormattedTextContent content={eventData.rules} />
        </div>
      ) : null}
    </div>
  );
}

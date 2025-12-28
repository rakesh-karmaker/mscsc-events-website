import type { ExplorionSegmentType } from "@/types/event-data-types";
import type { ReactNode } from "react";
import capitalize from "@/utils/capitalize";

import { FaGlobe } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

export default function SegmentTags({
  locationType,
  teamType,
}: {
  locationType: ExplorionSegmentType["locationType"];
  teamType: ExplorionSegmentType["teamType"];
}): ReactNode {
  return (
    <div className="flex gap-2.5 flex-wrap items-center justify-center color-black pb-2.5 self-center">
      <p className="text-[1.09rem] font-medium leading-5 flex items-center gap-1 text-black/85 ">
        {locationType == "online" ? (
          <FaGlobe className="text-sm" />
        ) : (
          <FaLocationDot className="text-sm" />
        )}
        <span>{capitalize(locationType)}</span>
      </p>
      <span className="text-black/50">/</span>
      <p className="text-[1.09rem] flex items-center gap-1 font-medium leading-5 text-black/85 ">
        {teamType == "solo" ? (
          <IoPerson className="text-sm" />
        ) : (
          <IoPeople className="text-sm" />
        )}{" "}
        {capitalize(teamType)} Event
      </p>
    </div>
  );
}

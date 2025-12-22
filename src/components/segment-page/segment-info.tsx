import { useEventData } from "@/hooks/useEventData";
import type { ExplorionSegmentType } from "@/types/event-data-types";

import type { ReactNode } from "react";
import SegmentTags from "./segment-tags";

export default function SegmentInfo({
  segment,
}: {
  segment: ExplorionSegmentType;
}): ReactNode {
  const { eventMetaData } = useEventData();

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <img
        src={segment.imageUrl}
        alt={segment.title}
        className="w-full h-full aspect-[5/2.5] rounded-sm object-cover object-center shadow-md"
      />
      <h1 className="text-4xl font-medium text-black pt-7 text-center self-center leading-5">
        {segment.title}
      </h1>
      <SegmentTags
        locationType={segment.locationType}
        teamType={segment.teamType}
      />
    </div>
  );
}

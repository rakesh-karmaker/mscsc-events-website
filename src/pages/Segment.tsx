import SegmentInfo from "@/components/segmentPage/SegmentInfo";
import { useEventData } from "@/hooks/useEventData";
import type { ReactNode } from "react";
import { useParams } from "react-router";

export default function Segment(): ReactNode {
  const segmentSlug: string = useParams().segmentSlug || "";
  const { segmentData, eventMetaData } = useEventData();

  if (!eventMetaData || !segmentData) {
    throw new Error("Event data not loaded");
  }

  const segment = segmentData.find(
    (segment) => segment.segmentSlug === segmentSlug
  );
  if (!segment) {
    throw new Error(`Segment with ID ${segmentSlug} not found`);
  }

  return (
    <section className="w-full max-w-max-width h-full flex gap-10 py-7">
      <SegmentInfo segment={segment} />
      <aside className="min-w-[27.5rem] h-full bg-black/30">hello</aside>
    </section>
  );
}

import { useRef, type ReactNode } from "react";
import SegmentCard from "./SegmentCard";
import { useGSAP } from "@gsap/react";
import animateTextReveal from "@/animations/textReveal";
import animateFadeUp from "@/animations/fadeUp";
import gsap from "gsap";
import { useEventData } from "@/hooks/useEventData";

gsap.registerPlugin(useGSAP);

export default function Segments(): ReactNode {
  // Fetch segment data using the custom hook
  const { segmentData } = useEventData();
  if (!segmentData || segmentData.length === 0) {
    return null;
  }

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (headingRef.current && subHeadingRef.current) {
      animateTextReveal(headingRef.current);
      animateFadeUp(subHeadingRef.current);
    }
  }, []);

  return (
    <section
      id="segments"
      className="w-full max-w-max-width h-full my-22 flex flex-col gap-10"
    >
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-5xl font-semibold" ref={headingRef}>
          Segments
        </h2>
        <p
          className="text-[1.1rem]/[135%] text-black/90 max-w-[40ch]"
          ref={subHeadingRef}
        >
          Discover diverse segments designed to challenge minds and showcase
          scientific excellence.
        </p>
      </div>
      <div className="w-full grid grid-cols-2 max-lg:grid-cols-1 gap-7">
        {segmentData.map((segment, index) => {
          return <SegmentCard key={index} segmentData={segment} />;
        })}
      </div>
    </section>
  );
}

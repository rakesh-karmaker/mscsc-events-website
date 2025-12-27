import { useRef, type ReactNode } from "react";
import SegmentCard from "./segment-card";
import { useGSAP } from "@gsap/react";
import animateTextReveal from "@/animations/text-reveal";
import animateFadeUp from "@/animations/fade-up";
import gsap from "gsap";
import { useEventData } from "@/hooks/useEventData";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Segments(): ReactNode {
  // Fetch segment data using the custom hook
  const { segmentData } = useEventData();
  if (!segmentData || segmentData.length === 0) {
    return null;
  }

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const segmentDivRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current && subHeadingRef.current && segmentDivRef.current) {
      animateTextReveal(headingRef.current);
      animateFadeUp(subHeadingRef.current);
      gsap.fromTo(
        segmentDivRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: segmentDivRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="segments"
      className="w-full max-w-max-width h-full my-22 flex flex-col gap-10"
    >
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-5xl font-semibold gradient-text" ref={headingRef}>
          Choose Your Challenge
        </h2>
        <p
          className="text-[1.1rem]/[135%] text-black/90 max-w-[40ch]"
          ref={subHeadingRef}
        >
          Hands-on segments, creative competitions, and interactive
          exhibitions—pick what excites you and dive in.
        </p>
      </div>
      <div
        className="w-full grid grid-cols-4 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-7"
        ref={segmentDivRef}
      >
        {segmentData.map((segment, index) => {
          return <SegmentCard key={index} segmentData={segment} />;
        })}
      </div>
    </section>
  );
}

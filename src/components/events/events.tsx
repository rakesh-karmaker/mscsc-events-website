import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import animateTextReveal from "@/animations/text-reveal";
import animateFadeUp from "@/animations/fade-up";
import gsap from "gsap";
import { useEventData } from "@/hooks/use-event-data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard from "./event-card";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Events(): ReactNode {
  // Fetch segment data using the custom hook
  const { pastEventData } = useEventData();
  if (!pastEventData || pastEventData.length === 0) {
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
      id="events"
      className="w-full max-w-max-width h-full my-22 flex flex-col gap-10"
    >
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-5xl font-semibold gradient-text" ref={headingRef}>
          Our Successful Events
        </h2>
        <p
          className="text-[1.1rem]/[135%] text-black/90 max-w-[40ch]"
          ref={subHeadingRef}
        >
          Explore the highlights from our past events, showcasing the
          creativity, innovation, and enthusiasm.
        </p>
      </div>
      <div className="w-full h-full flex flex-col gap-7">
        {pastEventData.map((event) => (
          <EventCard key={event.eventSlug} pastEventData={event} />
        ))}
      </div>
    </section>
  );
}

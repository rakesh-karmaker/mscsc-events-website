import { useRef, type ReactNode } from "react";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useParams } from "react-router";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import animateHeroContent from "@/animations/hero-content";
import { useEventData } from "@/hooks/useEventData";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function HeroContent(): ReactNode {
  const lenis = useLenis();

  // Fetch event data using the custom hook
  const { eventMetaData, sections, heroData } = useEventData();
  if (!eventMetaData || !heroData) {
    return null;
  }

  // Determine which section to link to for "Learn More"
  const learnMoreSection = sections.includes("about") ? "about" : "segments";

  // Get eventId from URL parameters
  const eventId = useParams().eventId;
  const registrationLink = eventMetaData.isInnerRegistration
    ? `${eventId}/registration/`
    : eventMetaData.registrationUrl;

  // Refs for GSAP animation
  const headingRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current && textContentRef.current) {
      return animateHeroContent(headingRef.current, textContentRef.current);
    }
  }, []);

  return (
    <div className="max-w-[1150px] flex flex-col gap-4 items-center">
      <h1
        className="text-[5.375em]/[115%] max-xl:text-[3.5em] max-md:text-[3em] max-sm:text-[2.5em] max-[450px]:text-[2em] text-black font-bold max-w-[20ch] text-center"
        ref={headingRef}
        style={{
          opacity: 0,
          willChange: "transform",
        }}
      >
        {heroData.heading}
      </h1>
      <div
        className="flex flex-col gap-8 items-center max-md:gap-5"
        ref={textContentRef}
      >
        <p className="text-[1.165em]/[120%] max-xl:text-[1.1em] max-md:text-[1em] max-sm:text-[0.975em] max-[450px]:text-[0.8rem] text-gray-700 text-center max-w-[70ch]">
          {heroData.text}
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <PrimaryBtn
            isLink={true}
            href={registrationLink}
            className="!text-[1.1em]/[155%] tracking-wide !px-4 !py-2.5 max-xl:!px-3.25 max-xl:!py-2 max-xl:!text-[1em]/[150%]"
          >
            Register Now
          </PrimaryBtn>
          <PrimaryBtn
            isLink={true}
            href={`#${learnMoreSection}`}
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo(`#${learnMoreSection}`, { offset: -100 });
            }}
            className="before:!bg-black after:!bg-blue !text-[1.1em]/[155%] tracking-wide !px-4 !py-2.5 max-xl:!px-3.25 max-xl:!py-2 max-xl:!text-[1em]/[150%]"
          >
            Learn More
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

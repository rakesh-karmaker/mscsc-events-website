import { useRef, type ReactNode } from "react";
import PrimaryBtn from "@/components/ui/primary-btn";
import { useParams } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import animateHeroContent from "@/animations/hero-content";
import { useEventData } from "@/hooks/use-event-data";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function HeroContent(): ReactNode {
  // Fetch event data using the custom hook
  const { eventMetaData, sections, heroData } = useEventData();
  if (!eventMetaData || !heroData) {
    return null;
  }

  // Determine which section to link to for "Learn More"
  const learnMoreSection = sections.includes("about") ? "about" : "segments";

  // Get eventId from URL parameters
  const eventId = useParams().eventId || "";
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
    <div className="max-w-287.5 flex flex-col gap-4 items-center">
      <h1
        className="text-[5.375em]/[115%] max-xl:text-[3.5em] max-md:text-[3em] max-sm:text-[2.5em] max-[450px]:text-[2em] text-black font-bold max-w-[20ch] text-center gradient-text"
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
        <p className="text-[1.165em]/[120%] max-xl:text-[1.1em] max-md:text-[1em] max-sm:text-[0.975em] max-[450px]:text-[0.8rem] text-text text-center max-w-[70ch]">
          {heroData.text}
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <PrimaryBtn
            isLink={true}
            href={
              eventMetaData.isHomepage
                ? `/${eventId}/${learnMoreSection}`
                : registrationLink
            }
            className="text-[1.1em]/[155%]! tracking-wide px-4! py-2.5! max-xl:px-3.25! max-xl:py-2! max-xl:text-[1em]/[150%]! "
          >
            {eventMetaData.isHomepage ? "Learn More" : "Register Now"}
          </PrimaryBtn>
          <PrimaryBtn
            isLink={true}
            href={
              eventMetaData.isHomepage
                ? "https://mscsc.netlify.app/"
                : `/${eventId}/${learnMoreSection}`
            }
            className="before:bg-secondary-bg text-black! after:bg-primary! hover:text-white! text-[1.1em]/[155%]! tracking-wide px-4! py-2.5! max-xl:px-3.25! max-xl:py-2! max-xl:text-[1em]/[150%]!"
          >
            {eventMetaData.isHomepage ? "Visit Page" : "Learn More"}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

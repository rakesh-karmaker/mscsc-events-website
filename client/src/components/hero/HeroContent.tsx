import { useRef, type ReactNode } from "react";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { useParams } from "react-router";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import animateHeroContent from "@/animations/heroContent";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

type HeroContentProps = {
  heading: string;
  text: string;
  isInnerRegistration: boolean;
  registrationUrl: string;
  sections: string[];
};

export default function HeroContent({
  heading,
  text,
  isInnerRegistration,
  registrationUrl,
  sections,
}: HeroContentProps): ReactNode {
  const lenis = useLenis();

  const learnMoreSection = sections.includes("about") ? "about" : "segments";

  const eventId = useParams().eventId;
  const registrationLink = isInnerRegistration
    ? `/registration/${eventId}`
    : registrationUrl;

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
        className="text-[5.375em]/[115%] max-xl:text-[3.5em] max-md:text-[3em] max-sm:text-[2.5em] text-black font-bold max-w-[20ch] text-center"
        ref={headingRef}
        style={{
          opacity: 0,
          willChange: "transform",
        }}
      >
        {heading}
      </h1>
      <div
        className="flex flex-col gap-8 items-center max-md:gap-5"
        ref={textContentRef}
      >
        <p className="text-[1.165em]/[120%] max-xl:text-[1.1em] max-md:text-[1em] max-sm:text-[0.975em] text-gray-700 text-center max-w-[70ch]">
          {text}
        </p>
        <div className="flex gap-4">
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

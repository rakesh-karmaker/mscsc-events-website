import type { ReactNode } from "react";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { useParams } from "react-router";
import { useLenis } from "lenis/react";

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

  return (
    <div className="max-w-[1150px] flex flex-col gap-4 items-center">
      <h1 className="text-[5.375em]/[115%] text-black font-bold max-w-[20ch] text-center">
        {heading}
      </h1>
      <div className="flex flex-col gap-8 items-center">
        <p className="text-[1.165em]/[120%] text-gray-700 text-center max-w-[70ch]">
          {text}
        </p>
        <div className="flex gap-4">
          <PrimaryBtn
            isLink={true}
            href={registrationLink}
            className="!text-[1.1em]/[155%] tracking-wide !px-4 !py-2.5"
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
            className="before:!bg-black after:!bg-blue !text-[1.1em]/[155%] tracking-wide !px-4 !py-2.5"
          >
            Learn More
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

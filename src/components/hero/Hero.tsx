import type { ReactNode } from "react";
import EventMeta from "./EventMeta";
import HeroContent from "./HeroContent";
import HeroIcons from "./HeroIcons";

type HeroProps = {
  eventDate: string;
  eventLocation: string;
  heroData: {
    icons: string[];
    heading: string;
    text: string;
  };
  isInnerRegistration: boolean;
  registrationUrl: string;
  sections: string[];
};

export default function Hero({
  eventDate,
  eventLocation,
  heroData,
  isInnerRegistration,
  registrationUrl,
  sections,
}: HeroProps): ReactNode {
  return (
    <section
      id="home"
      className="relative flex !max-h-[1080px] items-center justify-center max-xl:max-w-max-width [@media(max-height:700px)]:pt-20 [@media(min-width:2000px)]:!min-h-[1000px]"
      style={{
        minHeight: sections.includes("video")
          ? "calc(100vh - var(--nav-height) - 20vh)"
          : "calc(100vh - var(--nav-height))",
      }}
    >
      <div className="flex flex-col gap-6.5 items-center">
        <EventMeta eventDate={eventDate} eventLocation={eventLocation} />
        <HeroContent
          heading={heroData.heading}
          text={heroData.text}
          isInnerRegistration={isInnerRegistration}
          registrationUrl={registrationUrl}
          sections={sections}
        />
      </div>
      <HeroIcons icons={heroData.icons} sections={sections} />
    </section>
  );
}

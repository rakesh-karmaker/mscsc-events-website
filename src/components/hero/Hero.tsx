import type { ReactNode } from "react";
import EventMeta from "./EventMeta";
import HeroContent from "./HeroContent";
import HeroIcons from "./HeroIcons";
import { useEventData } from "@/hooks/useEventData";

export default function Hero(): ReactNode {
  const { eventMetaData, sections, heroData } = useEventData();

  if (!eventMetaData || !heroData) {
    return null;
  }

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
        <EventMeta
          eventDate={eventMetaData.eventDate}
          eventLocation={eventMetaData.eventLocation}
        />
        <HeroContent />
      </div>
      <HeroIcons icons={heroData.icons} sections={sections} />
    </section>
  );
}

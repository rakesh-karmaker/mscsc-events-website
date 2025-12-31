import type { ReactNode } from "react";
import EventMeta from "./event-meta";
import HeroContent from "./hero-content";
import HeroIcons from "./hero-icons";
import { useEventData } from "@/hooks/use-event-data";
import HeroBg from "./hero-bg";

export default function Hero(): ReactNode {
  const { eventMetaData, sections, heroData } = useEventData();

  if (!eventMetaData || !heroData) {
    return null;
  }

  return (
    <div className="w-full h-full relative justify-center items-center flex">
      <section
        id="home"
        className="relative flex max-h-270! items-center justify-center max-xl:max-w-max-width [@media(max-height:700px)]:pt-20 [@media(min-width:2000px)]:min-h-250!"
        style={{
          minHeight: sections.includes("video")
            ? "calc(100vh - var(--nav-height) - 20vh)"
            : "calc(100vh - var(--nav-height))",
        }}
      >
        <div className="flex flex-col gap-6.5 items-center relative justify-center">
          <EventMeta
            isHomePage={eventMetaData.isHomepage}
            eventDate={eventMetaData.eventDate}
            eventLocation={eventMetaData.eventLocation}
          />
          <HeroContent />
          <div
            className="w-[35vw] max-w-225 aspect-square h-fit rounded-full absolute blur-xl -z-99"
            style={{
              background:
                "radial-gradient(74.85% 74.85% at 50.11% 50.11%, rgba(0, 83, 97, 0.13) 0%, rgba(236, 242, 248, 0) 82.5%)",
            }}
          />
        </div>
        <HeroIcons icons={heroData.icons} sections={sections} />
      </section>
      <HeroBg />
    </div>
  );
}

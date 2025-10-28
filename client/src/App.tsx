import Hero from "./components/hero/Hero";
import websiteData from "@/services/data/websiteData.json";
import { ReactLenis, type LenisRef } from "lenis/react";
import Video from "./components/Video";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import About from "./components/about/About";
import Segments from "./components/segments/Segments";
import Schedule from "./components/schedule/Schedule";

export default function App() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000); // GSAP provides time in seconds, Lenis expects milliseconds
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <main className="flex flex-col items-center">
        <Hero
          eventDate={websiteData.eventDate}
          eventLocation={websiteData.eventLocation}
          heroData={websiteData.hero}
          isInnerRegistration={websiteData.isInnerRegistration}
          registrationUrl={websiteData.registrationUrl}
          sections={websiteData.sections}
        />
        <Video url={websiteData.video.url} />
        <About
          about={websiteData.about}
          isInnerRegistration={websiteData.isInnerRegistration}
          registrationUrl={websiteData.registrationUrl}
          contactLinks={websiteData.contactLinks}
          registrations={websiteData.registrations}
          segmentCount={websiteData.segments.length}
          prizeCount={websiteData.prizeCount}
        />
        <Segments segments={websiteData.segments} />
        <Schedule scheduleData={websiteData.schedule} />
      </main>
    </>
  );
}

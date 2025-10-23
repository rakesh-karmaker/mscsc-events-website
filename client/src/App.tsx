import Hero from "./components/hero/Hero";
import websiteData from "@/services/data/websiteData.json";
import { ReactLenis } from "lenis/react";

export default function App() {
  return (
    <>
      <ReactLenis root />
      <main className="flex flex-col items-center">
        <Hero
          eventDate={websiteData.eventDate}
          eventLocation={websiteData.eventLocation}
          heroData={websiteData.hero}
          isInnerRegistration={websiteData.isInnerRegistration}
          registrationUrl={websiteData.registrationUrl}
          sections={websiteData.sections}
        />
        {/* <div className="relative w-full h-396 bg-gray-700">
        </div> */}
      </main>
    </>
  );
}

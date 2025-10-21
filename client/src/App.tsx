import Hero from "./components/hero/Hero";
import websiteData from "@/services/data/websiteData.json";

export default function App() {
  return (
    <main>
      <Hero
        eventDate={websiteData.eventDate}
        eventLocation={websiteData.eventLocation}
        heroData={websiteData.hero}
        isInnerRegistration={websiteData.isInnerRegistration}
        registrationUrl={websiteData.registrationUrl}
        sections={websiteData.sections}
      />
    </main>
  );
}

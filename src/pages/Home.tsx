import Hero from "@/components/hero/hero";
import Video from "@/components/video";
import About from "@/components/about/about";
import Segments from "@/components/segments/segments";
import Schedule from "@/components/schedule/schedule";
import Sponsors from "@/components/sponsors";
import Faq from "@/components/faq/faq";
import Contact from "@/components/contact/contact";
import { useEffect, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import { useLenis } from "lenis/react";
import { useEventData } from "@/hooks/useEventData";
import Loader from "@/components/ui/loader";

export default function Home(): ReactNode {
  const sectionId = useParams().section || "home";
  const lenis = useLenis();
  const navigate = useNavigate();
  const { sections } = useEventData();

  if (!sections) {
    navigate("/");
    return (
      <div className="w-full h-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  useEffect(() => {
    if (lenis) {
      // Use requestAnimationFrame to ensure scrolling happens after rendering
      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    }
  }, [sectionId, lenis]);

  // Map section keys to their respective components
  const sectionComponents: { [key: string]: ReactNode } = {
    hero: <Hero key={"home"} />,
    video: <Video key={"video"} />,
    about: <About key={"about"} />,
    segments: <Segments key={"segments"} />,
    schedule: <Schedule key={"schedule"} />,
    sp: <Sponsors key={"sp"} />,
    faqs: <Faq key={"faqs"} />,
    contact: <Contact key={"contact"} />,
  };

  return (
    <>
      {sections.map((section) => {
        return sectionComponents[section] || null;
      })}
    </>
  );
}

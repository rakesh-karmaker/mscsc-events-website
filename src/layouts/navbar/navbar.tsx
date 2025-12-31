import { Activity, useState, type ReactNode } from "react";
import EventLogo from "./event-logo";
import { NavLink, useParams } from "react-router";
import NavLinks from "./nav-links";
import { FaArrowRight, FaBars, FaXmark } from "react-icons/fa6";
import { useEventData } from "@/hooks/use-event-data";

export default function Navbar(): ReactNode {
  const currentEventId = useParams().eventId || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { eventMetaData, sections } = useEventData();

  if (!eventMetaData) {
    return null;
  }

  return (
    <header className="sticky top-0 w-full h-fit flex justify-center items-center bg-linear-to-b from-primary-bg to-primary-bg/80 backdrop-blur-xs z-9999 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
      <nav className="py-3 w-full max-w-max-width h-fit flex justify-between items-center">
        <Activity mode={window.innerWidth >= 768 ? "hidden" : "visible"}>
          <button
            className="text-2xl cursor-pointer transition-colors duration-200 hover:text-primary/70 focus:text-primary/70 focus-within:text-primary/70"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </Activity>
        <EventLogo
          logoUrl={eventMetaData.eventLogoUrl || ""}
          eventName={eventMetaData.eventName || ""}
        />
        <NavLinks sections={sections} isOpen={isOpen} setIsOpen={setIsOpen} />
        {eventMetaData.isHomepage ? null : (
          <NavLink
            to={
              eventMetaData.isInnerRegistration
                ? currentEventId + "/registration/"
                : eventMetaData.registrationUrl || ""
            }
            target={eventMetaData.isInnerRegistration ? "_self" : "_blank"}
            className="flex gap-1.25 items-center text-[1.08em] border-2 border-primary px-4.25 py-2 max-xl:text-[0.9em]/[140%] max-xl:px-3.5 bg-primary text-white rounded-full hover:bg-secondary-bg hover:text-primary focus:bg-secondary-bg focus:text-primary focus-within:bg-secondary-bg focus-within:text-primary transition-colors duration-200"
          >
            Register <FaArrowRight />
          </NavLink>
        )}
      </nav>
    </header>
  );
}

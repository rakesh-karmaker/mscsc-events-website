import { Activity, useState, type ReactNode } from "react";
import EventLogo from "./event-logo";
import { NavLink, useParams } from "react-router";
import NavLinks from "./nav-links";
import FaArrowRight from "~icons/fa6-solid/arrow-right";
import LuX from "~icons/lucide/x";
import FaBars from "~icons/fa7-solid/bars";
import { useEventData } from "@/hooks/use-event-data";
import { useUser } from "@/hooks/use-user";

export default function Navbar(): ReactNode {
  const currentEventSlug = useParams().eventSlug || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { eventMetaData, formData, sections } = useEventData();
  const { user } = useUser();

  if (!eventMetaData) {
    return null;
  }

  const isDeadlinePassed = formData?.registrationDeadline
    ? new Date(formData.registrationDeadline) < new Date()
    : false;

  return (
    <header className="sticky top-0 w-full h-fit flex justify-center items-center bg-linear-to-b from-primary-bg to-primary-bg/80 backdrop-blur-xs z-99 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
      <nav
        className="py-3 w-full max-w-max-width h-fit grid gap-15 max-sm:gap-3 items-center max-md:flex max-lg:gap-5"
        style={{
          gridTemplateColumns:
            eventMetaData.isHomepage || !formData || isDeadlinePassed
              ? "1fr auto"
              : "1fr auto 1fr",
        }}
      >
        <Activity mode={window.innerWidth >= 1024 ? "hidden" : "visible"}>
          <button
            className="text-2xl cursor-pointer transition-colors duration-200 hover:text-primary/70 focus:text-primary/70 focus-within:text-primary/70"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <LuX /> : <FaBars />}
          </button>
        </Activity>
        <EventLogo
          logoUrl={eventMetaData.eventLogoUrl || ""}
          eventName={eventMetaData.eventName || ""}
        />
        <NavLinks sections={sections} isOpen={isOpen} setIsOpen={setIsOpen} />

        {eventMetaData.isHomepage || !formData || isDeadlinePassed ? null : (
          <div className="w-fit max-md:w-full max-md:justify-end min-w-10 flex justify-self-end max-sm:justify-self-end">
            {user?.photoUrl ? (
              <NavLink to={`/${currentEventSlug}/profile/`}>
                <img
                  src={user.photoUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
              </NavLink>
            ) : (
              <NavLink
                to={
                  eventMetaData.isInnerRegistration
                    ? currentEventSlug + "/registration/"
                    : eventMetaData.registrationUrl || ""
                }
                target={eventMetaData.isInnerRegistration ? "_self" : "_blank"}
                className="flex gap-1.25 items-center text-[1.08em] border-2 border-primary px-4.25 py-2 max-xl:text-[0.9em]/[140%] max-xl:px-3.5 bg-primary text-white rounded-full hover:bg-secondary-bg hover:text-primary focus:bg-secondary-bg focus:text-primary focus-within:bg-secondary-bg focus-within:text-primary transition-colors duration-200"
              >
                Register <FaArrowRight />
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

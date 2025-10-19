import type { ReactNode } from "react";
import EventLogo from "./EventLogo";
import { NavLink, useParams } from "react-router";
import NavLinks from "./NavLinks";
import { FaArrowRight } from "react-icons/fa6";

type NavbarProps = {
  navbarData: {
    eventName: string;
    eventLogoUrl: string;
    isInnerRegistration: boolean;
    registrationUrl: string;
    sections: string[];
  };
};

export default function Navbar({ navbarData }: NavbarProps): ReactNode {
  const currentEventId = useParams().eventId || "";

  return (
    <header className="sticky top-0 w-full h-fit flex justify-center items-center bg-white/40 backdrop:blur-sm z-9999 shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.1)]">
      <nav className="py-3 w-full max-w-max-width h-fit flex justify-between items-center">
        <EventLogo
          logoUrl={navbarData.eventLogoUrl}
          eventName={navbarData.eventName}
        />
        <NavLinks sections={navbarData.sections} />
        <NavLink
          to={
            navbarData.isInnerRegistration
              ? "/registration?eventId=" + currentEventId
              : navbarData.registrationUrl
          }
          target={navbarData.isInnerRegistration ? "_self" : "_blank"}
          className="flex gap-1.25 items-center text-[1.08em] px-4.25 py-2 bg-blue text-white rounded-full hover:bg-light-gray/40 hover:text-black focus:bg-light-gray/40 focus:text-black focus-within:bg-light-gray/40 focus-within:text-black transition-colors duration-200"
        >
          Register <FaArrowRight />
        </NavLink>
      </nav>
    </header>
  );
}

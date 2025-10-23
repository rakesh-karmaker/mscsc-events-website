import { Activity, useState, type ReactNode } from "react";
import EventLogo from "./EventLogo";
import { NavLink, useParams } from "react-router";
import NavLinks from "./NavLinks";
import { FaArrowRight, FaBars, FaXmark } from "react-icons/fa6";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 w-full h-fit flex justify-center items-center bg-gradient-to-b from-pure-white to-pure-white/80 backdrop-blur-[4px] z-9999 shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.1)]">
      <nav className="py-3 w-full max-w-max-width h-fit flex justify-between items-center">
        <Activity mode={window.innerWidth >= 768 ? "hidden" : "visible"}>
          <button
            className="text-2xl cursor-pointer transition-colors duration-200 hover:text-blue focus:text-blue focus-within:text-blue"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </Activity>
        <EventLogo
          logoUrl={navbarData.eventLogoUrl}
          eventName={navbarData.eventName}
        />
        <NavLinks sections={navbarData.sections} isOpen={isOpen} />
        <NavLink
          to={
            navbarData.isInnerRegistration
              ? "/registration/" + currentEventId
              : navbarData.registrationUrl
          }
          target={navbarData.isInnerRegistration ? "_self" : "_blank"}
          className="flex gap-1.25 items-center text-[1.08em] px-4.25 py-2 max-xl:text-[0.9em]/[140%] max-xl:px-3.5 bg-blue text-white rounded-full hover:bg-light-gray/40 hover:text-black focus:bg-light-gray/40 focus:text-black focus-within:bg-light-gray/40 focus-within:text-black transition-colors duration-200"
        >
          Register <FaArrowRight />
        </NavLink>
      </nav>
    </header>
  );
}

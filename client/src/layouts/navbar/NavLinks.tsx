import { type ReactNode } from "react";
import { NavLink, useParams } from "react-router";

export default function NavLinks({
  sections,
  isOpen,
}: {
  sections: string[];
  isOpen: boolean;
}): ReactNode {
  const eventId = useParams().eventId;

  const preferredNavLinks: Record<string, { name: string; url: string }> = {
    hero: {
      name: "Home",
      url: "home",
    },
    about: {
      name: "About",
      url: "about",
    },
    segments: {
      name: "Segments",
      url: "segments",
    },
    schedule: {
      name: "Schedule",
      url: "schedule",
    },
    faqs: {
      name: "FAQs",
      url: "faqs",
    },
    contact: {
      name: "Contact",
      url: "contact",
    },
  };

  const preferredSections: string[] = Object.keys(preferredNavLinks);

  return (
    <div
      className="grid max-md:absolute max-md:top-full max-md:left-0 max-md:w-full transition-all duration-300 max-md:shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.04)]"
      style={{
        gridTemplateRows: isOpen ? "1fr" : "0fr",
      }}
    >
      <ul className="list-none flex gap-6 max-lg:gap-4  max-md:w-full max-md:bg-pure-white/95 max-md:backdrop-blur-[4px] max-md:flex-col max-md:gap-0 max-md:overflow-hidden max-md-ease-in-out">
        {preferredSections.map((section) => {
          if (sections.includes(section)) {
            return (
              <li key={section}>
                <NavLink
                  to={`/${eventId}/${preferredNavLinks[section].url}`}
                  className={
                    "text-black text-[1em] max-lg:text-[0.96em] max-md:text-[1em] hover:text-blue focus:text-blue focus-within:text-blue transition-colors duration-200 max-md:shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.04)] max-md:w-full max-md:block max-md:px-[5vw] max-md:py-4 max-md:hover:bg-light-gray/20 max-md:focus:bg-light-gray/20 max-md:focus-within:bg-light-gray/20 rounded-md"
                  }
                >
                  {preferredNavLinks[section].name}
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

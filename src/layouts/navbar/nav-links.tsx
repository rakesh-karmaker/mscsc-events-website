import {
  Activity,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { NavLink, useParams } from "react-router";

export default function NavLinks({
  sections,
  isOpen,
  setIsOpen,
}: {
  sections: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}): ReactNode {
  const eventSlug = useParams().eventSlug;

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
      className="grid max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:w-full transition-all duration-300 max-lg:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04)]"
      style={{
        gridTemplateRows: isOpen ? "1fr" : "0fr",
      }}
    >
      <ul className="list-none flex gap-3 max-lg:gap-4  max-lg:w-full max-lg:bg-primary-bg/97 max-lg:backdrop-blur-[10px] max-lg:flex-col max-lg:overflow-hidden max-lg-ease-in-out">
        {preferredSections.map((section, index) => {
          if (sections.includes(section)) {
            return (
              <li
                key={section}
                className="flex items-center gap-4 max-lg:w-full"
              >
                {index > 0 ? (
                  <Activity
                    mode={window.innerWidth < 768 ? "hidden" : "visible"}
                  >
                    <div className="text-primary/60 pointer-events-none select-none">
                      /
                    </div>
                  </Activity>
                ) : null}
                <div
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className="max-lg:w-full"
                >
                  <NavLink
                    to={`/${eventSlug}/${preferredNavLinks[section].url}`}
                    className={({ isActive }) =>
                      `${isActive ? "text-primary font-medium" : "text-primary/70"} text-[1em] max-lg:text-[1em] hover:text-primary focus:text-primary focus-within:text-primary transition-colors duration-200 max-lg:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04)] max-lg:w-full max-lg:block max-lg:px-[5vw] max-lg:py-4 max-lg:hover:bg-secondary-bg/40 max-lg:focus:bg-secondary-bg/40 max-lg:focus-within:bg-secondary-bg/40 rounded-lg`
                    }
                  >
                    {preferredNavLinks[section].name}
                  </NavLink>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

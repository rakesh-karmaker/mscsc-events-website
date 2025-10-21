import { type ReactNode } from "react";
import { NavLink } from "react-router";

export default function NavLinks({
  sections,
}: {
  sections: string[];
}): ReactNode {
  const preferredNavLinks: Record<string, { name: string; url: string }> = {
    hero: {
      name: "Home",
      url: "#home",
    },
    about: {
      name: "About",
      url: "#about",
    },
    segments: {
      name: "Segments",
      url: "#segments",
    },
    schedule: {
      name: "Schedule",
      url: "#schedule",
    },
    faqs: {
      name: "FAQs",
      url: "#faqs",
    },
    contact: {
      name: "Contact",
      url: "#contact",
    },
  };

  const preferredSections: string[] = Object.keys(preferredNavLinks);

  return (
    <ul className="list-none flex gap-6">
      {preferredSections.map((section) => {
        if (sections.includes(section)) {
          return (
            <li key={section}>
              <NavLink
                to={`${preferredNavLinks[section].url}`}
                className={
                  "text-black text-[1em] hover:text-blue focus:text-blue focus-within:text-blue transition-colors duration-200"
                }
              >
                {preferredNavLinks[section].name}
              </NavLink>
            </li>
          );
        }
      })}
    </ul>
  );
}

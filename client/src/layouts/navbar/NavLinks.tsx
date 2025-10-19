import { type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";

export default function NavLinks({
  sections,
}: {
  sections: string[];
}): ReactNode {
  const currentUrl = useLocation().pathname;

  const preferredNavLinks: Record<string, string> = {
    hero: "Home",
    about: "About",
    segments: "Segments",
    schedule: "Schedule",
    faqs: "FAQs",
    contact: "Contact",
  };

  const preferredSections: string[] = Object.keys(preferredNavLinks);

  return (
    <ul className="list-none flex gap-2.5">
      {preferredSections.map((section) => {
        if (sections.includes(section)) {
          return (
            <li key={section}>
              <NavLink
                to={`${currentUrl}#${section}`}
                className={
                  "text-black text-[1.1em] hover:text-blue focus:text-blue focus-within:text-blue transition-colors duration-200"
                }
              >
                {preferredNavLinks[section]}
              </NavLink>
            </li>
          );
        }
      })}
    </ul>
  );
}

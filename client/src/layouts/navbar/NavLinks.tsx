import { useLenis } from "lenis/react";
import { type ReactNode } from "react";

export default function NavLinks({
  sections,
}: {
  sections: string[];
}): ReactNode {
  const lenis = useLenis();

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
              <a
                href={`${preferredNavLinks[section].url}`}
                onClick={(e) => {
                  e.preventDefault();
                  lenis?.scrollTo(preferredNavLinks[section].url, {
                    offset: -100,
                  });
                }}
                className={
                  "text-black text-[1em] hover:text-blue focus:text-blue focus-within:text-blue transition-colors duration-200"
                }
              >
                {preferredNavLinks[section].name}
              </a>
            </li>
          );
        }
      })}
    </ul>
  );
}

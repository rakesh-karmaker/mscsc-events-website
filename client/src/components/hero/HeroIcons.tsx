import { useRef, type ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { useGSAP } from "@gsap/react";
import animateHeroIcons from "@/animations/heroIcons";

export default function HeroIcons({
  icons,
  sections,
}: {
  icons: string[];
  sections: string[];
}): ReactNode {
  const commonClassNames =
    "absolute w-30 h-30 max-xl:w-25 max-xl:h-25 text-dark-gray/65";
  const iconContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (iconContainerRef.current) {
      animateHeroIcons(iconContainerRef.current);
    }
  }, []);
  ``;

  return (
    <div
      ref={iconContainerRef}
      className="absolute w-[120%] max-w-[min(1150px,var(--max-width))] h-full [@media(max-height:640px)]:min-h-[110%] aspect-[16/10] -z-50"
      style={{
        maxHeight: sections.includes("video") ? "auto" : "90%",
      }}
    >
      <Icon
        iconName={icons[0]}
        className={`${commonClassNames} top-0 left-0`}
      />
      <Icon
        iconName={icons[1]}
        className={`${commonClassNames} top-0 right-0`}
      />
      <Icon
        iconName={icons[2]}
        className={`${commonClassNames} bottom-0 left-0`}
      />
      <Icon
        iconName={icons[3]}
        className={`${commonClassNames} bottom-0 right-0`}
      />
    </div>
  );
}

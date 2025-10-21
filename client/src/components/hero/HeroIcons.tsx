import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

export default function HeroIcons({ icons }: { icons: string[] }): ReactNode {
  return (
    <div className="absolute w-full max-w-[min(1150px,var(--max-width))] max-h-[calc(100vh-var(--nav-height)-30vh)] transition-all duration-300 aspect-[16/10] -z-50">
      <Icon
        iconName={icons[0]}
        className="absolute top-0 left-0 w-30 h-30 text-dark-gray/65 rotate-20"
      />
      <Icon
        iconName={icons[1]}
        className="absolute top-0 right-0 w-30 h-30 text-dark-gray/65 rotate-45"
      />
      <Icon
        iconName={icons[2]}
        className="absolute bottom-0 left-0 w-30 h-30 text-dark-gray/65 rotate-27"
      />
      <Icon
        iconName={icons[3]}
        className="absolute bottom-0 right-0 w-30 h-30 text-dark-gray/65 -rotate-20"
      />
    </div>
  );
}

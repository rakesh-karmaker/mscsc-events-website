import type { ReactNode } from "react";
import HeroBgWave from "../ui/hero-bg-wave";

export default function HeroBg(): ReactNode {
  return (
    <div className="w-screen max-w-[1920px] h-full min-h-[calc(100vh-var(--nav-height))] absolute top-0 -z-99 [@media(max-height:700px)]:pt-20 [@media(min-width:2000px)]:!min-h-[1000px]">
      <div className="w-fit max-w-screen h-full absolute -top-2 right-0 overflow-hidden">
        <HeroBgWave />
      </div>
      <div className="w-fit max-w-screen h-full absolute rotate-180 -bottom-2 left-0 overflow-hidden">
        <HeroBgWave />
      </div>
    </div>
  );
}

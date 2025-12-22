import type { ReactNode } from "react";
import Counter from "../ui/counter";

type AboutBottomProps = {
  registrations: number;
  segmentCount: number;
  prizeCount: number;
};

export default function AboutBottom({
  registrations,
  segmentCount,
  prizeCount,
}: AboutBottomProps): ReactNode {
  return (
    <div className="w-full h-full border-t-1 border-light-gray/60 pt-5 grid grid-cols-3 max-[810px]:grid-cols-2 max-[810px]:grid-rows-2 gap-10 max-sm:grid-cols-1">
      <AboutCounterItem count={registrations}>Registrations</AboutCounterItem>
      <AboutCounterItem count={segmentCount}>
        Interesting Segments
      </AboutCounterItem>
      <AboutCounterItem count={prizeCount}>Wonderful Prizes</AboutCounterItem>
    </div>
  );
}

function AboutCounterItem({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}): ReactNode {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Counter
          value={count}
          height={window.innerWidth < 1280 ? 72 : 112}
          className="text-[7rem] max-xl:text-7xl font-light max-w-[calc(1ch*0.92)]"
        />
        <span className="text-[7rem]/[100%] max-xl:text-[4.5rem]/[100%] font-extralight h-fit pb-3">
          +
        </span>
      </div>
      <p className="text-2xl font-medium -mt-2 max-xl:text-xl">{children}</p>
    </div>
  );
}

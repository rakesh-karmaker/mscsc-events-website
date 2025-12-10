import type { SegmentType } from "@/types/globalTypes";
import { useRef, type ReactNode } from "react";
import Icon from "../ui/Icon";
import PrimaryBtn from "../ui/PrimaryBtn";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import animateSegment from "@/animations/segment";

gsap.registerPlugin(useGSAP);

export default function Segment({
  segmentData,
}: {
  segmentData: SegmentType;
}): ReactNode {
  const { icon, imageUrl, title, summary } = segmentData;
  const segmentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (segmentRef.current && imageRef.current) {
      animateSegment(segmentRef.current, imageRef.current);
    }
  }, []);

  return (
    <div
      className="relative overflow-hidden w-full p-6 rounded-md before:absolute before:w-[90%] before:h-[220%] before:-top-30 before:-left-15 before:rotate-15 before:bg-gradient-to-r before:from-pure-black before:to-black/0 before:z-0"
      ref={segmentRef}
    >
      <div className="flex flex-col gap-8 relative z-99">
        <div className="flex flex-col gap-4">
          <Icon
            iconName={icon}
            className="w-14 h-14 max-xl:h-11 max-xl:w-11 text-white"
          />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl max-w-[20ch] text-white font-medium">
              {title}
            </h3>
            <p className="text-[1rem]/[135%] max-w-[34ch] text-white">
              {summary}
            </p>
          </div>
        </div>
        <PrimaryBtn
          isLink={true}
          href="#"
          className="!px-4 flex gap-0.1 items-center"
        >
          Learn More <FaArrowRight className="ml-2" />
        </PrimaryBtn>
      </div>
      <div className="absolute w-full h-full -z-1 left-0 top-0 overflow-hidden">
        <img
          ref={imageRef}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

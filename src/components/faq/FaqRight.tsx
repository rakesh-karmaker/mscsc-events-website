import type { FaqType } from "@/types/globalTypes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function FaqRight({
  faqData,
}: {
  faqData: FaqType[];
}): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (containerRef.current) {
      gsap.utils
        .toArray<HTMLDivElement>(containerRef.current.children)
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
              },
            }
          );
        });
    }
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col gap-6 max-md:gap-4 max-w-[800px]"
      ref={containerRef}
    >
      {faqData.map((faq: FaqType, index: number) => (
        <FaqItem
          key={index}
          faq={faq}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={index}
        />
      ))}
    </div>
  );
}

function FaqItem({
  faq,
  activeIndex,
  setActiveIndex,
  index,
}: {
  faq: FaqType;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  index: number;
}): ReactNode {
  const { question, answer } = faq;
  const isActive: boolean = activeIndex === index;

  return (
    <div>
      <div
        className="w-full h-fit flex flex-col gap-3 max-md:gap-2 pb-3 max-md:pb-2 border-b-1 border-light-gray/90 cursor-pointer hover:scale-[0.99] transition-all"
        onClick={() => {
          setActiveIndex(index);
        }}
      >
        <p className="text-2xl max-md:text-xl font-medium">{question}</p>
        <div
          className="w-full f-fit grid transition-all"
          style={{
            gridTemplateRows: isActive ? "1fr" : "0fr",
          }}
        >
          <p className="text-base overflow-hidden">{answer}</p>
        </div>
      </div>
    </div>
  );
}

import FormattedTextContent from "@/components/ui/formatted-text-content/formatted-text-content";
import { useEffect, useRef, useState, type ReactNode } from "react";

type FormInfoType = {
  title: string;
  details: string;
};

export default function FormInfo({ title, details }: FormInfoType): ReactNode {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (divRef.current) {
      const checkOverflow = () => {
        setIsOverflowing(
          divRef.current!.scrollHeight > divRef.current!.clientHeight
        );
      };
      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      return () => {
        window.removeEventListener("resize", checkOverflow);
      };
    }
  }, [details]); // Depend on details to recheck if content changes

  return (
    <div className="w-full max-w-[650px]  max-lg:max-w-full relative">
      <div
        ref={divRef}
        className="w-full h-fit overflow-auto max-h-[calc(100vh_-_var(--nav-height)_-_4rem)] max-lg:max-h-full sticky top-[calc(var(--nav-height)_+_2rem)] flex flex-col gap-2 p-8 bg-secondary-bg max-sm:bg-secondary-bg border-2 max-sm:border-l-0 max-sm:border-r-0 max-sm:rounded-none max-sm:p-[5vw] border-primary rounded-lg"
        onWheel={isOverflowing ? (e) => e.stopPropagation() : undefined}
      >
        <h2 className="text-3xl font-medium pb-3 border-b-1 border-primary text-primary">
          {title}
        </h2>
        <div className="text-[0.925rem] text-primary">
          <FormattedTextContent content={details} />
        </div>
      </div>
    </div>
  );
}

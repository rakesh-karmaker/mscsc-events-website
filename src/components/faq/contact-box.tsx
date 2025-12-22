import type { ReactNode } from "react";
import PrimaryBtn from "../ui/primary-btn";
import { FaArrowRight } from "react-icons/fa6";

export default function ContactBox(): ReactNode {
  return (
    <div className="w-full h-fit p-8 shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.1)] bg-pure-white flex flex-col gap-4 rounded-md relative z-99">
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-medium">Can't find your answer?</h3>
        <p className="text-[1rem]/[135%] text-black/90 max-w-[40ch]">
          Get in touch with us and let’s have a talk about your questions
        </p>
      </div>
      <PrimaryBtn isLink={true} href="#contact">
        <span className="flex items-center gap-1">
          Contact <FaArrowRight />
        </span>
      </PrimaryBtn>
    </div>
  );
}

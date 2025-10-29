import type { ReactNode } from "react";

export default function Loader(): ReactNode {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-fit h-fit relative flex justify-center items-center">
        <svg viewBox="25 25 50 50" className="loader-container">
          <circle cx="50" cy="50" r="20" className="loader"></circle>
        </svg>
        <img
          src="/explorion/event-icon.png"
          alt="icon"
          className="absolute w-10"
        />
      </div>
    </div>
  );
}

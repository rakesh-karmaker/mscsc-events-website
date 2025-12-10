import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  value: number;
  height: number;
  className?: string;
}

export default function Counter({ value, height, className }: CounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const numDigits = value.toString().length;
    const targetDigits = value
      .toString()
      .padStart(numDigits, "0")
      .split("")
      .map(Number);

    const digits = containerRef.current.querySelectorAll(".digit");

    digits.forEach((digit, index) => {
      const targetY = -targetDigits[index] * height; // Match height
      gsap.fromTo(
        digit,
        { y: 0 }, // Start from 0
        {
          y: targetY,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [value]);

  const numDigits = value.toString().length;
  const places = Array.from({ length: numDigits }, (_, i) =>
    Math.pow(10, numDigits - 1 - i)
  );

  return (
    <div ref={containerRef} className="flex overflow-hidden">
      {places.map((place, _) => (
        <div
          key={place}
          className={`relative overflow-hidden w-[1ch] max-w-[1ch] ${className}`}
          style={{ height: height }}
        >
          <div className="digit absolute inset-0 flex flex-col">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`flex items-center justify-center ${className}`}
                style={{
                  height: height,
                }}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

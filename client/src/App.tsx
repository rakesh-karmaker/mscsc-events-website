import { ReactLenis, type LenisRef } from "lenis/react";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

import { Toaster } from "react-hot-toast";

export default function App({ children }: { children: ReactNode }): ReactNode {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000); // GSAP provides time in seconds, Lenis expects milliseconds
    }

    gsap.ticker.add(update);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    }); // Scroll to top on initial load

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <main className="flex flex-col items-center">{children}</main>
      <Toaster position="top-right" />
    </>
  );
}

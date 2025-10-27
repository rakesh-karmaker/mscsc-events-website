import animateVideo from "@/animations/video";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lazy, Suspense, useRef, useState, type ReactNode } from "react";

const ReactPlayer = lazy(() => import("react-player")); // Lazy load

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Video({ url }: { url: string }): ReactNode {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useGSAP(() => {
    if (videoContainerRef.current && !isError) {
      animateVideo(videoContainerRef.current, window.innerWidth);
    }
  }, []);

  useGSAP(() => {
    if (isReady && playerRef.current) {
      gsap.fromTo(
        playerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" },
      );
    }
  }, [isReady]);

  if (isError) {
    return null;
  }

  return (
    <section
      id="video"
      className="w-full max-w-[1920px] aspect-video my-16 px-4 flex justify-center max-md:px-0"
    >
      <div
        ref={videoContainerRef}
        className="w-full h-fit rounded-2xl overflow-hidden max-md:rounded-none"
      >
        <Suspense
          fallback={<div className="skeleton h-full w-full aspect-video"></div>}
        >
          <div ref={playerRef} className="opacity-0">
            <ReactPlayer
              playing={true}
              muted={true}
              src={url}
              width="100%"
              height="100%"
              loop={true}
              preload="auto"
              className="min-h-fit"
              crossOrigin="anonymous"
              config={{
                youtube: {
                  disablekb: 1,
                  fs: 0,
                  iv_load_policy: 3,
                },
              }}
              onPlay={() => setIsReady(true)} // Trigger fade-in
              onError={() => setIsError(true)}
            />
          </div>
        </Suspense>
      </div>
    </section>
  );
}

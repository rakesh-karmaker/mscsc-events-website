import animateVideo from "@/animations/video";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type ReactNode } from "react";
import ReactPlayer from "react-player";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Video({ url }: { url: string }): ReactNode {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);

  useGSAP(() => {
    if (videoContainerRef.current && !isError) {
      animateVideo(videoContainerRef.current, window.innerWidth);
    }
  }, []);

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
        <ReactPlayer
          playing={true}
          muted={true} // Add muted to allow autoplay
          src={url}
          width={"100%"}
          height={"100%"}
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
          onError={() => {
            setIsError(true);
          }}
        />
      </div>
    </section>
  );
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animateVideo(
  videoContainer: HTMLDivElement,
  innerWidth: number
) {
  gsap.fromTo(
    videoContainer,
    {
      y: 100,
      opacity: 0.8,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
    }
  );

  gsap.fromTo(
    videoContainer,
    {
      maxWidth: innerWidth >= 768 ? "75%" : "90%",
    },
    {
      maxWidth: "100%",
      scrollTrigger: {
        trigger: videoContainer,
        start: "top center",
        end: "center center",
        scrub: 0.5,
      },
    }
  );
}

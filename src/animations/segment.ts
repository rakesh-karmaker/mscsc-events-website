import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animateSegment(segmentRef: HTMLElement) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: segmentRef,
        start: "top bottom",
      },
    })
    .fromTo(
      segmentRef,
      { y: 100, opacity: 0.5 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
}

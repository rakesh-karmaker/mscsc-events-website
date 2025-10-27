import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function animateAboutInfo(
  titleRef: HTMLHeadingElement,
  contentRef: HTMLDivElement
) {
  gsap.set(titleRef, { opacity: 1 });
  let splitTitle: gsap.core.Tween;
  SplitText.create(titleRef, {
    type: "words,lines",
    wordsClass: "will-change-transform",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      splitTitle = gsap.from(self.words, {
        duration: 1,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: titleRef,
          start: "top 80%",
        },
      });
      return splitTitle;
    },
  });

  gsap.fromTo(
    contentRef.childNodes,
    { opacity: 0.8, y: 80 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef,
        start: "top 80%",
      },
    }
  );
}

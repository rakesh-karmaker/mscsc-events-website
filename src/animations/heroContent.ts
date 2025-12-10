import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function animateHeroContent(
  headingRef: HTMLElement,
  textContentRef: HTMLElement,
) {
  gsap.set(headingRef, { opacity: 1 });
  let split: gsap.core.Tween;
  SplitText.create(headingRef, {
    type: "words,lines",
    wordsClass: "will-change-transform",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      split = gsap.from(self.words, {
        duration: 1,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
      return split;
    },
  });

  gsap.fromTo(
    textContentRef.children,
    { opacity: 0.8, y: 80 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    },
  );

  return () => {
    split?.kill();
  };
}

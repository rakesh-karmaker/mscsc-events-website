import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function animateTextReveal(text: HTMLDivElement) {
  gsap.set(text, { opacity: 1 });
  let splitText: gsap.core.Tween;
  SplitText.create(text, {
    type: "words,lines",
    wordsClass: "will-change-transform",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      splitText = gsap.from(self.words, {
        duration: 1,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
        },
      });
      return splitText;
    },
  });
}

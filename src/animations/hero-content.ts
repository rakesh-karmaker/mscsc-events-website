import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function animateHeroContent(
  headingRef: HTMLElement,
  textContentRef: HTMLElement
) {
  gsap.set(headingRef, { opacity: 1 });
  let split: gsap.core.Tween;
  const applyGradientAcrossWords = (container: HTMLElement) => {
    if (!container) return;
    const gradient =
      "linear-gradient(88.63deg, #043841 3.66%, #02899f 118.11%)";
    const width = container.offsetWidth;
    const words = container.querySelectorAll<HTMLElement>(
      ".will-change-transform"
    );
    words.forEach((w) => {
      w.style.display = "inline-block";
      w.style.backgroundImage = gradient;
      w.style.backgroundSize = `${width}px 100%`;
      w.style.backgroundPosition = `-${w.offsetLeft}px 0px`;
      (w.style as any).webkitBackgroundClip = "text";
      w.style.backgroundClip = "text";
      (w.style as any).webkitTextFillColor = "transparent";
      w.style.color = "transparent";
    });
  };

  let resizeObserver: ResizeObserver | null = null;
  const resizeHandler = () => applyGradientAcrossWords(headingRef);

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
      // Apply the gradient to each split word and align it across the full heading width (fixes Chromium behavior)
      applyGradientAcrossWords(headingRef);

      // Reapply on resize so the gradient stays aligned
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(resizeHandler);
        resizeObserver.observe(headingRef);
      } else {
        window.addEventListener("resize", resizeHandler);
      }

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
    }
  );

  return () => {
    split?.kill();
    if (resizeObserver) resizeObserver.disconnect();
    else window.removeEventListener("resize", resizeHandler);
  };
}

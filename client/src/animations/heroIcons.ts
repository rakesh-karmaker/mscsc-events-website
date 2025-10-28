import { gsap } from "gsap";

export default function animateHeroIcons(
  container: HTMLElement,
  innerHeight: number
) {
  const rotations: number[] = [20, 45, 27, -20]; // Corresponding rotations for each icon

  gsap.fromTo(
    container,
    {
      opacity: 0,
      width: 0,
      height: 0,
    },
    {
      delay: 0.5,
      opacity: 1,
      width: "120%",
      height: innerHeight > 700 ? "100%" : "110%",
      duration: 1,
      ease: "power2.out",
    }
  );

  gsap.utils.toArray<HTMLElement>(container.children).forEach((icon, index) => {
    gsap.fromTo(
      icon,
      {
        rotation: 0,
        scale: 0.6,
      },
      {
        delay: 1 + index * 0.2,
        rotation: rotations[index],
        scale: 1,
        duration: 1,
        ease: "back.out",
      }
    );
  });
}

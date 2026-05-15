import gsap from "gsap";

const magneticElements = document.querySelectorAll(".footer-link");

magneticElements.forEach((el) => {
  const xTo = gsap.quickTo(el, "x", {
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  });
  const yTo = gsap.quickTo(el, "y", {
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  });

  el.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    xTo(x * 0.2);
    yTo(y * 0.2);
  });

  el.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
  });
});

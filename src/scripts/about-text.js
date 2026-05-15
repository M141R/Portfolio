import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const el = document.querySelector(".about-text");
if (el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="word">${w} </span>`).join("");

  gsap.to(".about-text .word", {
    color: "#0a0a0a",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".about-text",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });
}

import gsap from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.set("nav", { y: -100, opacity: 0 })
    .set(".middletext h1", { y: 60, opacity: 0 })
    .set(".herosub", { y: 30, opacity: 0 })
    .set(".middletext h1, .herosub, nav", { visibility: "visible" });

  tl.to("nav", { y: 0, opacity: 1, duration: 1.2 })
    .to(".middletext h1", { y: 0, opacity: 1, duration: 1.5 }, "-=0.8")
    .to(".herosub", { y: 0, opacity: 1, duration: 1.2 }, "-=1");
});

import gsap from "gsap";

const initCursor = () => {
  const cursor = document.querySelector(".custom-cursor");

  if (!cursor) return;

  if (!window.matchMedia("(pointer: fine)").matches) {
    cursor.style.display = "none";
    return;
  }

  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

  let isInitialized = false;

  const onMouseMove = (e) => {
    if (!isInitialized) {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      isInitialized = true;
    }
    xTo(e.clientX);
    yTo(e.clientY);
  };

  window.addEventListener("mousemove", onMouseMove);

  const growCursor = () =>
    gsap.to(cursor, { scale: 4, duration: 0.3, ease: "power2.out" });
  const shrinkCursor = () =>
    gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });

  const interactives = document.querySelectorAll(
    "a, button, .project, .skill-header, .footer-link",
  );

  interactives.forEach((el) => {
    el.addEventListener("mouseenter", growCursor);
    el.addEventListener("mouseleave", shrinkCursor);
  });

  document.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 0, duration: 0.3 });
  });

  document.addEventListener("mouseenter", (e) => {
    if (isInitialized) {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCursor);
} else {
  initCursor();
}

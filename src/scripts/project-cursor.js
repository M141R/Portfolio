import gsap from "gsap";

const projectList = document.querySelector(".projectlist");
gsap.set(".project .swipeimage", { xPercent: -50, yPercent: -50 });
const previewControllers = [];

gsap.utils.toArray(".project").forEach((el) => {
  const image = el.querySelector(".swipeimage");
  if (!image) return;

  const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" });
  const setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });

  const align = (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tilt = gsap.utils.mapRange(0, rect.width, -8, 8, x);

    setX(x);
    setY(y);
    gsap.to(image, { rotation: tilt, duration: 0.2, ease: "power2.out" });
  };

  const fade = gsap.to(image, {
    autoAlpha: 1,
    ease: "none",
    paused: true,
    duration: 0.1,
  });
  let isHovering = false;
  let isVisible = false;

  previewControllers.push(() => {
    if (isVisible) {
      gsap.killTweensOf(image);
      gsap.set(image, { autoAlpha: 0 });
      isVisible = false;
    }
  });

  const onScroll = () => {
    if (!el.matches(":hover")) {
      fade.reverse();
      isVisible = false;
    }
    window.removeEventListener("scroll", onScroll);
  };

  el.addEventListener("mouseenter", (e) => {
    isHovering = true;
    if (!isVisible) {
      fade.play(0);
      isVisible = true;
    }
    align(e);
    window.addEventListener("scroll", onScroll, { passive: true });

    const color = el.getAttribute("data-color");
    if (color && projectList) {
      gsap.to(projectList, {
        backgroundColor: color,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  });

  el.addEventListener("mousemove", (e) => {
    if (isHovering && !isVisible) {
      fade.play(0);
      isVisible = true;
    }
    align(e);
  });
  el.addEventListener("mouseleave", () => {
    isHovering = false;
    if (isVisible) {
      fade.reverse();
      isVisible = false;
    }
    window.removeEventListener("scroll", onScroll);

    if (projectList) {
      gsap.to(projectList, {
        backgroundColor: "transparent",
        duration: 0.6,
        ease: "power2.out",
      });
    }
  });
});

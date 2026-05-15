import gsap from "gsap";

const skillRows = document.querySelectorAll(".skill-row");

skillRows.forEach((row) => {
  const header = row.querySelector(".skill-header");
  const body = row.querySelector(".skill-body");
  const tags = row.querySelectorAll(".tag");
  let isOpen = false;
  let tl = null;

  header.addEventListener("click", () => {
    if (tl) tl.kill();

    if (!isOpen) {
      row.classList.add("open");
      isOpen = true;
      gsap.set(body, { height: "auto" });
      const h = body.offsetHeight;
      gsap.set(body, { height: 0 });

      tl = gsap
        .timeline()
        .to(body, { height: h, duration: 0.45, ease: "power3.out" })
        .to(
          tags,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.4)",
          },
          "-=0.2",
        );
    } else {
      row.classList.remove("open");
      isOpen = false;

      tl = gsap
        .timeline()
        .to(tags, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.in",
        })
        .to(body, { height: 0, duration: 0.35, ease: "power3.inOut" }, "-=0.1");
    }
  });
});

import gsap from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  const LETTERS = [
    "/trail/m.png",
    "/trail/i.png",
    "/trail/h.png",
    "/trail/r.png",
  ];

  const LOGOS = ["/trail/js.png", "/trail/python.png", "/trail/git.png"];

  const CODE_TOKENS = [
    "() =>",
    "</>",
    "&&",
    "null",
    "{}",
    "async",
    "??",
    "npm i",
    "===",
    "[ ]",
  ];

  function getRandomElement() {
    const roll = Math.random();
    if (roll < 0.3)
      return {
        type: "image",
        src: LETTERS[Math.floor(Math.random() * LETTERS.length)],
      };
    if (roll < 0.8)
      return {
        type: "text",
        val: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)],
      };
    return {
      type: "image",
      src: LOGOS[Math.floor(Math.random() * LOGOS.length)],
    };
  }

  const POOL_SIZE = 18;
  const pool = [];

  for (let i = 0; i < POOL_SIZE; i++) {
    const img = document.createElement("img");
    img.style.cssText = `
      position: absolute;
      width: 52px;
      height: 52px;
      object-fit: contain;
      pointer-events: none;
      opacity: 0;
    `;
    hero.appendChild(img);
    pool.push({ kind: "image", el: img });

    const span = document.createElement("span");
    span.style.cssText = `
      position: absolute;
      font-family: 'Fira Code', monospace;
      font-size: 15px;
      font-weight: 500;
      color: #0F0F0F;
      pointer-events: none;
      opacity: 0;
      white-space: nowrap;
    `;
    hero.appendChild(span);
    pool.push({ kind: "text", el: span });
  }

  let imagePoolIndex = 0;
  let textPoolIndex = 0;
  const imageSlots = pool.filter((p) => p.kind === "image");
  const textSlots = pool.filter((p) => p.kind === "text");

  const gap = 60;
  let mousePos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });

  hero.addEventListener("mouseleave", () => {
    mousePos = { x: -200, y: -200 };
  });

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const tick = () => {
    const dist = Math.hypot(
      lastMousePos.x - mousePos.x,
      lastMousePos.y - mousePos.y,
    );
    if (dist > gap) {
      spawnElement();
      lastMousePos = { ...mousePos };
    }
  };

  if (!prefersReducedMotion) {
    gsap.ticker.add(tick);
  }

  function spawnElement() {
    const data = getRandomElement();
    const rotation = gsap.utils.random(-30, 30);

    if (data.type === "image") {
      const slot = imageSlots[imagePoolIndex % imageSlots.length];
      imagePoolIndex++;
      const el = slot.el;

      gsap.killTweensOf(el);
      el.src = data.src;

      gsap.set(el, {
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
        rotation,
        scale: 0,
        opacity: 1,
      });

      gsap
        .timeline()
        .to(el, { scale: 1, ease: "elastic.out(1, 0.4)", duration: 0.6 })
        .to(el, { rotation: rotation + gsap.utils.random(-20, 20) }, "<")
        .to(
          el,
          { y: "+=130", opacity: 0, ease: "back.in(0.4)", duration: 1 },
          0.1,
        );
    } else {
      const slot = textSlots[textPoolIndex % textSlots.length];
      textPoolIndex++;
      const el = slot.el;

      gsap.killTweensOf(el);
      el.textContent = data.val;

      gsap.set(el, {
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
        rotation: gsap.utils.random(-15, 15),
        scale: 0,
        opacity: 0,
        fontSize: `${gsap.utils.random(13, 20)}px`,
      });

      gsap
        .timeline()
        .to(el, {
          scale: 1,
          opacity: 0.65,
          ease: "back.out(1.5)",
          duration: 0.3,
        })
        .to(
          el,
          {
            y: "+=80",
            x: `+=${gsap.utils.random(-15, 15)}`,
            opacity: 0,
            duration: 0.9,
            ease: "power2.in",
          },
          0.2,
        );
    }
  }

  if (prefersReducedMotion) {
    gsap.ticker.remove(tick);
  }
});

import gsap from "gsap";

/**
 * A custom scramble effect since ScrambleTextPlugin is a GSAP Club member plugin.
 * This implementation achieves a similar look using standard GSAP.
 */

const navLinks = document.querySelectorAll(".nav-links a");
const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789@#$%&";

navLinks.forEach((link) => {
  const originalText = link.textContent;
  let isScrambling = false;

  link.addEventListener("mouseenter", () => {
    if (isScrambling) return;
    isScrambling = true;

    let iteration = 0;
    const interval = setInterval(() => {
      link.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
        isScrambling = false;
      }

      iteration += 1 / 3;
    }, 30);
  });
});

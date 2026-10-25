import { motionPreference, playMotion } from "./motion.js";

// Each part of the page has its own entrance, with readable static fallbacks.
const targets = [
  ".hero-t h1", ".hero-t h2", ".hero-t > p", ".hero-t .btns", ".frame", ".tape",
  "#about > div", "#projects .sh", "#feat", ".pc",
  "#experience .sec", ".ti", "#skills .sec", ".skills > div", "#certs > div",
  "footer .grid2 > div", "footer .form", ".cutie-mark", ".butterfly-mark",
  ".twilight-mark", ".friendship-marks img",
].join(", ");
const revealed = new WeakSet();

function reveal(element, index) {
  let delay = Math.min(index, 3) * 65;
  if (element.matches(".hero-t h1")) {
    element.querySelectorAll(".headline-line").forEach((line, lineIndex) => {
      playMotion(line, [{ translate: "0 110%" }, { translate: "0 0" }], {
        duration: 850, delay: lineIndex * 120,
      });
    });
    return;
  }
  if (element.closest(".hero-t")) {
    delay = element.matches("h2") ? 180 : element.matches("p") ? 260 : 340;
  }
  if (element.matches(".cutie-mark, .butterfly-mark, .twilight-mark, .friendship-marks img")) {
    playMotion(element, [
      { opacity: 0, scale: ".65", rotate: "-14deg", offset: 0 },
      { opacity: 1, scale: "1.07", rotate: "3deg", offset: .7 },
      { opacity: 1, scale: "1", rotate: "0deg", offset: 1 },
    ], { duration: 700, delay: element.matches(".twilight-mark") ? 550 : delay + 100 });
    return;
  }
  if (element.matches(".frame")) {
    playMotion(element, [
      { opacity: 0, translate: "0 34px", rotate: "-6deg" },
      { opacity: 1, translate: "0 0", rotate: "0deg" },
    ], { duration: 950, delay: 160 });
    return;
  }
  if (element.matches(".tape")) {
    playMotion(element, [
      { opacity: 0, scale: "1.12", translate: "0 -8px" },
      { opacity: 1, scale: "1", translate: "0 0" },
    ], { duration: 500, delay: element.matches(".t1") ? 420 : 520 });
    return;
  }
  playMotion(element, [
    { opacity: 0, translate: "0 26px" },
    { opacity: 1, translate: "0 0" },
  ], { delay });

  const image = element.matches(".pc, #feat") && element.querySelector(".ph");
  if (image) {
    playMotion(image, [
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)" },
    ], { duration: 850, delay: delay + 100 });
  }
  const photoStack = element.querySelector(".stage");
  if (photoStack) {
    playMotion(photoStack, [
      { rotate: "-3deg", scale: ".94" },
      { rotate: "0deg", scale: "1" },
    ], { duration: 900, delay });
  }
}

const observer = new IntersectionObserver((entries) => {
  const entering = entries.filter((entry) => entry.isIntersecting);
  entering.forEach((entry, index) => {
    observer.unobserve(entry.target);
    revealed.add(entry.target);
    if (motionPreference.matches) return;
    reveal(entry.target, index);
  });
}, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

function observeReveals() {
  document.querySelectorAll(targets).forEach((element) => {
    if (revealed.has(element)) return;
    observer.observe(element);
  });
}

if (!motionPreference.matches) observeReveals();

// Project cards are replaced when the featured carousel changes.
const projectObserver = new MutationObserver(() => {
  if (!motionPreference.matches) observeReveals();
});
projectObserver.observe(document.querySelector("#pgrid"), { childList: true });

motionPreference.addEventListener("change", () => {
  if (motionPreference.matches) {
    observer.disconnect();
  } else {
    observeReveals();
  }
});

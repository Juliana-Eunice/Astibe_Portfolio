import { $ } from "./utils.js";

// Experience timeline
const exp = [
  ["Secretary", "Institute of Bachelors in IT Studies", "Oct 2026 - Present", "ibits.jpg"],
  ["Research & Development", "ARK PH", "Aug 2026 - Present", "ark.png"],
  ["Social Media Manager", "Cisco NetConnect PUP - Manila", "Feb 2025 - Jul 2026", "cncp.jpg"],
  ["UI/UX Cadet", "Google Developer Groups PUP", "Nov 2025 - 2026", "gdg.png"],
  ["Operations Associate, Logistics", "Google Developer Groups PUP", "Nov 2024 - 2026", "gdg.png"],
  ["Co-Head, Sponsorship & External Affairs", "HATAW PUP", "Jun 2025 - 2026", "hataw.jpg"],
  ["Illustrator", "AWS Cloud Club PUP", "Oct 2024 - Jul 2025", "aws.jpg"],
  ["Head Social Media Editor", "The Arellano Standard Manila", "Aug 2023 - Jul 2024", "tsm.jpg"],
];

$("#tl").innerHTML = exp
  .map(
    (e) =>
      `<li class="ti"><div class="logo exp-logo is-loading"><span class="exp-skeleton" aria-hidden="true"></span><img class="exp-img" src="assets/logos/${e[3]}" alt="${e[1]} logo" loading="lazy"><svg class="ic exp-fallback" aria-hidden="true"><use href="#brief"/></svg></div><div><h4>${e[0]}</h4><div class="o">${e[1]}</div><small>${e[2]}</small></div></li>`
  )
  .join("");

$("#tl").querySelectorAll(".exp-img").forEach((image) => {
  const logo = image.parentElement;
  const markLoaded = () => {
    logo.classList.remove("is-loading");
    logo.classList.add("is-loaded");
  };
  const markError = () => {
    logo.classList.remove("is-loading");
    logo.classList.add("has-error");
  };

  image.addEventListener("load", markLoaded, { once: true });
  image.addEventListener("error", markError, { once: true });

  if (image.complete) {
    if (image.naturalWidth > 0) markLoaded();
    else markError();
  }
});

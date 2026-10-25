import { $ } from "./utils.js";

// Experience timeline
const exp = [
  ["Secretary", "Institute of Bachelors in IT Studies", "Oct 2026 - Present"],
  ["Research & Development", "ARK PH", "Aug 2026 - Present"],
  ["Social Media Manager", "Cisco NetConnect PUP - Manila", "Feb 2025 - Jul 2026"],
  ["UI/UX Cadet", "Google Developer Groups PUP", "Nov 2025 - 2026"],
  ["Operations Associate, Logistics", "Google Developer Groups PUP", "Nov 2024 - 2026"],
  ["Co-Head, Sponsorship & External Affairs", "HATAW PUP", "Jun 2025 - 2026"],
  ["Illustrator", "AWS Cloud Club PUP", "Oct 2024 - Jul 2025"],
  ["Head Social Media Editor", "The Arellano Standard Manila", "Aug 2023 - Jul 2024"],
];

$("#tl").innerHTML = exp
  .map(
    (e) =>
      `<li class="ti"><div class="logo"><svg class="ic" aria-hidden="true"><use href="#brief"/></svg></div><div><h4>${e[0]}</h4><div class="o">${e[1]}</div><small>${e[2]}</small></div></li>`
  )
  .join("");

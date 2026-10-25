import { $, root } from "./utils.js";

// Theme toggle with localStorage persistence
const saved = localStorage.getItem("t");
if (saved === "light" || saved === "dark") root.dataset.theme = saved;

const setIc = () => {
  $("#themeIc").setAttribute(
    "href",
    root.dataset.theme === "dark" ? "#sun" : "#moon"
  );
  $("#theme").setAttribute("aria-label", `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} theme`);
};

setIc();

$("#theme").onclick = () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("t", root.dataset.theme);
  setIc();
};

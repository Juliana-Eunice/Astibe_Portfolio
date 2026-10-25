import { $ } from "./utils.js";

// Image lightbox modal
const modal = $("#imgModal");
const modalImg = $("#modalImg");
const modalCap = $("#modalCap");
const modalClose = $("#modalClose");
let returnFocus;

export function openModal(src, caption) {
  returnFocus = document.activeElement;
  modalImg.src = src;
  modalImg.alt = caption || "Expanded preview";
  modalCap.textContent = caption || "Image Preview";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modal.inert = false;
  $("main").inert = true;
  $("header").inert = true;
  $("footer").inert = true;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

export function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modal.inert = true;
  $("main").inert = false;
  $("header").inert = false;
  $("footer").inert = false;
  document.body.style.overflow = "";
  if (returnFocus?.isConnected) returnFocus.focus();
}

modalClose.onclick = closeModal;
$(".modal-bg").onclick = closeModal;

addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

document.addEventListener("click", (e) => {
  const target = e.target.closest(".img-zoomable");
  if (target) {
    const img = target.querySelector("img");
    if (img)
      openModal(img.src, target.getAttribute("data-caption") || img.alt);
  }
});

function preparePreviews() {
  document.querySelectorAll(".img-zoomable").forEach((preview) => {
    preview.tabIndex = 0;
    preview.setAttribute("role", "button");
    preview.setAttribute("aria-label", `Enlarge ${preview.querySelector("img")?.alt || "image"}`);
  });
}
preparePreviews();
new MutationObserver(preparePreviews).observe($("main"), { childList: true, subtree: true });
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && modal.classList.contains("open")) {
    event.preventDefault();
    modalClose.focus();
  }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".img-zoomable")) {
    event.preventDefault();
    event.target.click();
  }
});

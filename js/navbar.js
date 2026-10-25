import { $, $$ } from "./utils.js";

// Responsive mobile navigation
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
const navBackdrop = $("#navBackdrop");

export function closeNav() {
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("active");
  navBackdrop.classList.remove("active");
  navBackdrop.setAttribute("aria-hidden", "true");
}

export function openNav() {
  navToggle.classList.add("active");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close navigation menu");
  navLinks.classList.add("active");
  navBackdrop.classList.add("active");
  navBackdrop.setAttribute("aria-hidden", "false");
  navLinks.querySelector("a").focus();
}

navToggle.onclick = () => {
  const isOpen = navToggle.classList.contains("active");
  isOpen ? closeNav() : openNav();
};

navBackdrop.onclick = closeNav;
$(".nav-brand").addEventListener("click", closeNav);

// Auto-close menu when clicking nav links
$$("#navLinks a").forEach((a) => {
  a.addEventListener("click", () => {
    closeNav();
  });
});

// Close nav on Escape
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navToggle.classList.contains("active")) {
    closeNav();
    navToggle.focus();
  }
});

// Auto-close dropdown when resizing back to desktop
addEventListener("resize", () => {
  if (window.innerWidth > 800) closeNav();
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeId = ["skills", "certs"].includes(entry.target.id) ? "experience" : entry.target.id;
    $$("#navLinks a").forEach((link) => {
      if (link.hash === `#${activeId}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-15% 0px -55% 0px" });
$$("main section[id], footer[id]").forEach((section) => sectionObserver.observe(section));

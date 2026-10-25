import { $ } from "./utils.js";

// Prepare an email without claiming the message has been delivered.
$("#form").onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = `${data.get("firstName").trim()} ${data.get("lastName").trim()}`;
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${data.get("message").trim()}\n\nFrom: ${name}\nEmail: ${data.get("email").trim()}`);
  window.location.href = `mailto:julianaeunice81@gmail.com?subject=${subject}&body=${body}`;
  $("#formStatus").textContent = "Your email draft is ready. Send it from your email app, or email julianaeunice81@gmail.com directly.";
};

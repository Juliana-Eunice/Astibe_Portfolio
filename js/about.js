import { $, mod } from "./utils.js";

// About carousel data + rendering
const IMG = "assets/images/";

const about = [
  {
    title: "Leadership & Community",
    desc: "Communities and organizations have been a big part of my journey. I enjoy leading initiatives, collaborating with peers, and contributing to meaningful projects.",
    img: `${IMG}community.jpeg`,
  },
  {
    title: "Opportunities & Learning",
    desc: "I am passionate about learning and exploring new opportunities. I actively seek out experiences that challenge me, expand my knowledge, and allow me to grow both personally and professionally.",
    img: `${IMG}cisco.jpg`,
  },
  {
    title: "Design & Creative Flow",
    desc: "I enjoy expressing myself through art, illustrations, and design projects. It allows me to explore creativity and bring ideas to life visually.",
    img: `${IMG}painting.jpg`,
  },
  {
    title: "Events & Partnerships",
    desc: "I love going to events, participating, and volunteering! It lets me explore new ideas, meet people, and learn from different perspectives.",
    img: `${IMG}globe.jpg`,
  },
];

let ai = 0;
const st = $("#aboutCar .stage");

about.forEach((x) => {
  const d = document.createElement("div");
  d.className = "slide img-zoomable";
  d.setAttribute("data-caption", x.title);
  d.innerHTML = `<img src="${x.img}" alt="${x.title}" class="preview-img" loading="lazy" /><span class="slide-label">${x.title}</span>`;
  st.appendChild(d);
});

function renderAbout() {
  [...st.children].forEach((s, i) => {
    const o = mod(i - ai + about.length / 2, about.length) - about.length / 2;
    const ab = Math.abs(o);
    s.style.transform = `translateX(${o * 36}%) scale(${1 - ab * 0.13}) rotate(${o * 3}deg)`;
    s.style.filter = "none";
    s.style.opacity = ab > 1 ? 0 : 1;
    s.style.zIndex = 10 - ab;
    s.style.boxShadow = ab ? "none" : "0 5px 12px #33295812";
    s.style.pointerEvents = ab === 0 ? "auto" : "none";
    s.inert = ab !== 0;
    s.setAttribute("aria-hidden", String(ab !== 0));
  });
  const d = $("#aboutDesc");
  d.style.opacity = 0;
  setTimeout(() => {
    d.textContent = about[ai].desc;
    d.style.opacity = 1;
  }, 200);
}

$("#aboutCar .pv").onclick = () => {
  ai = mod(ai - 1, about.length);
  renderAbout();
};

$("#aboutCar .nx").onclick = () => {
  ai = mod(ai + 1, about.length);
  renderAbout();
};

renderAbout();

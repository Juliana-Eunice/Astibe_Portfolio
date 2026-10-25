import { $, mod } from "./utils.js";

// Certifications vertical carousel
const IMG = "assets/images/";

const certs = [
  {
    title: "DataCamp SQL Fundamentals",
    desc: "Completed DataCamp's 26-hour curriculum covering relational database querying, multi-table joins, subqueries, and data manipulation in PostgreSQL for exploratory data analysis.",
    img: `${IMG}sql_funda.png`,
  },
  {
    title: "DataCamp Understanding Data Science",
    desc: "Built foundational knowledge of the data science lifecycle, data preparation, A/B testing, time series forecasting, and machine learning concepts via DataCamp.",
    img: `${IMG}Understanding Data Science.png`,
  },
  {
    title: "Cisco Networking Basics",
    desc: "Learned the fundamentals of networking, including IP addressing, routing, switching, and network protocols through Cisco's Networking Basics course.",
    img: `${IMG}cisco_cert.png`,
  },
];

let ci = 0;
const vs = $("#vstage");

certs.forEach((c) => {
  const d = document.createElement("div");
  d.className = "vs img-zoomable";
  d.setAttribute("data-caption", c.title);
  d.innerHTML = `<img src="${c.img}" alt="${c.title}" class="preview-img" loading="lazy" /><span class="slide-label">${c.title}</span>`;
  vs.appendChild(d);
});

function renderC() {
  [...vs.children].forEach((s, i) => {
    const o = mod(i - ci + certs.length / 2, certs.length) - certs.length / 2;
    const ab = Math.abs(o);
    s.style.transform = `translateY(${o * 22}px) scale(${1 - ab * 0.06})`;
    s.style.filter = "none";
    s.style.zIndex = 10 - ab;
    s.style.opacity = ab > 1 ? 0 : 1;
    s.style.pointerEvents = ab === 0 ? "auto" : "none";
    s.inert = ab !== 0;
    s.setAttribute("aria-hidden", String(ab !== 0));
  });
  const d = $("#certDesc");
  d.style.opacity = 0;
  setTimeout(() => {
    d.textContent = certs[ci].desc;
    d.style.opacity = 1;
  }, 200);
}

const step = (n) => {
  ci = mod(ci + n, certs.length);
  renderC();
};

$(".vcar .up").onclick = () => step(-1);
$(".vcar .dn").onclick = () => step(1);

renderC();

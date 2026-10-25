import { $, mod } from "./utils.js";
import { motionPreference, playMotion } from "./motion.js";


// Projects dataset + featured/grid rendering
const IMG = "assets/images/";

const allProjects = [
  {
    id: 0,
    title: "CDO PWD Online Registration Redesign",
    desc: "Redesign of the Cagayan de Oro PWD online application website in observance of usability heuristics, accessibility standards, and modern UI practices.",
    tags: ["Figma", "HTML", "CSS", "JavaScript"],
    hasWebsite: true,
    hasRepo: true,
    websiteUrl: "https://cagayandeoropwd.netlify.app/",
    repoUrl: "https://github.com/Juliana-Eunice/CagayanDeOro_PWD",
    img: `${IMG}cdo.png`,
  },
  {
    id: 1,
    title: "Pag-IBIG Applicants Admin Dashboard",
    desc: "Real-time applicants database connected with CRUD functionalities, featuring intuitive records tracking and responsive interface design.",
    tags: ["MySQL", "Java", "HTML", "CSS", "JavaScript"],
    hasWebsite: false,
    hasRepo: true,
    websiteUrl: null,
    repoUrl: "https://github.com/Juliana-Eunice/Pag-ibig_DatabaseProject",
    img: `${IMG}pagibig.png`,
  },
  {
    id: 2,
    title: "Forecasting Traffic Volume Trends Using Time Series Analysis",
    desc: "Time series analysis and forecasting of traffic volume trends deployed through an interactive Streamlit application.",
    tags: ["Python", "Streamlit", "Time Series", "Pandas"],
    hasWebsite: true,
    hasRepo: true,
    websiteUrl:
      "https://juliana-eunice-forecastingtrafficvolumetrends-app-x2i1gw.streamlit.app/",
    repoUrl: "https://github.com/Juliana-Eunice/ForecastingTrafficVolumeTrends",
    img: `${IMG}forecast.png`,
  },
  {
    id: 3,
    title: "My Little Pony Data Science Project",
    desc: "An R-based analysis of My Little Pony fan demographics, favorite characters, and consumer engagement, using statistics and ggplot2 visualizations.",
    tags: ["R", "Data Cleaning", "Statistics", "Data Visualization", "ggplot2"],
    hasWebsite: false,
    hasRepo: true,
    websiteUrl: null,
    repoUrl: "https://github.com/Juliana-Eunice/MyLittlePony-Data-Science-Project",
    img: `${IMG}mlp_datasci.png`,
  },
  {
    id: 4,
    title: "Portfolio for Object Oriented Programming",
    desc: "Interactive showcase built with fundamental web technologies demonstrating OOP architecture, event-driven components, and modular scripting.",
    tags: ["HTML", "CSS", "JavaScript", "OOP"],
    hasWebsite: true,
    hasRepo: true,
    websiteUrl: "https://astibe-oop-eportfolio.vercel.app/",
    repoUrl: "https://github.com/Juliana-Eunice/AstibePortfolio",
    img: `${IMG}oop.png`,
  },
  {
    id: 5,
    title: "Reviewer System With Note-Taking and Scheduling Features",
    desc: "Personalized study workflow application combining notes organization, structured review sets, and milestone scheduling.",
    tags: ["Mobile", "UI/UX", "Productivity"],
    hasWebsite: false,
    hasRepo: false,
    websiteUrl: null,
    repoUrl: null,
    img: `${IMG}app.jpg`,
  },
  {
    id: 6,
    title: "Student Management System",
    desc: "Desktop record management platform developed using Visual Basic (VB.NET) with local data persistence and validation routines.",
    tags: ["VB.NET", "Database", "Desktop App"],
    hasWebsite: false,
    hasRepo: false,
    websiteUrl: null,
    repoUrl: null,
    img: `${IMG}vbnet.png`,
  },
];


const featuredProjects = allProjects.filter((project) => project.hasRepo);
let activeFeaturedIdx = 0;

function getVisibleProjects() {
  return window.matchMedia("(max-width: 600px)").matches
    ? allProjects
    : featuredProjects;
}


function buildActionButtons(project) {
  const links = [];
  if (project.hasWebsite) links.push(`<a class="btn sm" href="${project.websiteUrl}" target="_blank" rel="noopener">View Website ↗</a>`);
  if (project.hasRepo) links.push(`<a class="btn sm alt" href="${project.repoUrl}" target="_blank" rel="noopener">View Repository ↗</a>`);
  return links.join("") || '<span class="pill">Project archive</span>';
}

export function renderProjects(direction = 0) {
  const visibleProjects = getVisibleProjects();
  activeFeaturedIdx = mod(activeFeaturedIdx, visibleProjects.length);
  const current = visibleProjects[activeFeaturedIdx];
  $("#fT").textContent = current.title;
  $("#fD").textContent = current.desc;
  $("#fG").innerHTML = current.tags.map((tag) => `<span>${tag}</span>`).join("");
  $("#fPh").setAttribute("data-caption", current.title);
  $("#fPh").innerHTML = `<img src="${current.img}" alt="${current.title}" class="preview-img" />`;
  $("#fActions").innerHTML = buildActionButtons(current);

  if (direction) {
    const image = $("#fPh img");
    image.addEventListener("load", () => {
      if (!image.isConnected) return;
      playMotion(image, [
        { opacity: 0, translate: `${direction * 22}px 0`, scale: "1.025" },
        { opacity: 1, translate: "0 0", scale: "1" },
      ]);
    }, { once: true });
    [$("#fT"), $("#fD"), $("#fG")].forEach((element, index) => {
      playMotion(element, [
        { opacity: 0, translate: "0 12px" },
        { opacity: 1, translate: "0 0" },
      ], { duration: 450, delay: index * 60 });
    });
  }

  // Keep every other project visible, including those without a public repository.
  const remaining = allProjects.filter((project) => project.id !== current.id);
  $("#pgrid").innerHTML = remaining.map((project) => `
    <article class="card pc">
      <div class="prev">
        <div class="ph wide img-zoomable" data-caption="${project.title}">
          <img src="${project.img}" alt="${project.title}" class="preview-img" loading="lazy" />
        </div>
        <div class="pa">${buildActionButtons(project)}</div>
        <h4>${project.hasRepo
          ? `<button class="project-select" type="button" data-project-id="${project.id}" aria-label="Feature ${project.title}">${project.title}</button>`
          : project.title}</h4>
      </div>
      <div class="fb">
        <p>${project.desc}</p>
        <p class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</p>
      </div>
    </article>`).join("");

  document.querySelectorAll(".project-select").forEach((button) => {
    button.onclick = () => {
      const visibleProjects = getVisibleProjects();
      activeFeaturedIdx = visibleProjects.findIndex(
        (project) => project.id === Number(button.dataset.projectId),
      );
      renderProjects(1);
      $("#fPh").focus({ preventScroll: true });
      $("#projects").scrollIntoView({ behavior: motionPreference.matches ? "auto" : "smooth" });
    };
  });
}

$("#feat .pv").onclick = () => {
  activeFeaturedIdx = mod(activeFeaturedIdx - 1, getVisibleProjects().length);
  renderProjects(-1);
};

$("#feat .nx").onclick = () => {
  activeFeaturedIdx = mod(activeFeaturedIdx + 1, getVisibleProjects().length);
  renderProjects(1);
};

renderProjects();

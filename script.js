/* ---------------------------------------------------------
   1. Edit this array with your own projects.
      Clicking anywhere on a project card opens its `repo` URL
      in a new tab.
--------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Project One",
    description: "A short, plain-language description of what this project does and the problem it solves.",
    tags: ["JavaScript", "Node.js"],
    repo: "https://github.com/yourusername/project-one"
  },
  {
    title: "Project Two",
    description: "A short, plain-language description of what this project does and the problem it solves.",
    tags: ["Python", "Data"],
    repo: "https://github.com/yourusername/project-two"
  },
  {
    title: "Project Three",
    description: "A short, plain-language description of what this project does and the problem it solves.",
    tags: ["React", "CSS"],
    repo: "https://github.com/yourusername/project-three"
  },
  {
    title: "Project Four",
    description: "A short, plain-language description of what this project does and the problem it solves.",
    tags: ["TypeScript"],
    repo: "https://github.com/yourusername/project-four"
  }
];

const GITHUB_ICON = `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
  0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
  -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07
  -1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
  a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
  0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38
  A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
</svg>`;

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project) => `
    <a class="project-card" href="${project.repo}" target="_blank" rel="noopener"
       aria-label="Open ${project.title} on GitHub">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__desc">${project.description}</p>
      <ul class="project-card__tags">
        ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
      <span class="project-card__link">${GITHUB_ICON} View repository</span>
    </a>
  `).join("");
}

/* ---------------------------------------------------------
   2. Sticky nav: appears once the cover is scrolled past,
      highlights the section currently in view.
--------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById("siteNav");
  const cover = document.getElementById("cover");
  const navLinks = document.querySelectorAll(".site-nav__links a");
  const sections = document.querySelectorAll("main .section");

  const coverObserver = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: "-10px 0px 0px 0px" }
  );
  coverObserver.observe(cover);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // Mobile menu toggle
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   3. Reveal sections as they scroll into view.
--------------------------------------------------------- */
function initReveal() {
  const sections = document.querySelectorAll("main .section");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((section) => revealObserver.observe(section));
}

/* ---------------------------------------------------------
   4. Misc
--------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initNav();
  initReveal();
  initFooterYear();
});

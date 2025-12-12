// assets/js/projects-page.js
(function () {
  const grid = document.getElementById("projectGrid");
  if (!grid || !window.PROJECTS) return;

  const tabs = document.querySelectorAll(".tabs .tab");
  const searchInput = document.getElementById("searchInput");
  const techSelect = document.getElementById("techSelect");
  const yearSelect = document.getElementById("yearSelect");
  const clearBtn = document.getElementById("clearFilters");

  let currentCategoryFilter = ""; // "", "professionnel", "personnel"

  const GROUP_ORDER = [
    "Web full-stack",
    "Front-end & UI",
    "Mobile",
    "Desktop & client lourd",
    "Projets académiques & TP",
  ];

  // ---------- Modale projet ----------
  const modal = document.getElementById("projectModal");
  const modalBody = modal ? modal.querySelector(".project-modal-body") : null;
  const modalClose = modal ? modal.querySelector(".project-modal-close") : null;
  const modalBackdrop = modal
    ? modal.querySelector(".project-modal-backdrop")
    : null;

  function openProjectModal(p) {
    if (!modal || !modalBody) return;

    const techHtml =
      p.tech && p.tech.length
        ? `<div class="chips">${p.tech
            .map((t) => `<span class="chip">${t}</span>`)
            .join("")}</div>`
        : "";

    const longDesc = p.details || p.longDescription || "";

    modalBody.innerHTML = `
      <h2>${p.title}</h2>
      <div class="project-modal-meta">
        ${p.role ? `<span>${p.role}</span>` : ""}
        ${p.role && p.year ? " · " : ""}
        ${p.year ? `<span>${p.year}</span>` : ""}
      </div>

      <div class="project-modal-text">
        ${longDesc || `<p class="muted">${p.description}</p>`}
      </div>

      ${techHtml}

      <div class="project-modal-actions">
        ${
          p.links?.repo
            ? `<a class="btn" href="${p.links.repo}" target="_blank" rel="noopener">
                 Code
               </a>`
            : ""
        }
        ${
          p.links?.demo
            ? `<a class="btn primary" href="${p.links.demo}" target="_blank" rel="noopener">
                 Voir la démo
               </a>`
            : ""
        }
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  modalClose?.addEventListener("click", closeProjectModal);
  modalBackdrop?.addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });

  // ---------- Filtres ----------
  function applyFilters() {
    const q = (searchInput?.value || "").toLowerCase().trim();
    const tech = techSelect?.value || "";
    const year = yearSelect?.value || "";

    return window.PROJECTS.filter((p) => {
      if (currentCategoryFilter && p.category !== currentCategoryFilter) {
        return false;
      }

      if (q) {
        const haystack = [
          p.title,
          p.description,
          p.role || "",
          ...(p.tech || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      if (tech) {
        const techs = (p.tech || []).map((t) => t.toLowerCase());
        if (!techs.includes(tech.toLowerCase())) return false;
      }

      if (year && String(p.year) !== String(year)) return false;

      return true;
    });
  }

  // ---------- Carte projet ----------
  function createProjectCard(p) {
    const article = document.createElement("article");
    article.className = "card project";

    const hasImage = !!p.image;

    // Projets professionnels cliquables → modale
    if (p.category === "professionnel") {
      article.classList.add("project-pro");
      article.addEventListener("click", (e) => {
        if (e.target.closest("a")) return; // si l’utilisateur clique sur un lien, ne pas ouvrir la modale
        openProjectModal(p);
      });
    }

    article.innerHTML = `
      ${
        hasImage
          ? `<img class="project-cover" src="${p.image}" alt="${p.title}">`
          : ""
      }
      <h3>${p.title}</h3>
      <p class="muted">${p.description}</p>
      ${
        p.tech && p.tech.length
          ? `<div class="chips">${p.tech
              .map((t) => `<span class="chip">${t}</span>`)
              .join("")}</div>`
          : ""
      }
      <div class="row actions">
        ${
          p.links?.repo
            ? `<a class="btn" href="${p.links.repo}" target="_blank" rel="noopener">Code</a>`
            : ""
        }
        ${
          p.links?.demo
            ? `<a class="btn" href="${p.links.demo}" target="_blank" rel="noopener">Demo</a>`
            : ""
        }
        ${
          p.links?.caseStudy
            ? `<a class="btn" href="${p.links.caseStudy}" target="_blank" rel="noopener">Case study</a>`
            : ""
        }
      </div>
      <p class="muted" style="margin-top:8px;font-size:0.85rem;">
        ${p.role ? `${p.role} · ` : ""}${p.year || ""}
      </p>
    `;

    return article;
  }

  // ---------- Rendu des projets ----------
  function renderProjects() {
    const projects = applyFilters();
    grid.innerHTML = "";

    if (!projects.length) {
      grid.innerHTML =
        '<p class="muted">Aucun projet ne correspond à ces filtres.</p>';
      return;
    }

    const groups = {};
    projects.forEach((p) => {
      const key = p.group || "Autres";
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });

    const orderedGroups = [
      ...GROUP_ORDER.filter((g) => groups[g]),
      ...Object.keys(groups).filter((g) => !GROUP_ORDER.includes(g)),
    ];

    orderedGroups.forEach((groupName) => {
      const wrapper = document.createElement("section");
      wrapper.className = "project-group";

      const title = document.createElement("h3");
      title.className = "project-group-title";
      title.textContent = groupName;

      const cardsWrap = document.createElement("div");
      cardsWrap.className = "cards";

      groups[groupName].forEach((p) => {
        cardsWrap.appendChild(createProjectCard(p));
      });

      wrapper.appendChild(title);
      wrapper.appendChild(cardsWrap);
      grid.appendChild(wrapper);
    });
  }

  // ---------- Tabs ----------
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const cat = tab.dataset.category || "";
      currentCategoryFilter = cat;
      renderProjects();
    });
  });

  // ---------- Listeners filtres ----------
  searchInput?.addEventListener("input", renderProjects);
  techSelect?.addEventListener("change", renderProjects);
  yearSelect?.addEventListener("change", renderProjects);
  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (techSelect) techSelect.value = "";
    if (yearSelect) yearSelect.value = "";
    currentCategoryFilter = "";
    tabs.forEach((t) => t.classList.remove("active"));
    const first = document.querySelector('.tabs .tab[data-category=""]');
    if (first) first.classList.add("active");
    renderProjects();
  });

  // ---------- Init ----------
  renderProjects();
})();

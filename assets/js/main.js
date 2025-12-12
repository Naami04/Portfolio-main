// === Thème & navigation (inchangé) ===
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved === "light") root.classList.add("light");
if (toggle)
  toggle.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem(
      "theme",
      root.classList.contains("light") ? "light" : "dark"
    );
  });
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });
}
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      document
        .querySelector(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
      if (navLinks?.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    }
  });
});
document.getElementById("year").textContent = new Date().getFullYear();

// === Projets : état + éléments ===
const state = { search: "", tech: "", year: "", category: "" };
const els = {
  grid: document.getElementById("projectGrid"),
  search: document.getElementById("searchInput"),
  tech: document.getElementById("techSelect"),
  year: document.getElementById("yearSelect"),
  clear: document.getElementById("clearFilters"),
  tabs: document.querySelectorAll(".tabs .tab"),
};

function normalize(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function matchProject(p) {
  // Catégorie ('' = toutes)
  const catOK =
    !state.category || normalize(p.category) === normalize(state.category);

  // Texte libre
  const s = normalize(state.search);
  const inText =
    !s ||
    normalize(p.title).includes(s) ||
    normalize(p.description).includes(s) ||
    (p.tech || []).some((t) => normalize(t).includes(s));

  // Tech exacte (si sélectionnée)
  const techOk =
    !state.tech ||
    (p.tech || []).some((t) => normalize(t) === normalize(state.tech));

  // Année (égalité simple)
  const yearOk = !state.year || String(p.year) === String(state.year);

  return catOK && inText && techOk && yearOk;
}

function projectCard(p) {
  const techChips = (p.tech || [])
    .map((t) => `<span class="skill">${t}</span>`)
    .join("");
  const demoBtn = p.links?.demo
    ? `<a class="btn" href="${p.links.demo}" target="_blank" rel="noopener">Demo</a>`
    : "";
  const repoBtn = p.links?.repo
    ? `<a class="btn" href="${p.links.repo}" target="_blank" rel="noopener">Code</a>`
    : "";
  const caseBtn = p.links?.caseStudy
    ? `<a class="btn" href="${p.links.caseStudy}">Case Study</a>`
    : "";
  const catLabel =
    p.category === "professionnel" ? "Professionnel" : "Personnel";

  return `
    <article class="card project">
      ${p.image ? `<img src="${p.image}" alt="" class="project-cover" />` : ""}
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="chips" style="margin-top:6px">
        <span class="chip">${catLabel}</span>
      </div>
      <div class="skills">${techChips}</div>
      <div class="actions">${demoBtn}${repoBtn}${caseBtn}</div>
    </article>
  `;
}

function renderProjects() {
  if (!els.grid) return;
  const data = (window.PROJECTS || []).filter(matchProject);
  els.grid.innerHTML = data.length
    ? data.map(projectCard).join("")
    : `<div class="card"><p class="muted">Aucun projet ne correspond à vos filtres.</p></div>`;
}

function bindFilters() {
  els.search?.addEventListener("input", () => {
    state.search = els.search.value;
    renderProjects();
  });
  els.tech?.addEventListener("change", () => {
    state.tech = els.tech.value;
    renderProjects();
  });
  els.year?.addEventListener("change", () => {
    state.year = els.year.value;
    renderProjects();
  });
  els.clear?.addEventListener("click", () => {
    state.search = "";
    state.tech = "";
    state.year = "";
    if (els.search) els.search.value = "";
    if (els.tech) els.tech.value = "";
    if (els.year) els.year.value = "";
    renderProjects();
  });

  // Tabs Catégorie
  els.tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      els.tabs.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      state.category = btn.dataset.category || "";
      renderProjects();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindFilters();
  renderProjects();
});

/* ===============================
   Certifications: render + filters
=================================*/
(function () {
  const grid = document.getElementById("certGrid");
  const search = document.getElementById("certSearch");
  const provider = document.getElementById("providerSelect");
  const clear = document.getElementById("clearCerts");
  const DATA = window.CERTS || [];

  if (!grid) return;

  const norm = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  const card = (c) => `
    <article class="card cert" data-provider="${c.provider}">
      <h3>${c.title}</h3>
      <p class="muted">${c.provider}${c.grade ? ` — Note : ${c.grade}` : ""}</p>
      <div class="row">
        ${
          c.links?.verify
            ? `<a class="btn" href="${c.links.verify}" target="_blank" rel="noopener">Vérifier</a>`
            : ""
        }
        ${
          c.links?.pdf
            ? `<a class="btn" href="${c.links.pdf}" target="_blank" rel="noopener">Voir PDF</a>`
            : ""
        }
      </div>
    </article>
  `;

  function render(list) {
    if (!list.length) {
      grid.innerHTML = `<div class="card"><p class="muted">Aucune certification trouvée.</p></div>`;
      return;
    }
    grid.innerHTML = list.map(card).join("");
  }

  function apply() {
    const q = norm(search?.value || "");
    const p = norm(provider?.value || "");

    const filtered = DATA.filter((c) => {
      const t = norm(c.title);
      const prov = norm(c.provider);
      const matchText = !q || t.includes(q) || prov.includes(q);
      const matchProv = !p || prov === p;
      return matchText && matchProv;
    });

    render(filtered);
  }

  search?.addEventListener("input", apply);
  provider?.addEventListener("change", apply);
  clear?.addEventListener("click", () => {
    if (search) search.value = "";
    if (provider) provider.value = "";
    apply();
  });

  render(DATA); // initial
})();
// --- Compteurs animés sur la page d'accueil ---
// --- Compteurs animés sur la page d'accueil ---
document.addEventListener("DOMContentLoaded", () => {
  // Projets
  const totalProjects = Array.isArray(window.PROJECTS)
    ? window.PROJECTS.length
    : 0;

  // Techs uniques
  const techSet = new Set();
  if (Array.isArray(window.PROJECTS)) {
    window.PROJECTS.forEach((p) => {
      (p.tech || []).forEach((t) => techSet.add(t));
    });
  }
  const totalTech = techSet.size;

  // ✅ Certifications : accepte CERTIFICATIONS OU CERTS
  const certArray =
    (Array.isArray(window.CERTIFICATIONS) && window.CERTIFICATIONS) ||
    (Array.isArray(window.CERTS) && window.CERTS) ||
    [];
  const totalCerts = certArray.length;

  const counters = {
    certs: totalCerts || 0,
    projects: totalProjects || 0,
    tech: totalTech || 0,
  };

  const duration = 1200; // durée animation (ms)

  document.querySelectorAll(".num").forEach((el) => {
    const key = el.dataset.count; // "certs" | "projects" | "tech"
    const target = counters[key] || 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
});

// ==================================================
// Scroll reveal + animation des compteurs de la home
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");
  const statsSection = document.querySelector(".stats");
  const numEls = document.querySelectorAll(".stats .num");

  // Valeurs cibles des compteurs
  const counterTargets = {
    certs: 4,
    projects: 6,
    tech: 23
  };

  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    numEls.forEach(numEl => {
      const key = numEl.getAttribute("data-count");
      const target = counterTargets[key] || 0;
      const duration = 1200; // ms
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        numEl.textContent = value + "";

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          numEl.textContent = target + ""; // assure la valeur finale exacte
        }
      }

      requestAnimationFrame(update);
    });
  }

  // IntersectionObserver pour révéler + démarrer les compteurs
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Si c'est la section stats qui devient visible -> lancer les compteurs
            if (entry.target === statsSection) {
              animateCounters();
            }

            obs.unobserve(entry.target); // on anime chaque élément une seule fois
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback pour vieux navigateurs : tout visible + comptes directement
    revealEls.forEach(el => el.classList.add("visible"));
    animateCounters();
  }
});

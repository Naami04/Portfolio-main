// assets/js/projects.js
// Source unique de vérité pour les projets

window.PROJECTS = [
  // ======================
  // PROJETS PROFESSIONNELS
  // ======================
  {
    id: "ratitec",
    title: "RATITEC — Plateforme Énergie Renouvelable",
    description:
      "Plateforme web de gestion et suivi de projets ENR avec planification, reporting et tableaux de bord KPI.",
    tech: ["Laravel", "React", "Next.js", "Tailwind CSS", "MySQL", "API REST", "Agile (Scrum)"],
    role: "Développeur Full‑Stack",
    year: 2025,
    category: "professionnel",
    group: "Web full-stack",
    image: "assets/img/projects/ratitec.jfif",
    links: { demo: "", repo: "", caseStudy: "" },
    details: `
      <p><strong>RATITEC — Plateforme Énergie Renouvelable</strong></p>
      <ul>
        <li>Mise en place d’un système de gestion de projets : suivi en temps réel, planification des techniciens et reporting.</li>
        <li>Amélioration de la coordination inter‑équipes (≈ +35 %) via des tableaux de bord KPI.</li>
        <li>Développement d’APIs REST et d’un front moderne (Next.js, TailwindCSS, MySQL) dans un contexte Agile.</li>
      </ul>
      <p><strong>Contexte :</strong> Stage / expérience à Casablanca.</p>
    `
  },
  {
    id: "elamrani",
    title: "El Amrani Fluide — Application de gestion des stocks",
    description:
      "Application web de gestion des stocks : back‑office produits, interfaces responsives et base MySQL avec règles métier.",
    tech: ["HTML", "CSS", "MySQL", "UML", "WAMP"],
    role: "Développeur Web",
    year: 2024,
    category: "professionnel",
    group: "Web & Data",
    image: "assets/img/projects/ecommerce.png",
    links: { demo: "", repo: "", caseStudy: "" },
    details: `
      <p><strong>El Amrani Fluide — Application de gestion des stocks</strong></p>
      <ul>
        <li>Conception et développement d’un back‑office produit.</li>
        <li>Création d’interfaces web responsives en HTML/CSS.</li>
        <li>Modélisation UML et mise en œuvre d’une base de données MySQL avec intégration des règles métier.</li>
      </ul>
      <p><strong>Localisation :</strong> Casablanca.</p>
    `
  },

  // ======================
  // PROJETS ACADÉMIQUES
  // ======================
  {
    id: "task-tracker",
    title: "Task Tracker — Gestion de tâches",
    description:
      "Application de gestion de tâches : conception UML et implémentation Python.",
    tech: ["Python", "UML"],
    role: "Projet académique",
    year: 2024,
    category: "academique",
    group: "Software",
    image: "assets/img/projects/taskflow.png",
    links: { demo: "", repo: "", caseStudy: "" },
    details: `
      <p><strong>Task Tracker</strong></p>
      <ul>
        <li>Application de gestion de tâches avec une conception orientée UML.</li>
        <li>Implémentation en Python avec une logique claire (CRUD / règles simples).</li>
      </ul>
    `
  },
  {
    id: "emsi-portal",
    title: "Portail Association EMSI — Clubs & événements",
    description:
      "Plateforme web de gestion des clubs, événements, rôles et tableaux de bord.",
    tech: ["Laravel", "MySQL", "JavaScript"],
    role: "Projet académique",
    year: 2024,
    category: "academique",
    group: "Web full-stack",
    image: "assets/img/projects/emsi.jfif",
    links: { demo: "", repo: "", caseStudy: "" },
    details: `
      <p><strong>Portail Association EMSI</strong></p>
      <ul>
        <li>Gestion des clubs, événements et rôles.</li>
        <li>Mise en place de tableaux de bord pour le suivi.</li>
        <li>Stack : Laravel, MySQL, JavaScript.</li>
      </ul>
    `
  },
  {
    id: "pharmacy",
    title: "Gestion d’une pharmacie — Stock & péremption",
    description:
      "Application Java Swing pour gérer le stock, les dates de péremption et le réassort.",
    tech: ["Java Swing", "MySQL", "WAMP", "Maven"],
    role: "Projet académique",
    year: 2023,
    category: "academique",
    group: "Desktop",
    image: "assets/img/projects/pharmacy.png",
    links: { demo: "", repo: "", caseStudy: "" },
    details: `
      <p><strong>Gestion d’une pharmacie</strong></p>
      <ul>
        <li>Suivi de stock, dates de péremption et réassort.</li>
        <li>Interface desktop Java Swing, persistance MySQL, build Maven.</li>
      </ul>
    `
  },
  {
    id: "gourmets-delights",
    title: "Gourmets Delights — Commandes & stocks",
    description:
      "Application de gestion des commandes et du stock.",
    tech: ["C#", "MySQL", "HTML"],
    role: "Projet académique",
    year: 2023,
    category: "academique",
    group: "Software",
    image: "assets/img/projects/restaurant.png",
    links: { demo: "", repo: "", caseStudy: "" },
    details: `
      <p><strong>Gourmets Delights</strong></p>
      <ul>
        <li>Gestion des commandes et du stock.</li>
        <li>Stack : C#, MySQL, HTML.</li>
      </ul>
    `
  }
];


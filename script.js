// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Recherche site-wide
const portfolioSearchIndex = [
  {
    url: 'index.html#apropos',
    title: 'À propos',
    content: 'expert santé publique coopération internationale analyse données terrain preuve apprentissage collectif capitalisation intelligence affaires analytique'
  },
  {
    url: 'index.html#domaines',
    title: 'Domaines et compétences',
    content: 'évaluation projets suivi-évaluation santé publique coopération épidémiologie analyse données recherche qualitative capitalisation ETS systèmes information santé business intelligence Power BI Microsoft Fabric DHIS2 KoboToolbox ODK'
  },
  {
    url: 'index.html#projets',
    title: 'Projets',
    content: 'projets professionnels académiques data innovations terrain recherche dashboards solutions digitales'
  },
  {
    url: 'index.html#publications',
    title: 'Publications',
    content: 'publications mémoires articles ACFAS Pan African Medical Journal PubMed ResearchGate contraception JADES santé sexuelle reproductive'
  },
  {
    url: 'index.html#services',
    title: 'Services',
    content: 'consultation évaluation projets appui méthodologique recherche analyse statistique formation rapports synthèses capitalisation expériences Power BI'
  },
  {
    url: 'index.html#contact',
    title: 'Contact',
    content: 'contact collaboration LinkedIn ORCID Google Scholar GitHub YouTube Facebook formulaire courriel'
  },
  {
    url: 'competences.html',
    title: 'Compétences détaillées',
    content: 'systèmes information santé dossier patient EHR DPI HL7 FHIR KoboCollect ODK CommCare épidémiologie data santé machine learning ETS RE-AIM CFIR MRC suivi-évaluation cadres logiques business intelligence lakehouse bronze silver gold gouvernance données coopération internationale VBG'
  },
  {
    url: 'diplomes.html',
    title: 'Diplômes',
    content: 'diplômes maîtrise gestion projet UQAR Université Québec Rimouski master santé publique internationale Université Senghor Alexandrie licence sciences infirmières UAC INMeS'
  },
  {
    url: 'formation-continue.html',
    title: 'Formation continue',
    content: 'formations certifications Google Data Analytics DHIS2 Power BI YALI TDR ENA INSPQ EPSUM INRS UQAR intelligence affaires Microsoft Fabric agile épidémiologie terrain réanimation cardio-respiratoire'
  },
  {
    url: 'projets-professionnels.html',
    title: 'Projets professionnels',
    content: 'PASSREL Fondation Paul Gérin-Lajoie MRJC Fondation Claudine Talon fistule obstétricale Solthis JADES ABMS Amour Vie Niger Bénin mobilisation communautaire qualité services santé maternelle VBG'
  },
  {
    url: 'projets-academiques.html',
    title: 'Projets académiques',
    content: 'ACFAS affiche mémoire maîtrise UQAR capitalisation coopération internationale diagnostic export 360Medlink Clinikly AI master Senghor papillomavirus HPV licence sciences infirmières'
  },
  {
    url: 'projets-data.html',
    title: 'Projets data',
    content: 'projets data intelligence affaires CISSS Microsoft Fabric Power BI Power Platform ETL ELT Lakehouse KoboToolbox formulaire collecte données analyse statistique SSR Niger dashboards contraception richesse Bénin EDS R Python SPSS Stata'
  },
  {
    url: 'innovations.html',
    title: 'Innovations',
    content: 'innovations application mobile santé reproductive plateforme web évaluation projets React Python SQL intelligence artificielle IA machine learning dashboards santé publique digitale'
  }
];

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function currentPageName() {
  const page = window.location.pathname.split('/').pop();
  return page || 'index.html';
}

function markSearchHit(target) {
  if (!target) return;
  document.querySelectorAll('.search-hit').forEach((el) => el.classList.remove('search-hit'));
  target.classList.add('search-hit');
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => target.classList.remove('search-hit'), 2400);
}

function localSearch(query) {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const normalizedQuery = normalizeSearchText(query);
  const sectionMatch = sections.find((section) => normalizeSearchText(section.innerText).includes(normalizedQuery));
  if (sectionMatch) return sectionMatch;

  const main = document.querySelector('main');
  if (main && normalizeSearchText(main.innerText).includes(normalizedQuery)) return main;

  return null;
}

function portfolioSearch(event) {
  event.preventDefault();
  const input = event.target.querySelector('#site-search');
  const query = input.value.trim();
  if (!query) return false;

  const localMatch = localSearch(query);
  if (localMatch) {
    markSearchHit(localMatch);
    return false;
  }

  const normalizedQuery = normalizeSearchText(query);
  const page = currentPageName();
  const remoteMatch = portfolioSearchIndex.find((item) => {
    const searchable = normalizeSearchText(`${item.title} ${item.content}`);
    return searchable.includes(normalizedQuery);
  });

  if (remoteMatch) {
    const destinationPage = remoteMatch.url.split('#')[0] || 'index.html';
    window.sessionStorage.setItem('portfolioSearchQuery', query);
    window.location.href = destinationPage === page ? remoteMatch.url : remoteMatch.url;
  } else {
    input.value = '';
    input.placeholder = 'Aucun résultat trouvé';
  }
  return false;
}

const pendingSearchQuery = window.sessionStorage.getItem('portfolioSearchQuery');
if (pendingSearchQuery) {
  window.sessionStorage.removeItem('portfolioSearchQuery');
  window.setTimeout(() => markSearchHit(localSearch(pendingSearchQuery) || document.querySelector('main')), 250);
}

// Toggle résumé des publications
function toggleAbstract(id, btn) {
  const el = document.getElementById(id);
  const open = el.classList.toggle('open');
  btn.textContent = open ? 'Réduire ↑' : 'Lire le résumé ↓';
  btn.setAttribute('aria-expanded', String(open));
}

// Back to top
const backBtn = document.getElementById('back-to-top');
if (backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Lien nav actif selon la section visible
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach((s) => observer.observe(s));

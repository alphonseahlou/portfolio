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

// Recherche
function portfolioSearch(event) {
  event.preventDefault();
  const input = document.querySelector('#site-search');
  const query = input.value.trim().toLowerCase();
  document.querySelectorAll('.search-hit').forEach((el) => el.classList.remove('search-hit'));
  if (!query) return false;
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const match = sections.find((s) => s.innerText.toLowerCase().includes(query));
  if (match) {
    match.classList.add('search-hit');
    match.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => match.classList.remove('search-hit'), 2200);
  } else {
    input.value = '';
    input.placeholder = 'Aucun résultat trouvé';
  }
  return false;
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

// Gère l'ouverture et la fermeture du menu mobile
function toggleNav(btn) {
    const ul = document.getElementById('main-nav');
    if (!ul) return;

    const isOpen = ul.classList.toggle('open');
    const icon = btn.querySelector('.icon');
    if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
    }
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Ferme le menu mobile et remet l'icône dans son état initial
function closeNav() {
    const ul = document.getElementById('main-nav');
    if (!ul) return;

    ul.classList.remove('open');
    const icon = document.querySelector('.nav-toggle .icon');
    const btn = document.querySelector('.nav-toggle');
    if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
    if (btn) {
        btn.setAttribute('aria-expanded', 'false');
    }
}

// Affiche ou masque les résumés des mémoires / articles
function toggleAbstract(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;

    const isOpen = el.classList.toggle('open');
    btn.textContent = isOpen ? 'Réduire' : 'Lire plus ↓';
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Initialise l'état accessible des boutons de lecture des résumés
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-abstract').forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
    });

    initBackToTop();
    initActiveNav();
});

// Bouton retour en haut
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mise en évidence du lien nav correspondant à la section visible (index.html uniquement)
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const navLinks = document.querySelectorAll('#main-nav a[href^="#"], #main-nav a[href*="index.html#"]');
    if (!navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            navLinks.forEach(function (link) {
                const href = link.getAttribute('href') || '';
                const sectionId = href.split('#')[1];
                link.classList.toggle('active', sectionId === entry.target.id);
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
}

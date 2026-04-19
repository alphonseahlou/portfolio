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
});

const siteNav = {
  home: [
    ['#apropos', "L'expert"],
    ['#domaines', 'Domaines'],
    ['#projets', 'Projets'],
    ['#publications', 'Publications'],
    ['diplomes.html', 'Diplômes'],
    ['formation-continue.html', 'Certifications'],
    ['#services', 'Services'],
    ['#contact', 'Contact']
  ],
  domaines: [
    ['index.html', 'Accueil'],
    ['index.html#domaines', '← Domaines'],
    ['index.html#contact', 'Contact']
  ],
  parcours: [
    ['index.html', 'Accueil'],
    ['index.html#parcours', '← Parcours'],
    ['index.html#contact', 'Contact']
  ],
  projets: [
    ['index.html', 'Accueil'],
    ['index.html#projets', '← Retour aux projets'],
    ['index.html#contact', 'Contact']
  ]
};

function brandMarkup(home = false) {
  return `
    <a class="brand-mark" href="${home ? '#accueil' : 'index.html'}" aria-label="Accueil">
      <span class="brand-symbol">AEA</span>
      <span>
        <strong>Alphonse Euphrème Ahlou</strong>
        <small>Expert en santé publique internationale</small>
      </span>
    </a>
  `;
}

function searchMarkup() {
  return `
    <form class="search" role="search" onsubmit="return portfolioSearch(event)">
      <label for="site-search">Recherche</label>
      <div class="search-row">
        <input id="site-search" type="search" placeholder="Rechercher une expertise, un projet, une publication">
        <button type="submit" aria-label="Lancer la recherche"><i class="fas fa-search"></i></button>
      </div>
    </form>
  `;
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page') || 'sub';
    const section = this.getAttribute('section') || 'projets';
    const isHome = page === 'home';
    const navItems = isHome ? siteNav.home : [...(siteNav[section] || siteNav.projets)];

    if (this.hasAttribute('certifications-link')) {
      navItems.splice(2, 0, ['formation-continue.html', 'Certifications']);
    }

    const brand = isHome
      ? `
        <div class="brand container">
          ${brandMarkup(true)}
          ${searchMarkup()}
        </div>
      `
      : `<div class="brand-compact container">${brandMarkup(false)}${searchMarkup()}</div>`;

    this.innerHTML = `
      <a class="skip-link" href="#contenu">Aller au contenu principal</a>
      <header class="site-header">
        <div class="govbar">
          <div class="container govbar-inner">
            <span>Portfolio professionnel</span>
            <span>Santé publique · Évaluation · Coopération internationale</span>
          </div>
        </div>
        ${brand}
        <nav class="main-nav" aria-label="${isHome ? 'Navigation principale' : 'Navigation'}">
          <div class="container nav-inner">
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>
            <ul id="nav-links">
              ${navItems.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
            </ul>
          </div>
        </nav>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const home = this.hasAttribute('home');
    this.innerHTML = `
      <button class="back-to-top" id="back-to-top" aria-label="Retour en haut">&#8679;</button>
      ${home ? `
        <div class="visit-counter">
          <i class="fas fa-eye"></i>
          <span>Visites : </span>
          <img src="https://aahlou.goatcounter.com/counter/%2Fportfolio.svg" alt="Nombre de visites">
        </div>
      ` : ''}
      <footer class="site-footer">
        <div class="container footer-inner">
          <p>© 2026 Alphonse Euphrème Ahlou</p>
          <a href="${home ? '#accueil' : 'index.html'}">${home ? 'Retour en haut' : "Retour à l'accueil"}</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

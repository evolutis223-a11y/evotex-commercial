// Hub — écran d'accueil interne, cartes VIP vers les ressources.
window.Views = window.Views || {};

Views.hub = {
  title: 'EVOTEX 1.0 — Espace Commercial',

  render() {
    return `
      <div class="hub">
        <div class="hub-kicker">EVOTEX 1.0 — ESPACE COMMERCIAL INTERNE</div>
        <h1 class="hub-title">Vos outils de négociation, <em>réunis au même endroit</em>.</h1>
        <p class="hub-sub">Présentation exécutive, dossier de déploiement, grille tarifaire et cadrage de besoin — les ressources qui accompagnent chaque discussion commerciale EVOTEX.</p>

        <div class="hub-grid">
          <button class="hub-card" data-nav="#/presentation" aria-label="Ouvrir la Présentation Exécutive">
            <span class="hub-card-eyebrow">Vitrine produit</span>
            <span class="hub-card-badge -reference">FONCTIONNALITÉS CLÉS</span>
            <span class="hub-card-title">Présentation Exécutive</span>
            <span class="hub-card-desc">La plateforme en un coup d'œil — les 8 Blocs Fonctionnels qui couvrent tous les métiers de l'usine, à présenter en rendez-vous ou à envoyer telle quelle.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
          </button>

          <button class="hub-card -featured" data-nav="#/tour-application" aria-label="Ouvrir le Tour de l'Application">
            <span class="hub-card-icon">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="12" rx="1.8"/>
                <path d="M8 19.5h8"/>
                <path d="M12 16v3.5"/>
                <circle cx="8.2" cy="8.4" r="1" fill="currentColor" stroke="none"/>
                <path d="M5.5 13 9 9.5l2.3 2.3L15 8l3.5 3.5"/>
              </svg>
            </span>
            <span class="hub-card-body">
              <span class="hub-card-eyebrow">Captures d'écran réelles</span>
              <span class="hub-card-badge -reference">TOUR GUIDÉ</span>
              <span class="hub-card-title">Tour de l'Application</span>
              <span class="hub-card-desc">Les écrans réels de BATEXCI ERP, bloc par bloc — ce qui existe déjà, et honnêtement, ses limites actuelles.</span>
              <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
            </span>
          </button>

          <button class="hub-card" data-nav="#/socle-lancement" aria-label="Ouvrir le Socle de Lancement">
            <span class="hub-card-eyebrow">Dossier de déploiement</span>
            <span class="hub-card-badge -reference">12 PAGES</span>
            <span class="hub-card-title">Socle de Lancement</span>
            <span class="hub-card-desc">Le deck complet EVOTEX / BATEXCI ERP — vision, feuille de route de déploiement, catalogue de modules, gouvernance et pilotage technique.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
          </button>

          <button class="hub-card" data-nav="#/licences" aria-label="Ouvrir la Grille de Licences">
            <span class="hub-card-eyebrow">3 formules</span>
            <span class="hub-card-badge -public">PAGE COMMERCIALE</span>
            <span class="hub-card-title">Grille de Licences</span>
            <span class="hub-card-desc">Déploiement à Vie, Vente Totale (PI) ou SaaS + Modules — la page à présenter ou envoyer telle quelle à un prospect, avec formulaire de demande de devis intégré.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
          </button>

          <button class="hub-card" data-nav="#/expression-besoins" aria-label="Ouvrir le Cahier des Charges Client">
            <span class="hub-card-eyebrow">Formulaire interactif</span>
            <span class="hub-card-badge -public">EXPRESSION DE BESOINS</span>
            <span class="hub-card-title">Cahier des Charges Client</span>
            <span class="hub-card-desc">Le prospect décrit son projet — utilisateurs, sites, modules souhaités, budget — et la demande vous est transmise directement par email.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
          </button>
        </div>

        <div class="hub-footer">
          <div class="hub-footer-line"></div>
          <p>Evolutis est une jeune société malienne de haute technologie, spécialisée dans la conception de solutions logicielles sur mesure et de haut niveau pour l'industrie.</p>
          <p>Le socle EVOTEX 1.0 est commun aux trois licences. Les modules complémentaires restent disponibles à la carte, quel que soit le modèle retenu.</p>
          <div class="hub-mali"><span class="stripe"><span style="background:#009639"></span><span style="background:#fcd116"></span><span style="background:#ce1126"></span></span>Conçu et développé au Mali</div>
        </div>
      </div>
    `;
  },

  mount(root) {
    root.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.location.hash = btn.getAttribute('data-nav');
      });
    });
  },
};

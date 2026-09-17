// Hub — écran d'accueil interne, cartes VIP vers les ressources.
window.Views = window.Views || {};

Views.hub = {
  title: 'EVOTEX 1.0 — Espace Commercial',

  render() {
    // Titre adapte selon le lecteur : le commercial en interne (par
    // defaut), ou le client lui-meme quand le lien "partager toute
    // l'application" (?partage=complet) l'amene directement ici.
    const modeClient = document.documentElement.classList.contains('evx-partage-complet');
    const kicker = modeClient ? 'BATEXCI ERP — DÉCOUVERTE' : 'EVOTEX 1.0 — ESPACE COMMERCIAL INTERNE';
    const titre = modeClient
      ? 'BATEXCI ERP, <em>votre futur système de gestion</em>.'
      : 'Vos outils de négociation, <em>réunis au même endroit</em>.';
    const sousTitre = modeClient
      ? "Présentation exécutive, dossier de déploiement, grille tarifaire et cadrage de besoin — explorez à votre rythme, dans l'ordre qui vous convient."
      : 'Présentation exécutive, dossier de déploiement, grille tarifaire et cadrage de besoin — les ressources qui accompagnent chaque discussion commerciale EVOTEX.';

    // Bouton "Partager" par carte -- copie un lien verrouille (?partage=1)
    // sur cette seule ressource, sans que le commercial ait a taper un hash.
    const iconePartage = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.7 15.7 6.6M8.3 13.3l7.4 4.1"/></svg>';
    const boutonPartage = (cible, aria) => `
            <button class="hub-card-share" type="button" data-partage="${cible}" aria-label="${aria}">
              ${iconePartage}
              <span class="js-partage-label">Partager</span>
            </button>`;

    return `
      <div class="hub">
        <div class="hub-kicker">${kicker}</div>
        <h1 class="hub-title">${titre}</h1>
        <p class="hub-sub">${sousTitre}</p>

        <div class="hub-grid">
          <div class="hub-card" data-nav="#/presentation" role="button" tabindex="0" aria-label="Ouvrir la Présentation Exécutive">
            <span class="hub-card-eyebrow">Vitrine produit</span>
            <span class="hub-card-badge -reference">FONCTIONNALITÉS CLÉS</span>
            <span class="hub-card-title">Présentation Exécutive</span>
            <span class="hub-card-desc">La plateforme en un coup d'œil — les 8 Blocs Fonctionnels qui couvrent tous les métiers de l'usine, à présenter en rendez-vous ou à envoyer telle quelle.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
            ${boutonPartage('#/presentation', 'Copier le lien de partage de la Présentation Exécutive')}
          </div>

          <div class="hub-card -featured" data-nav="#/tour-application" role="button" tabindex="0" aria-label="Ouvrir le Tour de l'Application">
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
            ${boutonPartage('#/tour-application', "Copier le lien de partage du Tour de l'Application")}
          </div>

          <div class="hub-card" data-nav="#/socle-lancement" role="button" tabindex="0" aria-label="Ouvrir le Socle de Lancement">
            <span class="hub-card-eyebrow">Dossier de déploiement</span>
            <span class="hub-card-badge -reference">12 PAGES</span>
            <span class="hub-card-title">Socle de Lancement</span>
            <span class="hub-card-desc">Le deck complet EVOTEX / BATEXCI ERP — vision, feuille de route de déploiement, catalogue de modules, gouvernance et pilotage technique.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
            ${boutonPartage('#/socle-lancement', 'Copier le lien de partage du Socle de Lancement')}
          </div>

          <div class="hub-card" data-nav="#/licences" role="button" tabindex="0" aria-label="Ouvrir la Grille de Licences">
            <span class="hub-card-eyebrow">3 formules</span>
            <span class="hub-card-badge -public">PAGE COMMERCIALE</span>
            <span class="hub-card-title">Grille de Licences</span>
            <span class="hub-card-desc">Déploiement à Vie, Vente Totale (PI) ou SaaS + Modules — la page à présenter ou envoyer telle quelle à un prospect, avec formulaire de demande de devis intégré.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
            ${boutonPartage('#/licences', 'Copier le lien de partage de la Grille de Licences')}
          </div>

          <div class="hub-card" data-nav="#/expression-besoins" role="button" tabindex="0" aria-label="Ouvrir le Cahier des Charges Client">
            <span class="hub-card-eyebrow">Formulaire interactif</span>
            <span class="hub-card-badge -public">EXPRESSION DE BESOINS</span>
            <span class="hub-card-title">Cahier des Charges Client</span>
            <span class="hub-card-desc">Le prospect décrit son projet — utilisateurs, sites, modules souhaités, budget — et la demande vous est transmise directement par email.</span>
            <span class="hub-card-cta">Consulter <span>&#8594;</span></span>
            ${boutonPartage('#/expression-besoins', 'Copier le lien de partage du Cahier des Charges Client')}
          </div>
        </div>

        <div class="hub-partage-tout">
          <button class="hub-partage-tout-btn" type="button" data-partage="complet" aria-label="Copier le lien de partage de toute l'application">
            ${iconePartage}
            <span class="js-partage-label">Partager toute l'application</span>
          </button>
          <p class="hub-partage-tout-note">Le client navigue librement entre toutes les pages, sans restriction — utile s'il n'est pas disponible pour une session en salle de négociation.</p>
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
      // Les cartes sont des <div role="button"> (un <button> ne peut pas
      // contenir le <button> "Partager" imbriqué) -- clavier gere a la main.
      btn.addEventListener('keydown', (evenement) => {
        if (evenement.key === 'Enter' || evenement.key === ' ') {
          evenement.preventDefault();
          window.location.hash = btn.getAttribute('data-nav');
        }
      });
    });
    if (window.EvxPartage) window.EvxPartage.initBoutons(root);
  },
};

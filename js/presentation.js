// Présentation Exécutive EVOTEX — vitrine produit, architecture en 8 Blocs
// Fonctionnels + Briques Transversales Propriétaires (cadrage du 14/09/2026,
// alignement de toute la nomenclature commerciale sur la réalité du code —
// voir socle-lancement.js pour le détail Socle / Avancé / Phase 2 par bloc).
window.Views = window.Views || {};

Views.presentation = {
  title: 'EVOTEX 1.0 — Présentation Exécutive',

  render() {
    const blocs = [
      { icon: '🧾', title: 'Finance & Comptabilité', desc: 'Facturation, caisse, DAF et contrôle de gestion — un cadrage financier étanche, de l’encaissement à la clôture.' },
      { icon: '👥', title: 'Ressources Humaines', desc: 'Annuaire du personnel, rôles et permissions par poste — chaque intervenant a un accès taillé à son métier.' },
      { icon: '🎨', title: 'EVOTEX Studio Dessin 1.0 & BAT', desc: 'Motifs, gabarits, circuit de validation BAT — et déjà livré en bonus, le Registre Gravure (cadres et cylindres suivis par motif, couleur et version).' },
      { icon: '🏭', title: 'Production & Maintenance Atelier', desc: "Ordre de Fabrication, suivi de production poste par poste, supervision technique des machines et chaudières." },
      { icon: '🚚', title: 'Supply Chain & Logistique', desc: 'Magasin, valorisation de stock, inventaires, achats et expéditions — jusqu’au Pass QR de sortie usine.' },
      { icon: '🛍️', title: 'Commercial & Relation Client', desc: 'Prise de commande, clients, actions commerciales — et déjà livrés en bonus, Showroom & Vente Directe opérationnels sur l’essentiel (comptoir, encaissement).' },
      { icon: '🧭', title: 'Pilotage & Gouvernance', desc: "Tour de Contrôle Direction et tableaux de bord personnalisables — chiffre d'affaires, marge et objectifs suivis en direct par la Présidence et la Direction, au fil de la trajectoire du Socle 1." },
      { icon: '🔐', title: 'Administration & Sécurité du Système', desc: 'Paramètres, rôles & permissions, et une gouvernance des dossiers tracée (réattribution, réouverture) à chaque étape.' },
    ];

    const briques = [
      { title: 'Exclusivité des Motifs', axe: 'Commercial ↔ Studio Dessin', desc: "Protection d'un motif pour un client donné, gérée conjointement par les deux blocs — jamais une double appellation, jamais un chevauchement." },
      { title: 'Moteur de Validation & Signature Multi-Postes', axe: 'Finance ↔ Studio Dessin ↔ Production', desc: 'Circuit de signatures séquentielles (jusqu’à 6 postes) intégré aux documents clés — facture à double signature, fiche technique de fabrication.' },
    ];

    const values = [
      { title: 'Données réelles, jamais de placeholder', desc: "Chaque chiffre affiché vient d'une donnée réellement saisie dans l'usine — un écart connu est signalé par un badge dédié directement à l'écran, jamais masqué derrière une valeur inventée." },
      { title: 'Un rôle, une vue', desc: "Chaque poste de l'usine — de la caisse à la Direction — retrouve dès sa connexion un atterrissage personnalisé, taillé à son métier, ni plus ni moins." },
      { title: "Pensé pour l'industrie textile", desc: "Conçu à partir d'un vrai circuit de production textile ouest-africain, pas d'un ERP générique adapté après coup." },
    ];

    return `
      <div class="pres">
        <div class="pres-topbar"><button class="evx-retour" data-nav="#/">&#8592; Retour au hub</button></div>

        <div class="pres-hero">
          <div class="pres-kicker">EVOTEX 1.0 — PRÉSENTATION EXÉCUTIVE</div>
          <h1 class="pres-h1">La plateforme ERP taillée pour <em>l'industrie textile</em></h1>
          <p class="pres-sub">EVOTEX 1.0 relie tous les métiers de l'usine — du dessin du motif à l'encaissement en caisse — sur un socle unique, organisé en 8 Blocs Fonctionnels, avec une vue dédiée pour chaque rôle.</p>
          <div class="pres-cta-row">
            <button class="pres-cta -primary" data-nav="#/expression-besoins">Exprimer mon besoin</button>
            <button class="pres-cta -ghost" data-nav="#/licences">Voir les licences</button>
          </div>
        </div>

        <div class="pres-section">
          <div class="pres-section-head">
            <div class="pres-section-kicker">Fonctionnalités clés</div>
            <h2 class="pres-section-title">Un socle, 8 Blocs Fonctionnels</h2>
            <p class="pres-section-sub">Du dessin du motif jusqu'à la caisse — chaque bloc couvre un grand domaine métier de l'usine.</p>
          </div>
          <div class="pres-modules-grid">
            ${blocs.map((m) => `
              <div class="pres-module-card">
                <div class="pres-module-icon">${m.icon}</div>
                <div class="pres-module-title">${m.title}</div>
                <div class="pres-module-desc">${m.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pres-section">
          <div class="pres-section-head">
            <div class="pres-section-kicker">Moteurs propriétaires</div>
            <h2 class="pres-section-title">2 Briques Transversales</h2>
            <p class="pres-section-sub">Des moteurs natifs qui traversent plusieurs blocs à la fois — jamais un simple écran isolé.</p>
          </div>
          <div class="pres-values">
            ${briques.map((b) => `
              <div class="pres-value">
                <div class="pres-value-title">${b.title}</div>
                <div class="pres-module-desc" style="margin-bottom:6px;font-weight:700;color:#1c6fd9">${b.axe}</div>
                <div class="pres-value-desc">${b.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pres-section">
          <div class="pres-section-head">
            <div class="pres-section-kicker">Pourquoi EVOTEX</div>
            <h2 class="pres-section-title">Une plateforme construite sur le terrain</h2>
          </div>
          <div class="pres-values">
            ${values.map((v) => `
              <div class="pres-value">
                <div class="pres-value-title">${v.title}</div>
                <div class="pres-value-desc">${v.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pres-cta-band">
          <div class="pres-cta-band-inner">
            <div class="pres-cta-band-title">Prêt à cadrer votre projet ?</div>
            <p class="pres-cta-band-sub">Décrivez vos besoins en quelques minutes — nous revenons vers vous avec une proposition adaptée.</p>
            <div class="pres-cta-row">
              <button class="pres-cta -primary" data-nav="#/expression-besoins">Exprimer mon besoin</button>
              <button class="pres-cta -ghost" data-nav="#/licences">Voir les 3 licences</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount(root) {
    root.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', () => { window.location.hash = el.getAttribute('data-nav'); });
    });
  },
};

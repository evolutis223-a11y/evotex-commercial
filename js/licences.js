// Module B — Grille de Licences (Cahier des Charges §4)
// Page commerciale — conçue pour être partagée telle quelle avec un prospect.
// Refonte du 14/09/2026 : reprise pixel-perfect de la maquette validée
// "Licences EVOTEX.dc.html" (4 onglets : Vue d'ensemble + une page de détail
// par licence). Seule adaptation volontaire par rapport à la maquette : les
// liens "En savoir plus" pointent vers les vraies ancres du site
// (#/socle-lancement/...) plutôt que vers le fichier de maquette voisin
// référencé dans le .dc.html, qui n'existe pas en production.
window.Views = window.Views || {};

(function () {
  const DEVIS_EMAIL = 'evolutis223@gmail.com';

  const state = {
    page: 0,
    modalOpen: false,
    offre: '',
    submitted: false,
    nomSuffix: '',
  };

  // Mémorise le conteneur réel du montage -- sur le site public c'est
  // toujours #app, mais monté en direct dans la salle de négociation
  // (montrerVueReelle, gestion/index.html) c'est un autre élément. Sans ça,
  // rerender() cible #app à tort et les clics (onglets, devis...) restent
  // sans effet visible dès que la page est montée ailleurs qu'à la racine.
  let mountedRoot = null;

  const TABS = [
    'Vue d’ensemble',
    'Licence 01 — Déploiement à Vie',
    'Licence 02 — Vente Totale',
    'Licence 03 — SaaS + Modules',
  ];

  function goToPage(n) {
    state.page = n;
    rerender();
  }

  function openModal(offre) {
    state.modalOpen = true;
    state.offre = offre;
    state.submitted = false;
    rerender();
  }

  function closeModal() {
    state.modalOpen = false;
    rerender();
  }

  function rerender() {
    const root = mountedRoot || document.getElementById('app');
    if (!root) return;
    root.innerHTML = Views.licences.render();
    Views.licences.mount(root);
  }

  function feature(text, tip) {
    if (!tip) {
      return `<div class="lic-feature"><span class="check">✓</span><span class="txt">${text}</span></div>`;
    }
    return `<div class="lic-feature"><span class="check">✓</span><span class="txt">${text} <span class="lic-tip" tabindex="0" aria-label="Plus d'informations">?<span class="lic-tip-box">${tip}</span></span></span></div>`;
  }

  // `detail` : true pour les pages de détail (carte à largeur fixe, un seul
  // bouton pleine largeur, pas de lien "En savoir plus" -- comme la maquette).
  function card({ theme, tag, title, titleMuted, desc, badge, badgeAlt, features, offre, ancre, detail }) {
    const titleHtml = titleMuted ? `${title} <span class="muted">${titleMuted}</span>` : title;
    return `
      <div class="lic-card -${theme}${detail ? ' -detail' : ''}">
        ${badgeAlt ? `<div class="lic-card-badge-alt">${badgeAlt}</div>` : ''}
        <div class="lic-card-badge">${badge}</div>
        <div class="lic-card-row"><span class="lic-card-tag">${tag}</span><span class="lic-card-ver">EVOTEX 1.0</span></div>
        <div class="lic-card-title">${titleHtml}</div>
        <div class="lic-card-desc">${desc}</div>
        <div class="lic-card-price-wrap">
          <div class="lic-card-price-label">TARIFICATION</div>
          <div class="lic-card-price">Sur devis</div>
        </div>
        <div class="lic-card-sep"></div>
        <div class="lic-card-features">${features.join('')}</div>
        ${detail
          ? `<button class="lic-card-devis-full" data-devis="${offre}">Demander un devis</button>`
          : `<div class="lic-card-foot">
              <a href="#/socle-lancement/${ancre}" class="lic-more" data-nav="#/socle-lancement/${ancre}">En savoir plus <span style="font-size:14px">&#8594;</span></a>
              <button class="lic-devis-btn" data-devis="${offre}">Demander un devis</button>
            </div>`}
      </div>
    `;
  }

  function pointsCles(theme, titre, bullets) {
    return `
      <div class="lic-detail-points -${theme}">
        <div class="lic-detail-points-title">${titre}</div>
        <div class="lic-detail-points-body">${bullets.map((b) => '— ' + b).join('<br>')}</div>
      </div>
    `;
  }

  const CARD_DEPLOIEMENT = {
    theme: 'or', tag: 'LICENCE 01', title: 'Déploiement à Vie + Suivi',
    desc: "Un paiement unique à la signature, un usage illimité et sans échéance. L'accompagnement se poursuit ensuite au rythme que vous choisissez.",
    badge: 'RECOMMANDÉ', offre: 'Déploiement à Vie + Suivi', ancre: 'licence-deploiement',
    features: [
      feature('Usage à vie, sans limite de durée'),
      feature('Le socle EVOTEX 1.0 installé chez vous, sur sa trajectoire de déploiement en 6 mois'),
      feature('Accompagnement et suivi mensuel inclus après les 6 premiers mois'),
      feature('Mises à jour et corrections assurées en continu, tant que le contrat de suivi est actif', "Si le contrat de suivi est interrompu, les mises à jour ne sont plus incluses&nbsp;: elles restent possibles soit via un nouvel abonnement de suivi, soit à la demande et facturées à part."),
      feature('Modules complémentaires à la demande'),
    ],
  };
  const CARD_SAAS = {
    theme: 'bleu', tag: 'LICENCE 03', title: 'SaaS + Modules',
    desc: 'Adapté aux petites structures et industries en démarrage : un abonnement simple, sans investissement initial, avec un socle et un accompagnement volontairement réduits.',
    badge: 'BASIC', badgeAlt: 'BIENTÔT<br>DISPONIBLE', offre: 'SaaS + Modules', ancre: 'licence-saas',
    features: [
      feature('Déploiement à la demande, étudié selon vos besoins'),
      feature('Mises à jour et évolutions du socle incluses'),
      feature('Licence annuelle + facturation par utilisateur'),
      feature('Modules complémentaires activables à tout moment'),
      feature('Sans engagement long terme'),
    ],
  };
  const CARD_VENTE_TOTALE = {
    theme: 'blanc', tag: 'LICENCE 02', title: 'Vente Totale', titleMuted: '(Propriété Intellectuelle)',
    desc: 'Cession complète du code source et des droits. Vous devenez pleinement propriétaire de la plateforme.',
    badge: 'EXCEPTIONNEL', offre: 'Vente Totale (Propriété Intellectuelle)', ancre: 'licence-vente-totale',
    features: [
      feature('Cession totale de la propriété intellectuelle'),
      feature('Le client devient propriétaire du code source'),
      feature('Paiement unique, aucune récurrence obligatoire'),
      feature('Suivi disponible en option, facturé séparément'),
      feature('Modules complémentaires vendus à part, sur demande'),
    ],
  };

  function renderGrid() {
    return `
      <div class="lic-grid">
        ${card(CARD_DEPLOIEMENT)}
        ${card(CARD_SAAS)}
        ${card(CARD_VENTE_TOTALE)}
      </div>
      <div class="lic-footer">
        <div class="lic-footer-line"></div>
        <p>Les trois licences donnent accès à l'ensemble du socle EVOTEX 1.0, sur sa trajectoire de déploiement. Quels qu'ils soient, les modules complémentaires restent disponibles à la carte, quel que soit le modèle choisi, et peuvent être ajoutés à tout moment de la relation.</p>
      </div>
    `;
  }

  function renderDetail(page) {
    if (page === 1) {
      return `
        <div class="lic-detail">
          ${card({ ...CARD_DEPLOIEMENT, detail: true })}
          <div>
            <div class="lic-detail-eyebrow" style="color:#e9cc70">LE CHOIX IDÉAL</div>
            <h2 class="lic-detail-h2">Possédez votre outil, une fois pour toutes</h2>
            <p class="lic-detail-p">Vous investissez une fois et possédez durablement votre solution EVOTEX. Le socle complet est installé chez vous, avec un accompagnement humain sur les 6 premiers mois, incluant en option une formation sur-mesure de votre personnel, organisée de façon graduelle pour faciliter la transformation numérique de votre usine. Ensuite, vous choisissez librement de poursuivre un programme d'accompagnement mensuel, ou de reprendre la main en autonomie.</p>
            <p class="lic-detail-p">Contrairement aux ERP du marché qui facturent par utilisateur ou par licence annuelle, EVOTEX repose sur un paiement unique. Vos modules, eux, sont pensés sur-mesure pour la réalité de votre usine, et non comme un standard générique.</p>
            <p class="lic-detail-p">Pendant l'accompagnement, vous profitez en avant-première des améliorations en cours de développement. Une fois abouties, elles deviennent une nouvelle phase de déploiement, proposée séparément.</p>
            <p class="lic-detail-p">Au-delà d'un tarif accessible, EVOTEX porte une conviction : concevoir des outils de gestion par l'Afrique et pour l'Afrique, sans intermédiaire, pour simplifier l'accès à une gestion moderne et faire avancer nos industries.</p>
            ${pointsCles('or', 'POINTS CLÉS', [
              'Paiement unique, sans facturation par utilisateur ni par licence annuelle',
              'Aucun coût caché',
              'Modules sur-mesure, adaptés à votre usine',
              'Accès en avant-première aux évolutions en cours de développement',
              'Une solution pensée par et pour l’Afrique',
            ])}
            <p class="lic-detail-closing">En résumé : un investissement unique, un socle qui évolue avec vous, une solution pensée pour l'Afrique.</p>
          </div>
        </div>
      `;
    }
    if (page === 2) {
      return `
        <div class="lic-detail">
          ${card({ ...CARD_VENTE_TOTALE, detail: true })}
          <div>
            <div class="lic-detail-eyebrow" style="color:#7fb2e5">UN INVESTISSEMENT STRATÉGIQUE</div>
            <h2 class="lic-detail-h2">Gardez le contrôle total, sans dépendance</h2>
            <p class="lic-detail-p">La Vente Totale s'adresse aux clients qui exigent une pleine propriété : ils reçoivent le code source et l'ensemble des droits sur la plateforme. Aucune redevance récurrente n'est due — le client paie une fois et devient totalement autonome, y compris pour faire évoluer ou héberger la solution comme il l'entend.</p>
            <p class="lic-detail-p">C'est l'offre la plus haut de gamme de la grille : elle convient à des structures avec des moyens conséquents, ou à des clients institutionnels qui, pour des raisons stratégiques ou réglementaires, ne peuvent pas dépendre d'un tiers pour leur outil de gestion.</p>
            ${pointsCles('neutre', 'POINTS CLÉS', [
              'Propriété intellectuelle et code source cédés intégralement ou partiellement, selon les clauses du contrat',
              'Zéro dépendance future envers EVOTEX',
              'Positionnement premium, prix le plus élevé de la grille',
              'Le suivi reste possible, mais en option facturée séparément',
            ])}
          </div>
        </div>
      `;
    }
    return `
      <div class="lic-detail">
        ${card({ ...CARD_SAAS, detail: true })}
        <div>
          <div class="lic-detail-eyebrow" style="color:#7fb2e5">CE QU'IL FAUT SAVOIR</div>
          <h2 class="lic-detail-h2">Pensée pour les petites structures et les industries en démarrage</h2>
          <p class="lic-detail-p">La formule SaaS + Modules élimine la barrière de l'investissement initial : elle convient aux petites et nouvelles industries qui démarrent leur transformation numérique. En contrepartie, le socle de lancement et l'accompagnement fournis sont volontairement réduits : c'est une entrée dans l'écosystème EVOTEX, pas une prise en charge complète de votre projet.</p>
          <p class="lic-detail-p">Le support couvre les mises à jour et le dépannage. La formation ou un accompagnement plus poussé restent possibles, mais uniquement sur demande et étudiés au cas par cas. Tout module au-delà du socle de lancement est facturé séparément.</p>
          <p class="lic-detail-p">Si votre projet demande un accompagnement soutenu ou une évolution continue de vos modules, les licences Déploiement à Vie ou Vente Totale répondent mieux à ce besoin.</p>
          ${pointsCles('bleu', 'POINTS CLÉS', [
            'Abonnement simple, sans investissement initial',
            'Socle de lancement limité et précis',
            'Support inclus pour les mises à jour et le dépannage',
            'Formation et accompagnement uniquement sur demande, au cas par cas',
            'Modules hors socle facturés séparément',
          ])}
        </div>
      </div>
    `;
  }

  function renderModal() {
    if (!state.modalOpen) return '';
    if (!state.submitted) {
      return `
        <div class="lic-modal-overlay" data-close-overlay>
          <div class="lic-modal" data-stop>
            <button class="lic-modal-close" data-close aria-label="Fermer">×</button>
            <div class="lic-modal-eyebrow-row"><span class="lic-modal-eyebrow">DEMANDE DE DEVIS</span><span class="lic-modal-ver">EVOTEX 1.0</span></div>
            <div class="lic-modal-title">${state.offre}</div>
            <p class="lic-modal-intro">Remplissez ces quelques informations pour que nous préparions un devis précis et adapté à votre situation.</p>
            <form class="lic-form" id="lic-devis-form">
              <div class="lic-form-row">
                <div class="lic-field"><label for="lic-nom">Nom complet</label><input id="lic-nom" name="nom" type="text"></div>
                <div class="lic-field"><label for="lic-entreprise">Entreprise</label><input id="lic-entreprise" name="entreprise" type="text"></div>
              </div>
              <div class="lic-form-row">
                <div class="lic-field"><label for="lic-email">Email</label><input id="lic-email" name="email" type="email"></div>
                <div class="lic-field"><label for="lic-tel">Téléphone</label><input id="lic-tel" name="telephone" type="tel"></div>
              </div>
              <div class="lic-form-row">
                <div class="lic-field"><label for="lic-nbutil">Nombre d'utilisateurs estimé</label><input id="lic-nbutil" name="nbUtilisateurs" type="text"></div>
                <div class="lic-field"><label for="lic-delai">Délai souhaité</label>
                  <select id="lic-delai" name="delai">
                    <option>Dès que possible</option><option>Sous 1 mois</option><option>Sous 3 mois</option><option>Sous 6 mois</option><option>Non défini</option>
                  </select>
                </div>
              </div>
              <div class="lic-form-row">
                <div class="lic-field"><label for="lic-pays">Pays</label><input id="lic-pays" name="pays" type="text" placeholder="Ex. Mali"></div>
                <div class="lic-field"><label for="lic-suivi" style="white-space:nowrap">Durée de suivi souhaitée</label>
                  <select id="lic-suivi" name="dureeSuivi">
                    <option>1 an</option><option>2 ans</option><option>3 ans</option><option>5 ans</option><option>Non défini</option>
                  </select>
                </div>
              </div>
              <div class="lic-field"><label for="lic-budget">Budget indicatif (optionnel)</label><input id="lic-budget" name="budget" type="text" placeholder="Ex. 50 000 000 F"></div>
              <div class="lic-field"><label for="lic-questions">Questions ou précisions supplémentaires — continuité du développement et des supports, ou toute autre précision</label><textarea id="lic-questions" name="questions" rows="4" placeholder="Décrivez vos besoins spécifiques, contraintes, ou toute question utile pour affiner le devis…"></textarea></div>
              <button class="lic-submit" type="submit">Envoyer la demande</button>
            </form>
          </div>
        </div>
      `;
    }
    return `
      <div class="lic-modal-overlay" data-close-overlay>
        <div class="lic-modal" data-stop>
          <button class="lic-modal-close" data-close aria-label="Fermer">×</button>
          <div class="lic-confirm">
            <div class="check-big">✓</div>
            <h3>Demande envoyée</h3>
            <p>Merci${state.nomSuffix}. Votre demande pour « ${state.offre} » a bien été enregistrée. Nous revenons vers vous avec un devis détaillé sous 48h.</p>
            <button data-close>Fermer</button>
          </div>
        </div>
      </div>
    `;
  }

  Views.licences = {
    title: 'EVOTEX 1.0 — Grille de Licences',

    render() {
      return `
        <div class="lic">
          <div class="lic-topbar"><button class="evx-retour" data-nav="#/">&#8592; Retour au hub</button></div>

          <div class="lic-head">
            <div class="lic-kicker">EVOTEX 1.0 — GRILLE DE LICENCES</div>
            <h1 class="lic-h1">Trois façons de posséder EVOTEX</h1>
            <p class="lic-sub">Du déploiement accompagné à la cession totale, chaque licence peut être enrichie de modules complémentaires, à tout moment.</p>

            <div class="lic-tabs">
              ${TABS.map((label, i) => `<button class="lic-tab${state.page === i ? ' -actif' : ''}" data-page="${i}">${label}</button>`).join('')}
            </div>

            <div class="lic-mali-wrap">
              <div class="hub-mali" style="margin-top:0"><span class="stripe"><span style="background:#009639"></span><span style="background:#fcd116"></span><span style="background:#ce1126"></span></span>Entièrement conçu et développé au Mali</div>
            </div>
          </div>

          ${state.page === 0 ? renderGrid() : renderDetail(state.page)}

          ${renderModal()}
        </div>
      `;
    },

    mount(root) {
      mountedRoot = root;
      root.querySelectorAll('[data-nav]').forEach((el) => {
        el.addEventListener('click', () => { window.location.hash = el.getAttribute('data-nav'); });
      });
      root.querySelectorAll('[data-page]').forEach((btn) => {
        btn.addEventListener('click', () => goToPage(Number(btn.dataset.page)));
      });
      root.querySelectorAll('[data-devis]').forEach((btn) => {
        btn.addEventListener('click', () => openModal(btn.getAttribute('data-devis')));
      });
      root.querySelectorAll('[data-close]').forEach((btn) => {
        btn.addEventListener('click', closeModal);
      });
      const overlay = root.querySelector('[data-close-overlay]');
      if (overlay) overlay.addEventListener('click', closeModal);
      const stop = root.querySelector('[data-stop]');
      if (stop) stop.addEventListener('click', (e) => e.stopPropagation());

      const form = root.querySelector('#lic-devis-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const f = new FormData(form);
          const nom = (f.get('nom') || '').toString();
          const body =
            `Offre: ${state.offre}%0D%0A` +
            `Nom: ${nom}%0D%0A` +
            `Entreprise: ${f.get('entreprise') || ''}%0D%0A` +
            `Email: ${f.get('email') || ''}%0D%0A` +
            `Téléphone: ${f.get('telephone') || ''}%0D%0A` +
            `Pays: ${f.get('pays') || ''}%0D%0A` +
            `Utilisateurs estimés: ${f.get('nbUtilisateurs') || ''}%0D%0A` +
            `Délai souhaité: ${f.get('delai') || ''}%0D%0A` +
            `Durée de suivi souhaitée: ${f.get('dureeSuivi') || ''}%0D%0A` +
            `Budget indicatif: ${f.get('budget') || ''}%0D%0A%0D%0A` +
            `Questions/précisions:%0D%0A${f.get('questions') || ''}`;
          window.location.href = `mailto:${DEVIS_EMAIL}?subject=${encodeURIComponent('Demande de devis - ' + state.offre)}&body=${body}`;
          state.submitted = true;
          state.nomSuffix = nom ? ' ' + nom : '';
          rerender();
        });
      }
    },
  };
})();

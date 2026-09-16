// Tour de l'Application — captures d'écran réelles de BATEXCI ERP, organisées
// par les 8 Blocs Fonctionnels (cadrage du 14/09/2026). Chaque écran vient
// d'une capture directe de l'application (Direction, base de démonstration
// réelle) -- jamais une maquette. Aucun nom de personne réelle affiché
// (uniquement des raisons sociales fictives de test), conformément à la
// règle du projet.
window.Views = window.Views || {};

Views.tourApplication = {
  title: "EVOTEX 1.0 — Tour de l'Application",

  render() {
    const blocs = [
      {
        n: 1, color: '#1e3a5f', nom: 'Finance & Comptabilité', tag: 'Financial Management',
        img: '/assets/img/tour-comptabilite.png',
        titre: 'Chaque facture, chaque acompte, sous contrôle',
        desc: "Proformas à valider, factures en attente de signature Direction, acomptes non atteints — la Comptabilité voit chaque dossier, jamais un chiffre agrégé sans détail derrière.",
        limite: "Le connecteur vers un logiciel comptable externe (SYSCOHADA/SAGE) n'existe pas encore — extension Phase 2.",
      },
      {
        n: 2, color: '#15803d', nom: 'Ressources Humaines', tag: 'Human Capital Management',
        img: '/assets/img/tour-rh.png',
        titre: 'Tout le personnel, un seul annuaire',
        desc: "Comptes actifs et désactivés répartis sur 18 rôles natifs — chaque poste de l'usine, de la Direction au Gardien, a sa place et ses accès propres.",
        limite: "La paie et le pointage ne sont pas encore couverts — module RH Avancé prévu en Phase 2.",
      },
      {
        n: 3, color: '#7c3aed', nom: 'EVOTEX Studio Dessin 1.0 & BAT', tag: 'PLM Textile',
        img: '/assets/img/tour-studio-dessin.png',
        titre: 'Du premier trait au Bon à Tirer',
        desc: "Suivi en direct des maquettes par salle (départ, création, modification, validation, production) et Registre Gravure des cadres et cylindres — déjà livré en bonus dès la Phase 1.",
        limite: "Un intitulé de colonne repéré comme trompeur reste affiché tel quel, avec son badge — jamais corrigé en silence tant que ce n'est pas fait.",
      },
      {
        n: 4, color: '#c2751c', nom: 'Production & Maintenance Atelier', tag: 'Manufacturing (MES)',
        img: '/assets/img/tour-suivi-production.png',
        titre: 'Le circuit complet, de la commande à la clôture',
        desc: "Un tableau unique — Commande, Studio Dessin, Validation, Production, Magasin, Livraison — tous les dossiers suivis en direct, étape par étape.",
        limite: '',
      },
      {
        n: 5, color: '#0891b2', nom: 'Supply Chain & Logistique', tag: 'Supply Chain Management',
        img: '/assets/img/tour-logistique.png',
        titre: "Rien ne sort sans être tracé",
        desc: "Dossiers en livraison, export à traiter, sorties à livrer — chaque expédition suit un circuit contrôlé, du Commercial au Gardien.",
        limite: "Le suivi des matières premières reste hors socle — module Stocks Avancé en Phase 2.",
      },
      {
        n: 6, color: '#1c6fd9', nom: 'Commercial & Relation Client', tag: 'CRM',
        img: '/assets/img/tour-commercial.png',
        titre: "L'espace de travail du commercial, pas un tableau de bord vide",
        desc: "Relances en attente, budget des commandes, accès rapide à ses outils — chaque commercial retrouve son activité réelle dès la connexion.",
        limite: '',
      },
      {
        n: 7, color: '#b45309', nom: 'Pilotage & Gouvernance', tag: 'Business Intelligence',
        img: '/assets/img/tour-de-controle.png',
        titre: 'Toute l’usine, sur un seul écran',
        desc: "Performance financière live, santé de l'usine, alertes de gouvernance — la Direction pilote sans naviguer entre dix écrans différents.",
        limite: "La Matrice de Décision d'Urgence reste une maquette conceptuelle de vision BI, non connectée à une donnée réelle aujourd'hui.",
      },
      {
        n: 8, color: '#64748b', nom: 'Administration & Sécurité du Système', tag: 'System Administration',
        img: '/assets/img/tour-parametres.png',
        titre: "Chaque réglage a sa page, rien n'est empilé",
        desc: "Tarifs, coûts de revient, commissions, budgets, identité des documents — la configuration financière et documentaire de l'usine, organisée pièce par pièce.",
        limite: "Les notifications et alertes SMS automatiques ne sont pas encore couvertes — extension Phase 2.",
      },
    ];

    return `
      <div class="tour">
        <div class="tour-hero">
          <div class="tour-topbar"><button class="evx-retour" data-nav="#/" style="color:#fff">&#8592; Retour au hub</button></div>
          <div class="tour-kicker">EVOTEX 1.0 — TOUR DE L'APPLICATION</div>
          <h1 class="tour-title">Les écrans réels, <em>bloc par bloc</em></h1>
          <p class="tour-sub">Pas de maquette — chaque capture vient directement de l'application, sur une base de démonstration. Ce qui existe déjà, et honnêtement, ses limites actuelles.</p>
        </div>

        <div class="tour-body">
          ${blocs.map((b) => `
            <div class="tour-bloc">
              <div class="tour-bloc-header">
                <div class="tour-bloc-num" style="background:${b.color}">${b.n}</div>
                <div>
                  <div class="tour-bloc-name">${b.nom}</div>
                  <div class="tour-bloc-tag" style="color:${b.color}">${b.tag}</div>
                </div>
              </div>
              <div class="tour-screen">
                <div class="tour-screen-frame">
                  <div class="tour-screen-framebar"><span></span><span></span><span></span></div>
                  <img src="${b.img}" alt="${b.nom} — capture d'écran réelle BATEXCI ERP" loading="lazy">
                </div>
                <div class="tour-screen-info">
                  <div class="tour-screen-kicker">Bloc ${b.n} · ${b.nom}</div>
                  <h3 class="tour-screen-title">${b.titre}</h3>
                  <p class="tour-screen-desc">${b.desc}</p>
                  ${b.limite ? `<div class="tour-limite"><span class="tour-limite-badge">LIMITE</span><p>${b.limite}</p></div>` : ''}
                </div>
              </div>
            </div>
          `).join('')}

          <div class="tour-footer">
            <div class="tour-footer-line"></div>
            <p>Transparence totale : chaque écart connu ou donnée non encore disponible est signalé directement à l'écran par un badge dédié, jamais masqué ni présenté comme acquis à tort.</p>
            <div class="tour-cta-row">
              <button class="pres-cta -primary" data-nav="#/expression-besoins">Exprimer mon besoin</button>
              <button class="pres-cta -ghost" data-nav="#/licences" style="border-color:#c3d6ee;color:#1c6fd9">Voir les licences</button>
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

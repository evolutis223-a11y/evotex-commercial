// Tour de l'Application — captures d'écran réelles de BATEXCI ERP, organisées
// par les 8 Blocs Fonctionnels (cadrage du 14/09/2026). Chaque écran vient
// d'une capture directe de l'application (Direction, base de démonstration
// réelle) -- jamais une maquette. Aucun nom de personne réelle affiché
// (uniquement des raisons sociales fictives de test), conformément à la
// règle du projet.
//
// Retouche du 17/09/2026 (demande explicite, présentation imminente) :
// Tour de Contrôle ouvre désormais le tour (première chose vue par la
// Présidence), les mentions de limite sont allégées visuellement (jamais
// masquées -- toujours au sujet honnête -- mais plus discrètes, reformulées
// en trajectoire Phase 2 plutôt qu'en manque), le Bloc 4 gagne un second
// écran "atelier terrain" (capture réelle à ajouter -- l'écran existe déjà
// dans le code, seule la capture manque encore à ce jour) et le Bloc 6
// (Commercial) reçoit une bande d'avantages étoffée. "Zéro papier" reste
// banni du vocabulaire (consigne du 14/09/2026) : on dit "automatisé".
window.Views = window.Views || {};

Views.tourApplication = {
  title: "EVOTEX 1.0 — Tour de l'Application",

  render() {
    const blocs = [
      {
        n: 7, color: '#b45309', nom: 'Pilotage & Gouvernance', tag: 'Business Intelligence',
        img: '/assets/img/tour-de-controle.png',
        titre: 'Toute l’usine, sur un seul écran',
        desc: "Votre usine, en direct, où que vous soyez : performance financière, avancement de la production, gouvernance des dossiers — un seul écran qui réunit tout. Vous pilotez, vous validez, vous décidez, sans naviguer entre dix écrans différents — depuis votre bureau comme depuis votre smartphone.",
        script: "Votre usine, enfin sous vos yeux, à chaque instant.",
        limite: "La Matrice de Décision d'Urgence évolue vers une vision BI connectée à des données réelles — trajectoire Phase 2.",
        extra: {
          kicker: 'Tableau de Bord Direction',
          img: '/assets/img/tour-tableau-de-bord.png',
          titre: 'Toute la gouvernance, sous un même regard',
          desc: "Pilotage financier, santé de l'usine et alertes de gouvernance réunis sur un seul écran — chiffre d'affaires encaissé, TRS par poste, dossiers bloqués ou en attente de clôture. Chaque donnée non encore disponible est signalée directement à l'écran, jamais masquée.",
          script: "Le poste de pilotage que la Présidence attendait.",
        },
      },
      {
        n: 1, color: '#1e3a5f', nom: 'Finance & Comptabilité', tag: 'Financial Management',
        img: '/assets/img/tour-comptabilite.png',
        titre: 'Chaque facture, chaque acompte, sous contrôle',
        desc: "Proformas à valider, factures en attente de signature Direction, acomptes non atteints — la Comptabilité voit chaque dossier, jamais un chiffre agrégé sans détail derrière.",
        script: "Vous validez chaque document depuis votre écran, avec tout l'historique sous les yeux.",
        limite: "Le connecteur vers un logiciel comptable externe (SYSCOHADA/SAGE) rejoint la feuille de route Phase 2.",
        overlay: {
          box: { left: '13.5%', top: '71%', width: '36%', height: '18%' },
          items: [
            { titre: 'La dérogation, tranchée à temps.', comment: 'Tarifs et clôtures financières, jamais en attente.' },
            { titre: 'La proforma, validée en un clic.', comment: 'Avant facture, la Comptabilité tranche.' },
            { titre: 'La facture, sans paperasse.', comment: 'Signature Direction, suivie jusqu\'au bout.' },
            { titre: 'Le reste à payer, jamais oublié.', comment: 'Chaque acompte non atteint, dossier par dossier.' },
            { titre: 'La commission, calculée sans oubli.', comment: 'Chaque rôle commercial, son taux, à jour.' },
            { titre: 'Chaque gramme, compté juste.', comment: '1er choix, 2e choix, chiffons — tout est tracé.' },
          ],
        },
        extra: {
          kicker: 'Rapport Financier de l\'Usine',
          img: '/assets/img/tour-rapport-financier.png',
          titre: 'La photo financière exacte, jamais une estimation',
          desc: "Chiffre d'affaires encaissé, marge nette par type de produit, valeur du stock, position de caisse — un rapport réservé à la Présidence, la Direction, le DAF, la Comptabilité et le Contrôle de Gestion, recalculé sur la période choisie.",
          script: "Vous voyez la marge réelle, pas un chiffre rond.",
        },
      },
      {
        n: 2, color: '#15803d', nom: 'Ressources Humaines', tag: 'Human Capital Management',
        img: '/assets/img/tour-rh.png',
        titre: 'Tout le personnel, un seul annuaire',
        desc: "Comptes actifs et désactivés répartis sur 18 rôles natifs — chaque poste de l'usine, de la Direction au Gardien, a sa place et ses accès propres.",
        limite: "La paie et le pointage rejoignent le module RH Avancé, prévu en Phase 2.",
      },
      {
        n: 3, color: '#7c3aed', nom: 'EVOTEX Studio Dessin 1.0 & BAT', tag: 'PLM Textile',
        img: '/assets/img/tour-studio-dessin.png',
        cropPrimary: true,
        titre: 'Du premier trait au Bon à Tirer',
        desc: "Suivi en direct des maquettes par salle (départ, création, modification, validation, production) et Registre Gravure des cadres et cylindres — en avance sur le calendrier dès la Phase 1. Une innovation pensée sur mesure pour le mode de fonctionnement de BATEXCI, appelée à évoluer vers un outil encore plus personnalisé.",
        script: "Un studio conçu pour BATEXCI, pas un logiciel générique.",
        limite: "Un intitulé de colonne repéré comme trompeur reste affiché tel quel, avec son badge — jamais corrigé en silence tant que ce n'est pas fait.",
      },
      {
        n: 4, color: '#c2751c', nom: 'Production & Maintenance Atelier', tag: 'Manufacturing (MES)',
        img: '/assets/img/tour-suivi-production.png',
        titre: 'Le circuit complet, de la commande à la clôture',
        desc: "Un tableau unique — Commande, Studio Dessin, Validation, Production, Magasin, Livraison — tous les dossiers suivis en direct, étape par étape.",
        script: "Suivez toutes vos commandes, en direct, étape par étape.",
        limite: "Le suivi de commande ouvert au client à distance rejoint la feuille de route Phase 2 — aujourd'hui, le suivi reste interne à l'usine.",
        extra: {
          kicker: 'Ateliers de fabrication',
          img: '/assets/img/tour-atelier.png',
          titre: 'Chaque atelier, son écran, son rythme',
          desc: "Gravure, prétraitement, impression, vapo, lavage, rame, calandre, découpe, contrôle qualité : le Chef de Production suit chaque atelier depuis un seul espace, avec son rendement comparé à l'objectif et ses incidents machine tracés en direct. Rien n'entre en fabrication sans être passé par le circuit de signatures.",
          script: "Vous voyez, en un instant, où en est chaque commande — jusqu'au dernier geste d'atelier.",
        },
        gallery: {
          label: 'Chaque poste, son propre espace de travail',
          items: [
            { img: '/assets/img/tour-poste-echantillon.png', cap: 'Échantillon' },
            { img: '/assets/img/tour-poste-gravure.png', cap: 'Gravure' },
            { img: '/assets/img/tour-poste-impression.png', cap: 'Impression' },
            { img: '/assets/img/tour-poste-vapo.png', cap: 'Vapo' },
          ],
        },
      },
      {
        n: 5, color: '#0891b2', nom: 'Supply Chain & Logistique', tag: 'Supply Chain Management',
        img: '/assets/img/tour-logistique.png',
        titre: "Rien ne sort sans être tracé",
        desc: "Dossiers en livraison, export à traiter, sorties à livrer — chaque expédition suit un circuit contrôlé, du Commercial au Gardien.",
        script: "Rien ne bouge dans votre usine sans que vous le sachiez.",
        limite: "Le suivi des matières premières rejoint le module Stocks Avancé, prévu en Phase 2.",
        extra: {
          kicker: 'Valorisation & Stocks',
          img: '/assets/img/tour-valorisation-stocks.png',
          titre: "Le Magasin valorisé, pas seulement compté",
          desc: "Valeur totale du stock, matières premières au prix moyen pondéré, écarts de dosage, impact financier du 2ᵉ choix — le Magasinier voit le flux physique, la Direction voit la valeur financière, sur le même écran.",
          script: "Chaque mètre en stock, avec son prix réel.",
        },
      },
      {
        n: 6, color: '#1c6fd9', nom: 'Commercial & Relation Client', tag: 'CRM',
        img: '/assets/img/tour-commercial.png',
        titre: "L'espace de travail du commercial, pas un tableau de bord vide",
        desc: "Relances en attente, budget des commandes, accès rapide à ses outils — chaque commercial retrouve son activité réelle dès la connexion.",
        script: "Vous arrivez, tout est déjà là.",
        limite: '',
        overlay: {
          box: { left: '6%', top: '80.5%', width: '53%', height: '19.5%' },
          items: [
            { titre: 'Une seule entrée, la commande part.', comment: "Depuis l'écran, sans ressaisie ailleurs." },
            { titre: 'Le suivi, sans avoir à demander.', comment: "L'avancement réel, à tout moment." },
            { titre: 'La facture, sans paperasse.', comment: 'Facturation automatisée, à chaque dossier.' },
            { titre: "Partout, sur n'importe quel écran.", comment: 'Smartphone, tablette ou bureau.' },
            { titre: 'Des chiffres qui se calculent seuls.', comment: 'Objectifs, bilan, commissions à jour.' },
            { titre: 'Une équipe comparable, en un coup d\'œil.', comment: 'Chaque commercial, côte à côte.' },
          ],
        },
        avantages: [
          { titre: 'Une seule entrée, la commande part', desc: "Prise de commande directe depuis l'écran, sans ressaisie ailleurs — le point de départ de tout le circuit." },
          { titre: 'Le suivi, sans avoir à demander', desc: "Chaque commercial voit l'avancement réel de ses dossiers, à tout moment, sans appeler la production." },
          { titre: 'La facture, sans paperasse', desc: "Les procédures de facturation sont automatisées, pour un gain de temps réel à chaque dossier." },
          { titre: "Partout, sur n'importe quel écran", desc: "Smartphone, tablette ou bureau — le commercial travaille où il est, avec les mêmes données." },
          { titre: 'Des chiffres qui se calculent seuls', desc: "Objectifs journaliers, bilan et commissions sont suivis automatiquement, sans tableur à tenir à la main." },
          { titre: 'Une équipe comparable, en un coup d’œil', desc: "La Direction voit la performance de chaque commercial, côte à côte, sans demander de rapport." },
        ],
        extra: {
          kicker: 'Vente Directe',
          img: '/assets/img/tour-vente-directe.png',
          titre: 'La vente au comptoir, déjà prête à servir',
          desc: "Vente comptoir d'articles déjà en stock — client, mode de retrait, articles, total — sans circuit de production ni signature à attendre. Un bonus déjà livré en Phase 1, au-delà du socle prévu.",
          script: "La vente au comptoir, en quelques clics.",
        },
        bonusExtra: {
          kicker: 'Outil bonus — Estimateur Commercial',
          img: '/assets/img/tour-estimateur.png',
          titre: 'Un estimateur, toujours à portée de main',
          desc: "Accessible en un clic depuis n'importe quel écran de l'application — un calcul de prix instantané par type de produit, quantité, couleurs et régime (local ou export), pour répondre à un client au téléphone sans attendre. Purement indicatif : il ne crée ni ne modifie aucune commande réelle.",
          script: "La réponse au client, avant qu'il ne raccroche.",
        },
      },
      {
        n: 8, color: '#64748b', nom: 'Administration & Sécurité du Système', tag: 'System Administration',
        img: '/assets/img/tour-parametres.png',
        titre: "Chaque réglage a sa page, rien n'est empilé",
        desc: "Tarifs, coûts de revient, commissions, budgets, identité des documents — la configuration financière et documentaire de l'usine, organisée pièce par pièce.",
        script: "Votre usine, réglée à votre image.",
        limite: "Les notifications et alertes SMS automatiques rejoignent l'extension Phase 2.",
        extra: {
          kicker: 'Contrôle de Gestion',
          img: '/assets/img/tour-controle-gestion.png',
          titre: '8 piliers de gestion, une seule vue',
          desc: "Commercial, Industriel, Chimie & Énergie, Maintenance, Stocks, Achats, Trésorerie, RH — la structure complète des 8 piliers est déjà en place, avec les premiers indicateurs réels branchés (chiffre d'affaires, marge, valeur du stock).",
          script: "Une structure prête à recevoir chaque donnée, pilier par pilier.",
        },
      },
    ];

    const screenBlock = (b, titre, desc, img, placeholderLabel, kicker, script, crop, overlay) => `
      <div class="tour-screen">
        <div class="tour-screen-frame${crop ? ' -crop' : ''}">
          <div class="tour-screen-framebar"><span></span><span></span><span></span></div>
          ${placeholderLabel
            ? `<div class="tour-imgslot">${placeholderLabel}</div>`
            : `<div class="tour-screen-imgwrap">
                <img src="${img}" alt="${b.nom} — capture d'écran réelle BATEXCI ERP" loading="lazy">
                ${overlay ? `
                  <div class="tour-overlay-row" style="left:${overlay.box.left};top:${overlay.box.top};width:${overlay.box.width};height:${overlay.box.height}">
                    ${overlay.items.map((o) => `
                      <div class="tour-overlay-item">
                        <p class="tour-overlay-title">${o.titre}</p>
                        <p class="tour-overlay-comment">${o.comment}</p>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
               </div>`}
        </div>
        <div class="tour-screen-info">
          <div class="tour-screen-kicker">${kicker}</div>
          <h3 class="tour-screen-title">${titre}</h3>
          <p class="tour-screen-desc">${desc}</p>
          ${script ? `<p class="tour-script">${script}</p>` : ''}
        </div>
      </div>
    `;

    return `
      <div class="tour">
        <div class="tour-hero">
          <div class="tour-topbar"><button class="evx-retour" data-nav="#/" style="color:#fff">&#8592; Retour au hub</button></div>
          <div class="tour-kicker">CONÇU POUR BATEXCI — TOUR DE L'APPLICATION</div>
          <h1 class="tour-title">BATEXCI, <em>pilotée et automatisée</em> en 6 mois</h1>
          <p class="tour-sub">Dès le Mois 2, une première partie de votre usine déjà pilotée en direct depuis un seul écran. D'ici la fin des 6 mois, tout le circuit — de la gravure à la caisse — est numérisé, tracé, automatisé. Les écrans ci-dessous sont réels, pris directement dans l'application.</p>
          <p class="tour-sub" style="margin-top:14px;font-size:13px;opacity:.85">Pensée et construite sur mesure pour BATEXCI, brique par brique, par une jeune équipe malienne — pas un logiciel générique adapté après coup, une vision africaine de la gestion industrielle.</p>
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

              ${screenBlock(b, b.titre, b.desc, b.img, null, `Bloc ${b.n} · ${b.nom}`, b.script, b.cropPrimary, b.overlay)}
              ${b.limite ? `<div class="tour-limite"><p>${b.limite}</p></div>` : ''}

              ${b.avantages ? `
                <div class="tour-avantages">
                  ${b.avantages.map((a) => `
                    <div class="tour-avantage">
                      <div class="tour-avantage-titre">${a.titre}</div>
                      <p class="tour-avantage-desc">${a.desc}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${b.extra ? `
                <div style="margin-top:20px">
                  ${screenBlock(b, b.extra.titre, b.extra.desc, b.extra.img, null, b.extra.kicker, b.extra.script, b.extra.crop)}
                </div>
              ` : ''}

              ${b.bonusExtra ? `
                <div style="margin-top:20px">
                  ${screenBlock(b, b.bonusExtra.titre, b.bonusExtra.desc, b.bonusExtra.img, null, b.bonusExtra.kicker, b.bonusExtra.script, b.bonusExtra.crop)}
                </div>
              ` : ''}

              ${b.gallery ? `
                <div class="tour-mini-gallery-label">${b.gallery.label}</div>
                <div class="tour-mini-gallery">
                  ${b.gallery.items.map((g) => `
                    <div class="tour-mini-card">
                      <div class="frame"><img src="${g.img}" alt="${g.cap} — capture d'écran réelle BATEXCI ERP" loading="lazy"></div>
                      <div class="cap">${g.cap}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}

          <div class="tour-footer">
            <div class="tour-footer-line"></div>
            <div class="tour-compare">
              <p><b>Sans EVOTEX</b> : rapports papier, réunions sans fin, une grande équipe pour compiler ce qu'un écran affiche déjà. <b>Avec EVOTEX</b> : chaque geste tracé, chaque retard visible le jour même, moins besoin de profils hyper-spécialisés pour surveiller ce que l'outil surveille déjà.</p>
            </div>
            <p>Transparence totale : chaque écart connu ou donnée non encore disponible est signalé directement à l'écran par un badge dédié, jamais masqué ni présenté comme acquis à tort.</p>
            <p class="tour-negociable">Le Socle 1 ci-dessus est notre base de lancement. Si certains modules Phase 2 vous intéressent dès le démarrage, nous en discutons ensemble — délai et moyens s'ajustent selon vos priorités.</p>
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

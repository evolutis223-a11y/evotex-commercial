// Étapes de négociation -- non séquentielles (navigables dans le désordre).
// Chaque étape recommande des outils du site public, mais TOUS les outils
// restent visibles et utilisables à tout moment (retour du 14/09/2026 :
// "la négociation n'est pas quelque chose de fixe... si le commercial juge
// que c'est le bon moment, il le fait"). "conseil" est la première brique du
// futur guide écran par écran, affiché en évidence sur l'écran de l'étape.
export const TOUS_LES_OUTILS = [
  { id: "presentation", libelle: "Présentation Exécutive", url: "/#/presentation" },
  { id: "cdc", libelle: "Cahier des Charges Client", url: "/#/expression-besoins" },
  { id: "licences", libelle: "Grille de Licences", url: "/#/licences" },
  { id: "socle", libelle: "Socle de Lancement", url: "/#/socle-lancement" },
  { id: "tour-application", libelle: "Tour de l'Application", url: "/#/tour-application" },
  // Dossier d'échange bidirectionnel -- distinct des autres outils (pas un
  // catalogue fixe, mais les fichiers réellement déposés par l'une ou
  // l'autre partie) -- retour du 14/09/2026. Placé en dernier sur la bande :
  // c'est un outil d'échange au fil de l'eau, pas un support de vente.
  { id: "echange", libelle: "Échange de Fichiers", url: null },
];

export const ETAPES = [
  { n: 1, label: "Premier contact", conseil: "Présentez EVOTEX au prospect pour susciter son intérêt.", recommandes: ["presentation"] },
  { n: 2, label: "Présentation effectuée", conseil: "Si le contact est engagé, approfondissez avec le dossier complet.", recommandes: ["presentation", "socle"] },
  { n: 3, label: "Besoins exprimés", conseil: "Faites remplir le Cahier des Charges pour cadrer précisément le projet.", recommandes: ["cdc"] },
  { n: 4, label: "Devis envoyé", conseil: "Présentez la Grille de Licences et discutez du tarif.", recommandes: ["licences"] },
  { n: 5, label: "Négociation tarifaire", conseil: "Le Socle de Lancement et la Grille de Licences aident à argumenter la valeur.", recommandes: ["socle", "licences"] },
  { n: 6, label: "Convention signée", conseil: "Client acquis — préparez la suite avec la Direction.", recommandes: [] },
];

// Composants de chaque outil -- pour l'envoi granulaire, page par page ou
// bloc par bloc (retour du 14/09/2026). Un outil sans entrée ici reste un
// bloc unique (pas de second niveau de vignettes).
export const COMPOSANTS_OUTILS = {
  presentation: [
    { id: "accroche", libelle: "Accroche produit" },
    { id: "modules", libelle: "Modules clés" },
    { id: "pourquoi", libelle: "Pourquoi EVOTEX" },
    { id: "cta", libelle: "Appel à l'action" },
  ],
  // Vrais titres des 12 pages (retour du 17/09/2026 -- "pas que page 1, 2,
  // 3, mais insère les titres des pages"), repris tels quels du sommaire
  // interne du document (page 12) -- raccourcis avec "…" quand trop longs
  // pour une vignette, jamais le texte intégral ni un titre inventé.
  // Ids synchronisés avec les vraies ancres de socle-lancement.js (feu vert
  // du 17/09/2026 -- "tu as le feu vert pour modifier socle de façon à ce
  // que les numéros coïncident avec les pages") : p1/p4/p7 réutilisent les
  // ids déjà présents dans le document (posés pour les liens directs depuis
  // la page Licences publique -- jamais renommés) ; p2/p3/p5/p6/p8-p12 sont
  // les 9 ancres ajoutées ce jour-là, une par page manquante.
  socle: [
    { id: "licence-vente-totale", libelle: "Couverture & Vision Stratégique" },
    { id: "p2", libelle: "Architecture en 8 Blocs…" },
    { id: "p3", libelle: "Le Cœur de la Plateforme…" },
    { id: "licence-deploiement", libelle: "Socle Opérationnel — Mois 1-2" },
    { id: "p5", libelle: "Détail du Socle Opérationnel" },
    { id: "p6", libelle: "Trajectoire de Finalisation…" },
    { id: "licence-saas", libelle: "Catalogue : Socle, Avance…" },
    { id: "p8", libelle: "Plan d'Accompagnement…" },
    { id: "p9", libelle: "Moteur de Validation…" },
    { id: "p10", libelle: "Gouvernance des Accès…" },
    { id: "p11", libelle: "Pilotage Technique…" },
    { id: "p12", libelle: "Sommaire" },
  ],
  licences: [
    { id: "licence-vue-ensemble", libelle: "Vue d'ensemble", url: "/assets/img/licence-vue-ensemble.png" },
    { id: "licence-deploiement", libelle: "Déploiement à Vie", url: "/assets/img/licence-01-deploiement.png" },
    { id: "licence-vente-totale", libelle: "Vente Totale (PI)", url: "/assets/img/licence-02-vente-totale.png" },
    { id: "licence-saas", libelle: "SaaS + Modules", url: "/assets/img/licence-03-saas.png" },
  ],
  captures: [
    { id: "capture-tour", libelle: "Tour de Contrôle", url: "/assets/img/tour-de-controle.png" },
    { id: "capture-circuit", libelle: "Circuit de Production", url: "/assets/img/circuit-production.png" },
  ],
};

export function libelleEtape(n) {
  return ETAPES.find((e) => e.n === n)?.label || "Étape " + n;
}

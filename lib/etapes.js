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
  { id: "captures", libelle: "Captures d'écran", url: "/assets/img/tour-de-controle.png" },
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
  socle: Array.from({ length: 12 }, (_, i) => ({ id: "p" + (i + 1), libelle: "Page " + (i + 1) })),
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

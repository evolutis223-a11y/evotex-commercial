// Routeur minimal, sans dépendance — bascule entre les vues via le hash de l'URL.
//
// Mode partage (17/09/2026, demande explicite) : un lien envoyé sous la forme
// "?partage=1#/tour-application" verrouille le visiteur sur CETTE vue précise.
// Verrouillage au niveau du routeur, pas seulement par des boutons masqués :
// tout changement de hash (clic sur un lien interne OU URL tapée à la main)
// vers une autre vue est annulé et ramené de force sur la vue partagée.
// Le corps de la page reçoit la classe "evx-partage", qui masque en CSS
// (tokens.css) tous les boutons de navigation inter-pages (.evx-retour,
// .pres-cta, .lic-more) pour qu'aucun lien mort ne s'affiche.
//
// Mode partage complet (17/09/2026) : "?partage=complet" donne accès à
// toute l'application, sans aucun verrouillage — utile si le client n'est
// pas disponible en salle de négociation et doit explorer seul. Purement
// cosmétique côté routeur (classe "evx-partage-complet" sur <html>, lue par
// js/hub.js pour adapter le titre du hub à un lecteur client plutôt qu'à un
// commercial).
(function () {
  function currentViewKey() {
    const hash = window.location.hash;
    if (hash.startsWith("#/socle-lancement")) return "socle";
    if (hash === "#/presentation") return "presentation";
    if (hash === "#/expression-besoins") return "besoins";
    if (hash === "#/licences") return "licences";
    if (hash === "#/tour-application") return "tourApplication";
    return "hub";
  }

  const params = new URLSearchParams(window.location.search);
  const partageActif = params.get("partage") === "1";
  const partageComplet = params.get("partage") === "complet";
  const vueVerrouillee = partageActif ? window.location.hash || "#/" : null;
  if (partageActif) {
    document.documentElement.classList.add("evx-partage");
  }
  if (partageComplet) {
    document.documentElement.classList.add("evx-partage-complet");
  }

  let mounted = null;
  let enForcage = false;

  function renderCurrent() {
    if (partageActif && !enForcage && window.location.hash !== vueVerrouillee) {
      enForcage = true;
      window.location.hash = vueVerrouillee;
      enForcage = false;
      return; // le hashchange déclenché par la ligne au-dessus relance renderCurrent proprement
    }
    if (mounted && typeof mounted.unmount === "function") mounted.unmount();
    const key = currentViewKey();
    const view = window.Views[key];
    const root = document.getElementById("app");
    if (!view || !root) return;
    root.innerHTML = view.render();
    if (typeof view.mount === "function") view.mount(root);
    if (view.title) document.title = view.title;
    mounted = view;
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", renderCurrent);
  window.addEventListener("DOMContentLoaded", renderCurrent);
})();

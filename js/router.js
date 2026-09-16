// Routeur minimal, sans dépendance — bascule entre les vues via le hash de l'URL.
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

  let mounted = null;

  function renderCurrent() {
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

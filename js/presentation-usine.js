// Présentation "L'outil qui pilote toute l'usine" (19/09/2026, demande explicite).
//
// Page commerciale autonome : le document vit dans /presentations/ (HTML
// statique complet) et s'affiche ici dans un cadre (iframe), pour que ses
// styles ne se mélangent jamais à ceux du site. Deux versions pour deux
// cibles différentes : sans mention du PCA (usine.html) et avec la section
// "Le regard du PCA" (usine-pca.html).
//
// Date de version : UNE seule constante, ci-dessous. Elle est lue par les
// cartes du hub (js/hub.js) et par la bande sous le document. À changer à
// chaque mise à jour du document. Jamais dans le document lui-même : elle
// sert au commercial, pour savoir à quelle période le document a été établi
// (masquée au destinataire d'un lien de partage, voir
// css/presentation-usine.css).
window.Views = window.Views || {};

window.PresentationUsine = {
  dateVersion: "19/09/2026",
};

(function () {
  function creerVue(fichier, titre, libelleCadre) {
    return {
      title: titre,

      render() {
        return `
          <div class="pu">
            <div class="pu-topbar"><button class="evx-retour" data-nav="#/">&#8592; Retour au hub</button></div>
            <iframe class="pu-cadre" src="/presentations/${fichier}" title="${libelleCadre}"></iframe>
            <p class="pu-date">Version du ${window.PresentationUsine.dateVersion}</p>
          </div>
        `;
      },

      mount(root) {
        root.querySelectorAll("[data-nav]").forEach((el) => {
          el.addEventListener("click", () => {
            window.location.hash = el.getAttribute("data-nav");
          });
        });
      },
    };
  }

  Views.presentationUsine = creerVue(
    "usine.html",
    "EVOTEX 1.0 : L'outil qui pilote toute l'usine",
    "Présentation : l'outil qui pilote toute l'usine"
  );

  Views.presentationUsinePca = creerVue(
    "usine-pca.html",
    "EVOTEX 1.0 : L'outil qui pilote toute l'usine, avec le regard du PCA",
    "Présentation : l'outil qui pilote toute l'usine, avec le regard du PCA"
  );
})();

// Partage — construit et copie les liens de partage, sans saisie manuelle
// de hash. Deux formats : "#/xxx" verrouille le client sur cette seule vue
// (mode ?partage=1, cf. router.js) ; "complet" donne acces a toute
// l'application avec un titre de hub adapte au client (mode
// ?partage=complet, cosmetique uniquement, aucune restriction de
// navigation). Utilise par les boutons [data-partage] du hub (js/hub.js).
window.EvxPartage = (function () {
  // La racine du site public est toujours "/" (vercel.json, cleanUrls, un
  // seul déploiement) -- jamais window.location.pathname : ce module est
  // aussi chargé depuis /gestion/ (Espace Commercial y monte le vrai hub en
  // direct), où pathname vaudrait "/gestion/" et produirait un lien pointant
  // vers l'appli interne au lieu du site public (retour du 17/09/2026, bouton
  // "Partager" muet -- et navigant par erreur dans la carte -- depuis Espace
  // Commercial).
  function construireLien(cible) {
    const base = window.location.origin + "/";
    if (cible === "complet") return base + "?partage=complet";
    return base + "?partage=1" + cible;
  }

  // Repli execCommand -- navigateur ancien, contexte non securise, ou
  // Clipboard API refusee (permission, focus perdu, iframe). Renvoie un
  // booleen plutot qu'une promesse : execCommand est synchrone.
  function copierViaExecCommand(texte) {
    const zone = document.createElement("textarea");
    zone.value = texte;
    zone.style.position = "fixed";
    zone.style.opacity = "0";
    document.body.appendChild(zone);
    zone.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (erreur) {
      ok = false;
    }
    document.body.removeChild(zone);
    return ok;
  }

  function copier(texte) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texte).catch(() => {
        if (!copierViaExecCommand(texte)) throw new Error("copie impossible");
      });
    }
    return copierViaExecCommand(texte) ? Promise.resolve() : Promise.reject(new Error("copie impossible"));
  }

  function initBoutons(root) {
    root.querySelectorAll("[data-partage]").forEach((btn) => {
      const libelle = btn.querySelector(".js-partage-label") || btn;
      const texteInitial = libelle.textContent;
      btn.addEventListener("click", (evenement) => {
        evenement.stopPropagation();
        const lien = construireLien(btn.getAttribute("data-partage"));
        copier(lien)
          .then(() => {
            libelle.textContent = "Lien copié !";
            btn.classList.add("-copie");
            setTimeout(() => {
              libelle.textContent = texteInitial;
              btn.classList.remove("-copie");
            }, 1600);
          })
          .catch(() => {
            // Aucune methode de copie automatique n'a fonctionne -- on ne
            // laisse jamais le commercial sans lien : il peut le copier a
            // la main depuis cette invite.
            window.prompt("Copie automatique impossible. Copiez ce lien :", lien);
          });
      });
    });
  }

  return { construireLien, copier, initBoutons };
})();

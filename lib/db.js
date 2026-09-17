// Client Neon partagé -- base dédiée à evotex-commercial, jamais celle de l'ERP.
import { neon } from "@neondatabase/serverless";

let clientBrut = null;

// Un seul essai supplémentaire sur une coupure de connexion transitoire
// (retour du 17/09/2026 -- ConnectTimeoutError intermittent observé en
// conditions réelles, jusqu'à "Erreur serveur." affiché au tout premier
// écran, la connexion). Jamais sur une vraie erreur SQL (syntaxe,
// contrainte violée...), qui échouerait exactement pareil à la deuxième
// tentative -- uniquement l'échec de connexion lui-même, qui survient
// avant que la moindre requête n'atteigne le serveur (donc sans risque de
// rejouer un INSERT/UPDATE en double).
function estErreurConnexionTransitoire(err) {
  return err?.cause?.code === "UND_ERR_CONNECT_TIMEOUT" || /fetch failed/i.test(String(err?.message || ""));
}

export function sql() {
  if (!clientBrut) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL manquant (variable d'environnement).");
    clientBrut = neon(process.env.DATABASE_URL);
  }
  return async (...args) => {
    try {
      return await clientBrut(...args);
    } catch (err) {
      if (!estErreurConnexionTransitoire(err)) throw err;
      await new Promise((resolve) => setTimeout(resolve, 300));
      return clientBrut(...args);
    }
  };
}

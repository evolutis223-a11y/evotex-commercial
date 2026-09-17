// Lecture du cookie de session dans les routes API (runtime Node, objet
// `req` classique -- différent de l'objet Request web utilisé par middleware.js).
import { verifierSession, nomCookie } from "./auth.js";
import { jetonSessionValide } from "./negociations.js";

export async function sessionDepuisRequete(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${nomCookie()}=([^;]+)`));
  if (!match) return null;
  const payload = await verifierSession(decodeURIComponent(match[1]));
  if (!payload) return null;
  // Session unique par compte (retour du 17/09/2026) : un cookie signé
  // cryptographiquement valide ne suffit plus -- si la Direction a coupé la
  // session (déconnexion forcée, réinitialisation de mot de passe) ou
  // qu'une connexion plus récente a remplacé le jeton, celle-ci est refusée
  // immédiatement, sans attendre les 14 jours d'expiration du cookie.
  const valide = await jetonSessionValide(payload.utilisateurId, payload.jeton);
  if (!valide) return null;
  return payload;
}

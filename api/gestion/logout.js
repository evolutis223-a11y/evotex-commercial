// Libère la session en base (retour du 17/09/2026, session unique par
// compte) EN PLUS d'effacer le cookie -- sinon le compte resterait
// "connecté" jusqu'à l'expiration naturelle (14 jours), empêchant même son
// propre titulaire de se reconnecter ailleurs après une déconnexion.
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { fermerSessionUtilisateur } from "../../lib/negociations.js";
import { nomCookie } from "../../lib/auth.js";

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (session) await fermerSessionUtilisateur(session.utilisateurId);
  res.setHeader("Set-Cookie", `${nomCookie()}=; Path=/; HttpOnly; Max-Age=0`);
  res.status(200).json({ ok: true });
}

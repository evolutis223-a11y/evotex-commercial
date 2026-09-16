// POST -- signal de présence léger, appelé toutes les ~45s tant qu'une page
// de l'Espace de Travail reste ouverte. Approximation honnête d'une présence
// en ligne, jamais une vraie promesse de temps réel.
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { marquerVu } from "../../lib/negociations.js";

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (!session) {
    res.status(401).json({ ok: false });
    return;
  }
  await marquerVu(session.utilisateurId);
  res.status(200).json({ ok: true });
}

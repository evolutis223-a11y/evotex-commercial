import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { utilisateurParId, appartenancesDe } from "../../lib/negociations.js";

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (!session) {
    res.status(401).json({ ok: false, erreur: "Non connecté." });
    return;
  }
  const utilisateur = await utilisateurParId(session.utilisateurId);
  const appartenances = await appartenancesDe(session.utilisateurId);
  res.status(200).json({ ok: true, utilisateur, appartenances });
}

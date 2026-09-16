// GET ?id=<fichier> -- sert le contenu d'un fichier du dossier d'échange
// d'une négociation, après vérification d'appartenance (retour du
// 14/09/2026). Sert aussi de "url" pour "Envoyer vers Mes Documents" --
// un fichier promu pointe simplement vers cette même route.
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { membreDe, fichierPartageParId } from "../../lib/negociations.js";

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (!session) {
    res.status(401).json({ ok: false, erreur: "Non connecté." });
    return;
  }
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, erreur: "Méthode non autorisée." });
    return;
  }
  const id = Number(req.query.id);
  if (!id) {
    res.status(400).json({ ok: false, erreur: "id manquant." });
    return;
  }
  const fichier = await fichierPartageParId(id);
  if (!fichier) {
    res.status(404).json({ ok: false, erreur: "Fichier introuvable." });
    return;
  }
  const appartenance = await membreDe(fichier.negociation_id, session.utilisateurId);
  if (!appartenance || !appartenance.actif) {
    res.status(403).json({ ok: false, erreur: "Accès refusé." });
    return;
  }
  // Un client ne peut jamais récupérer un fichier qu'il a lui-même retiré de
  // sa propre vue -- même en devinant l'id (retour du 14/09/2026).
  if (appartenance.role === "client" && fichier.masque_pour_client) {
    res.status(404).json({ ok: false, erreur: "Fichier introuvable." });
    return;
  }
  const buffer = Buffer.from(fichier.contenu_base64, "base64");
  res.setHeader("Content-Type", fichier.type_mime || "application/octet-stream");
  res.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(fichier.nom_fichier)}"`);
  res.setHeader("Cache-Control", "private, max-age=3600");
  res.status(200).end(buffer);
}

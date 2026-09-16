// GET ?id=<message>&canal=interne|client[&telecharger=1] -- sert l'audio
// d'un message vocal, après vérification d'appartenance à la négociation.
// Deux restrictions volontaires (retour du 14/09/2026) :
//  - un message "supprimé" (illusion, voir schema.sql) ne renvoie plus rien
//    à personne, même pas à la Direction en usage courant -- elle le
//    retrouve "par besoin" via la Boîte noire, pas ici.
//  - le téléchargement réel (Content-Disposition: attachment) n'est posé que
//    si le demandeur est Direction ET a explicitement passé ?telecharger=1 ;
//    tout le monde d'autre reçoit "inline" (lecture seule dans le lecteur
//    audio). Ceci reste une barrière d'interface, pas un verrou
//    cryptographique -- un navigateur peut toujours enregistrer un flux
//    audio qu'il joue, ça a été expliqué à l'utilisateur avant de coder.
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { membreDe, messageParId, messageClientParId } from "../../lib/negociations.js";

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
  const canal = req.query.canal === "client" ? "client" : "interne";
  if (!id) {
    res.status(400).json({ ok: false, erreur: "id manquant." });
    return;
  }
  const message = canal === "client" ? await messageClientParId(id) : await messageParId(id);
  if (!message || !message.audio_base64) {
    res.status(404).json({ ok: false, erreur: "Message introuvable." });
    return;
  }
  const appartenance = await membreDe(message.negociation_id, session.utilisateurId);
  if (!appartenance || !appartenance.actif) {
    res.status(403).json({ ok: false, erreur: "Accès refusé." });
    return;
  }
  // Interne (Échanges de l'équipe) reste fermé à Apporteur/Autre, comme le
  // reste de ce tchat.
  if (canal === "interne" && (appartenance.role === "apporteur" || appartenance.role === "autre" || appartenance.role === "client")) {
    res.status(403).json({ ok: false, erreur: "Accès refusé." });
    return;
  }
  if (message.supprime_le && appartenance.role !== "direction") {
    res.status(404).json({ ok: false, erreur: "Message introuvable." });
    return;
  }
  const buffer = Buffer.from(message.audio_base64, "base64");
  res.setHeader("Content-Type", message.audio_type_mime || "audio/webm");
  const telecharger = req.query.telecharger === "1" && appartenance.role === "direction";
  res.setHeader("Content-Disposition", telecharger ? "attachment; filename=\"vocal.webm\"" : "inline");
  res.setHeader("Cache-Control", "private, max-age=3600");
  res.status(200).end(buffer);
}

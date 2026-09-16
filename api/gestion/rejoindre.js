// GET ?jeton=<jeton> -- lien d'accès envoyé à un membre pour rejoindre
// directement sa négociation, sans ressaisir email ni mot de passe (voir
// schema.sql pour le détail du retour du 16/09/2026). Volontairement PAS
// protégé par sessionDepuisRequete : c'est justement ce qui pose la session.
//
// Répond par une vraie redirection HTTP (pas du JSON) : c'est le lien lui-
// même que la personne ouvre dans son navigateur -- rien à interroger en
// JavaScript avant. Pose le cookie puis renvoie vers /gestion/, qui à ce
// stade a déjà une session valide et passe donc le middleware de protection
// (celui-ci bloque tout /gestion/* sans session, sauf /gestion/login).
import { invitationParJeton, invitationValide, enregistrerConnexion, marquerVu } from "../../lib/negociations.js";
import { signerSession, nomCookie, dureeSessionSecondes } from "../../lib/auth.js";

export default async function handler(req, res) {
  const jeton = (req.query.jeton || "").toString().trim();
  const invitation = jeton ? await invitationParJeton(jeton) : null;

  if (req.method !== "GET" || !invitationValide(invitation)) {
    res.writeHead(302, { Location: "/gestion/login?erreur=lien_invalide" });
    res.end();
    return;
  }

  const session = await signerSession({ utilisateurId: invitation.utilisateur_id });
  await enregistrerConnexion(invitation.utilisateur_id, req.headers["user-agent"]);
  await marquerVu(invitation.utilisateur_id);

  // "Secure" omis en local (vercel dev sert en http://localhost) -- présent
  // partout ailleurs, puisque le vrai déploiement est toujours en https.
  const secure = process.env.VERCEL_ENV ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${nomCookie()}=${encodeURIComponent(session)}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${dureeSessionSecondes()}`
  );
  res.writeHead(302, { Location: `/gestion/?negociationId=${invitation.negociation_id}` });
  res.end();
}

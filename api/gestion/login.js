// POST { email, motDePasse } -> pose le cookie de session si valide.
// Runtime Node (par défaut sur Vercel) -- seul endroit où bcrypt est utilisé.
import { utilisateurParEmail, enregistrerConnexion, marquerVu, sessionDejaActive, ouvrirSessionUtilisateur } from "../../lib/negociations.js";
import { verifierMotDePasse, signerSession, nomCookie, dureeSessionSecondes } from "../../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, erreur: "Méthode non autorisée." });
    return;
  }

  const { email, motDePasse } = req.body || {};
  if (!email || !motDePasse) {
    res.status(400).json({ ok: false, erreur: "Email et mot de passe requis." });
    return;
  }

  const utilisateur = await utilisateurParEmail(String(email).trim().toLowerCase());
  const valide = utilisateur ? await verifierMotDePasse(motDePasse, utilisateur.mot_de_passe_hash) : false;

  if (!valide) {
    // Volontairement le même message que l'email soit inconnu ou le mot de
    // passe faux -- ne jamais révéler si un email existe dans la base.
    res.status(401).json({ ok: false, erreur: "Identifiants incorrects." });
    return;
  }

  // Session unique par compte (retour du 17/09/2026) : refusée, pas
  // remplacée en silence, si ce compte a déjà une session active ailleurs.
  if (await sessionDejaActive(utilisateur.id)) {
    res.status(409).json({ ok: false, erreur: "Ce compte est déjà connecté ailleurs. Demandez à la Direction de forcer la déconnexion si besoin." });
    return;
  }

  const jeton = await ouvrirSessionUtilisateur(utilisateur.id, dureeSessionSecondes());
  const session = await signerSession({ utilisateurId: utilisateur.id, jeton });
  await enregistrerConnexion(utilisateur.id, req.headers["user-agent"]);
  await marquerVu(utilisateur.id);

  // "Secure" omis en local (vercel dev sert en http://localhost) -- présent
  // partout ailleurs, puisque le vrai déploiement est toujours en https.
  const secure = process.env.VERCEL_ENV ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${nomCookie()}=${encodeURIComponent(session)}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${dureeSessionSecondes()}`
  );
  res.status(200).json({ ok: true, nom: utilisateur.nom });
}

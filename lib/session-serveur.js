// Lecture du cookie de session dans les routes API (runtime Node, objet
// `req` classique -- différent de l'objet Request web utilisé par middleware.js).
import { verifierSession, nomCookie } from "./auth.js";

export async function sessionDepuisRequete(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${nomCookie()}=([^;]+)`));
  if (!match) return null;
  return verifierSession(decodeURIComponent(match[1]));
}

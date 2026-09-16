// Vercel Edge Middleware -- protège tout l'Espace Gestion du Projet &
// Négociations (§1.2 du CDC, volet interne). Tourne en runtime Edge, avant
// que la moindre page ne soit envoyée : c'est la vraie protection par mot de
// passe (jamais une simple vérification en JavaScript côté page).
import { verifierSession, nomCookie } from "./lib/auth.js";

export const config = {
  matcher: ["/gestion/:path*", "/suivi/:path*"],
};

// Le rôle (direction/negociateur/apporteur/client) est propre à chaque
// négociation, pas un attribut global de l'utilisateur -- une même personne
// pourra un jour avoir des rôles différents selon la négociation. Le
// middleware vérifie donc uniquement "session valide ou non" ; c'est la page
// /gestion elle-même qui interroge les appartenances réelles (lib/negociations.js)
// pour savoir quoi afficher (tableau de bord interne, vue client, ou un choix
// de négociation s'il y en a plusieurs).
export default async function middleware(request) {
  const url = new URL(request.url);

  // La page de connexion elle-même reste accessible sans session.
  if (url.pathname === "/gestion/login" || url.pathname === "/gestion/login.html") {
    return;
  }

  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${nomCookie()}=([^;]+)`));
  const session = match ? await verifierSession(decodeURIComponent(match[1])) : null;

  if (!session) {
    const connexion = new URL("/gestion/login", request.url);
    connexion.searchParams.set("suite", url.pathname);
    return Response.redirect(connexion, 302);
  }

  return;
}

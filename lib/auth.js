// Authentification maison pour l'Espace Gestion du Projet & Négociations.
// Écrit en Web Crypto (crypto.subtle) plutôt qu'en API Node "crypto" pour
// que la même fonction de vérification tourne à la fois dans les routes API
// (Node runtime) et dans middleware.js (Edge runtime) -- une seule
// implémentation, jamais deux logiques de session qui divergent.
import bcrypt from "bcryptjs";

const NOM_COOKIE = "evx_session";
const DUREE_SESSION_S = 60 * 60 * 24 * 14; // 14 jours

function b64urlEncoder(octets) {
  let brut = "";
  for (const o of octets) brut += String.fromCharCode(o);
  return btoa(brut).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecoder(texte) {
  const brut = atob(texte.replace(/-/g, "+").replace(/_/g, "/"));
  const octets = new Uint8Array(brut.length);
  for (let i = 0; i < brut.length; i++) octets[i] = brut.charCodeAt(i);
  return octets;
}

async function cle(secret) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function secretSession() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET manquant (variable d'environnement).");
  return s;
}

// Fabrique le cookie de session : base64url(payload JSON) + "." + signature HMAC.
export async function signerSession(payload) {
  const donnees = { ...payload, exp: Math.floor(Date.now() / 1000) + DUREE_SESSION_S };
  const corps = b64urlEncoder(new TextEncoder().encode(JSON.stringify(donnees)));
  const signature = await crypto.subtle.sign("HMAC", await cle(secretSession()), new TextEncoder().encode(corps));
  return `${corps}.${b64urlEncoder(new Uint8Array(signature))}`;
}

// Vérifie un cookie de session ; renvoie le payload ou null si invalide/expiré.
export async function verifierSession(valeurCookie) {
  if (!valeurCookie || !valeurCookie.includes(".")) return null;
  const [corps, signature] = valeurCookie.split(".");
  try {
    const valide = await crypto.subtle.verify(
      "HMAC",
      await cle(secretSession()),
      b64urlDecoder(signature),
      new TextEncoder().encode(corps)
    );
    if (!valide) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecoder(corps)));
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function nomCookie() {
  return NOM_COOKIE;
}

export function dureeSessionSecondes() {
  return DUREE_SESSION_S;
}

// Hachage / vérification de mot de passe -- utilisé uniquement dans les
// routes API (runtime Node, jamais dans middleware.js en Edge).
export async function hacherMotDePasse(motDePasse) {
  return bcrypt.hash(motDePasse, 10);
}

export async function verifierMotDePasse(motDePasse, hash) {
  return bcrypt.compare(motDePasse, hash);
}

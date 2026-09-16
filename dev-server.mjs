// Serveur de développement LOCAL uniquement -- reproduit le comportement de
// Vercel (fichiers statiques + /api/*.js + middleware.js) sans dépendre de
// `vercel dev` (qui exige une connexion au compte Vercel). Jamais déployé :
// en production, c'est Vercel lui-même qui joue ce rôle.
import { readFileSync, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RACINE = path.dirname(fileURLToPath(import.meta.url));

function chargerEnvLocal() {
  const p = path.join(RACINE, ".env.local");
  if (!existsSync(p)) return;
  for (const ligne of readFileSync(p, "utf8").split("\n")) {
    const m = ligne.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}
chargerEnvLocal();

const TYPES_MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };

async function corpsJSON(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

// Adapte un module .../api/**.js (style Vercel Node : (req,res)) pour tourner ici.
async function executerFonctionApi(cheminFichier, req, res, urlObj) {
  const module = await import(pathToFileURL(cheminFichier).href + "?t=" + Date.now());
  req.query = Object.fromEntries(urlObj.searchParams.entries());
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    req.body = await corpsJSON(req);
  }
  const resAdapte = res;
  resAdapte.status = (code) => {
    res.statusCode = code;
    return resAdapte;
  };
  resAdapte.json = (obj) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(obj));
  };
  await module.default(req, resAdapte);
}

async function verifierSessionRequete(req) {
  const { verifierSession, nomCookie } = await import(pathToFileURL(path.join(RACINE, "lib/auth.js")).href);
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${nomCookie()}=([^;]+)`));
  if (!match) return null;
  return verifierSession(decodeURIComponent(match[1]));
}

const serveur = createServer(async (req, res) => {
  const urlObj = new URL(req.url, "http://localhost");
  const pathname = urlObj.pathname;

  // ---- Routes API ----
  if (pathname.startsWith("/api/")) {
    const cheminFichier = path.join(RACINE, pathname + ".js");
    if (existsSync(cheminFichier)) {
      try {
        await executerFonctionApi(cheminFichier, req, res, urlObj);
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ ok: false, erreur: "Erreur serveur." }));
      }
      return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ ok: false, erreur: "Route inconnue." }));
    return;
  }

  // ---- Middleware (protège /gestion et /suivi, sauf la page de connexion) ----
  if (pathname.startsWith("/gestion") || pathname.startsWith("/suivi")) {
    if (!(pathname === "/gestion/login" || pathname === "/gestion/login.html")) {
      const session = await verifierSessionRequete(req);
      if (!session) {
        res.statusCode = 302;
        res.setHeader("Location", "/gestion/login?suite=" + encodeURIComponent(pathname));
        res.end();
        return;
      }
    }
  }

  // ---- Fichiers statiques ----
  let chemin = path.join(RACINE, pathname === "/" ? "index.html" : pathname);
  if (existsSync(chemin) && statSync(chemin).isDirectory()) chemin = path.join(chemin, "index.html");
  if (!existsSync(chemin) && existsSync(chemin + ".html")) chemin = chemin + ".html";
  if (!existsSync(chemin)) {
    res.statusCode = 404;
    res.end("Not found: " + pathname);
    return;
  }
  const ext = path.extname(chemin);
  res.setHeader("Content-Type", TYPES_MIME[ext] || "application/octet-stream");
  res.end(readFileSync(chemin));
});

const PORT = process.env.PORT || 4200;
serveur.listen(PORT, () => console.log(`Dev local (imite Vercel) sur http://localhost:${PORT}`));

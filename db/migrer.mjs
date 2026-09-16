// Applique db/schema.sql sur la base pointée par DATABASE_URL (.env.local).
// Idempotent (IF NOT EXISTS partout) — sans danger à relancer.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function chargerEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  let contenu;
  try {
    contenu = readFileSync(envPath, "utf8");
  } catch {
    console.error(".env.local introuvable à la racine de evotex-commercial. Crée-le avec une ligne DATABASE_URL=...");
    process.exit(1);
  }
  for (const ligne of contenu.split("\n")) {
    const m = ligne.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

async function main() {
  chargerEnvLocal();
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL manquant dans .env.local");
    process.exit(1);
  }
  const sql = neon(process.env.DATABASE_URL);
  const script = readFileSync(path.join(__dirname, "schema.sql"), "utf8");

  // @neondatabase/serverless (fonction sql``) n'exécute qu'une instruction à
  // la fois pour ce driver HTTP -- on découpe sur les ";" de fin de ligne.
  const instructions = script
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  for (const instruction of instructions) {
    await sql(instruction);
    console.log("OK:", instruction.split("\n")[0].slice(0, 70));
  }
  console.log(`Migration terminée (${instructions.length} instructions).`);
}

main().catch((err) => {
  console.error("Échec de la migration:", err);
  process.exit(1);
});

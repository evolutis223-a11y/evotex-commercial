// Amorçage -- crée le tout premier compte Direction + la première négociation.
// À lancer une seule fois, après db:migrer. Lit .env.local :
//   DIRECTION_NOM, DIRECTION_EMAIL, DIRECTION_MOT_DE_PASSE
//   NEGOCIATION_NOM (optionnel, défaut "BATEX-CI — EVOTEX V1")
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function chargerEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const contenu = readFileSync(envPath, "utf8");
  for (const ligne of contenu.split("\n")) {
    const m = ligne.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

async function main() {
  chargerEnvLocal();
  const { DATABASE_URL, DIRECTION_NOM, DIRECTION_EMAIL, DIRECTION_MOT_DE_PASSE } = process.env;
  if (!DATABASE_URL) throw new Error("DATABASE_URL manquant dans .env.local");
  if (!DIRECTION_NOM || !DIRECTION_EMAIL || !DIRECTION_MOT_DE_PASSE) {
    throw new Error("Ajoute dans .env.local : DIRECTION_NOM, DIRECTION_EMAIL, DIRECTION_MOT_DE_PASSE");
  }
  const nomNegociation = process.env.NEGOCIATION_NOM || "BATEX-CI — EVOTEX V1";

  const sql = neon(DATABASE_URL);
  const email = DIRECTION_EMAIL.trim().toLowerCase();
  const hash = await bcrypt.hash(DIRECTION_MOT_DE_PASSE, 10);

  const existants = await sql`select id from utilisateurs where email = ${email} limit 1`;
  let utilisateurId;
  if (existants[0]) {
    utilisateurId = existants[0].id;
    console.log("Compte Direction déjà existant, réutilisé:", email);
  } else {
    const inseres = await sql`insert into utilisateurs (nom, email, mot_de_passe_hash) values (${DIRECTION_NOM}, ${email}, ${hash}) returning id`;
    utilisateurId = inseres[0].id;
    console.log("Compte Direction créé:", email);
  }

  const negExistantes = await sql`select id from negociations where nom = ${nomNegociation} limit 1`;
  let negociationId;
  if (negExistantes[0]) {
    negociationId = negExistantes[0].id;
    console.log("Négociation déjà existante, réutilisée:", nomNegociation);
  } else {
    const negInserees = await sql`insert into negociations (nom) values (${nomNegociation}) returning id`;
    negociationId = negInserees[0].id;
    console.log("Négociation créée:", nomNegociation);
  }

  await sql`
    insert into membres_negociation (negociation_id, utilisateur_id, role)
    values (${negociationId}, ${utilisateurId}, 'direction')
    on conflict (negociation_id, utilisateur_id) do update set role = 'direction', actif = true
  `;

  console.log(`\nAmorçage terminé. Connecte-toi sur /gestion/login avec ${email}.`);
}

main().catch((err) => {
  console.error("Échec de l'amorçage:", err);
  process.exit(1);
});

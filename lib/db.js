// Client Neon partagé -- base dédiée à evotex-commercial, jamais celle de l'ERP.
import { neon } from "@neondatabase/serverless";

let client = null;

export function sql() {
  if (!client) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL manquant (variable d'environnement).");
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

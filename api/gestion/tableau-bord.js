// GET -- vue agrégée réservée à la Direction : toutes ses négociations
// (équipes, tickets) réunies pour le Tableau de Bord, plutôt que de faire
// boucler le client sur /api/gestion/negociation une fois par dossier.
//
// Corrigé le 14/09/2026 (audit du Tableau de Bord) : la version précédente
// bouclait en séquence sur chaque négociation (2 requêtes SQL par dossier,
// l'une après l'autre) -- tolérable pour un appel isolé, mais cet endpoint
// est aussi devenu la source du mur de rôles, interrogé automatiquement
// toutes les 45s sur TOUTES les pages tant que Direction est connectée (voir
// rafraichirMurRoles, gestion/index.html). Le coût grandissait donc avec le
// nombre de négociations ET tournait en continu. Remplacé par 2 requêtes
// groupées (négociations, puis membres) au lieu de 2×N séquentielles --
// même forme de résultat, même filtre "membres actifs uniquement".
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { appartenancesDe } from "../../lib/negociations.js";
import { sql } from "../../lib/db.js";

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (!session) {
    res.status(401).json({ ok: false, erreur: "Non connecté." });
    return;
  }

  const appartenances = await appartenancesDe(session.utilisateurId);
  if (!appartenances.some((a) => a.role === "direction")) {
    res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
    return;
  }

  const negociationIds = appartenances.map((a) => a.negociation_id);
  if (negociationIds.length === 0) {
    res.status(200).json({ ok: true, equipes: [] });
    return;
  }

  const [infos, tousMembres] = await Promise.all([
    sql()`
      select id, nom, statut_libelle, etape, ticket_ouvert_le, ticket_expire_le
      from negociations where id = any(${negociationIds})
    `,
    sql()`
      select m.negociation_id, u.id as utilisateur_id, u.nom, u.email, u.dernier_vu, u.photo_url,
        m.role, m.actif, m.titre_autre, ni.jeton as invitation_jeton, ni.expire_le as invitation_expire_le
      from membres_negociation m
      join utilisateurs u on u.id = m.utilisateur_id
      left join negociation_invitations ni on ni.negociation_id = m.negociation_id and ni.utilisateur_id = m.utilisateur_id
      where m.negociation_id = any(${negociationIds}) and m.actif = true
      order by m.ajoute_le asc
    `,
  ]);

  const membresParNego = new Map();
  for (const m of tousMembres) {
    const liste = membresParNego.get(m.negociation_id) || [];
    liste.push(m);
    membresParNego.set(m.negociation_id, liste);
  }

  const equipes = infos.map((info) => ({ ...info, membres: membresParNego.get(info.id) || [] }));

  res.status(200).json({ ok: true, equipes });
}

// GET -- journal de connexions (Direction uniquement). Scopé aux utilisateurs
// qui partagent au moins une négociation où le demandeur est Direction --
// jamais un journal global non filtré si le système grandit demain.
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import { sql } from "../../lib/db.js";

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (!session) {
    res.status(401).json({ ok: false, erreur: "Non connecté." });
    return;
  }

  const estDirection = await sql()`
    select 1 from membres_negociation where utilisateur_id = ${session.utilisateurId} and role = 'direction' and actif = true limit 1
  `;
  if (!estDirection[0]) {
    res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
    return;
  }

  const lignes = await sql()`
    select c.connecte_le, c.user_agent, u.nom, u.email
    from connexions_log c
    join utilisateurs u on u.id = c.utilisateur_id
    where c.utilisateur_id in (
      select distinct m2.utilisateur_id
      from membres_negociation m1
      join membres_negociation m2 on m2.negociation_id = m1.negociation_id
      where m1.utilisateur_id = ${session.utilisateurId} and m1.role = 'direction'
    )
    order by c.connecte_le desc
    limit 200
  `;

  // Consultations réelles de documents par les clients -- distinct d'une
  // simple connexion (retour du 14/09/2026). Jamais affiché au client.
  const consultations = await sql()`
    select dv.vu_le, dv.libelle, u.nom, u.email, n.nom as negociation_nom
    from document_vu_log dv
    join utilisateurs u on u.id = dv.utilisateur_id
    join negociations n on n.id = dv.negociation_id
    where dv.negociation_id in (
      select distinct m1.negociation_id
      from membres_negociation m1
      where m1.utilisateur_id = ${session.utilisateurId} and m1.role = 'direction'
    )
    order by dv.vu_le desc
    limit 200
  `;
  // "Illusion de suppression" (retour du 14/09/2026) -- un message supprimé
  // par son auteur ne renvoie plus rien via les fonctions normales
  // (messagesDeLaNegociation/messagesClientDeLaNegociation), mais reste
  // récupérable "par besoin", ici, avec l'identité exacte de qui a supprimé
  // et quand. contenu_audio_url pointe vers message-audio.js avec
  // telecharger=1 -- seule la Direction peut l'ouvrir (vérifié là-bas aussi).
  const [messagesSupprimesInternes, messagesSupprimesClient] = await Promise.all([
    sql()`
      select msg.id, 'interne' as canal, msg.texte, msg.audio_type_mime is not null as est_vocal,
        msg.audio_duree_secondes, msg.cree_le, msg.supprime_le, u.nom as auteur_nom, n.nom as negociation_nom
      from messages msg
      join utilisateurs u on u.id = msg.auteur_id
      join negociations n on n.id = msg.negociation_id
      where msg.supprime_le is not null and msg.negociation_id in (
        select distinct m1.negociation_id from membres_negociation m1
        where m1.utilisateur_id = ${session.utilisateurId} and m1.role = 'direction'
      )
      order by msg.supprime_le desc
      limit 200
    `,
    sql()`
      select msg.id, 'client' as canal, msg.texte, msg.audio_type_mime is not null as est_vocal,
        msg.audio_duree_secondes, msg.cree_le, msg.supprime_le, u.nom as auteur_nom, n.nom as negociation_nom
      from messages_client msg
      join utilisateurs u on u.id = msg.auteur_id
      join negociations n on n.id = msg.negociation_id
      where msg.supprime_le is not null and msg.negociation_id in (
        select distinct m1.negociation_id from membres_negociation m1
        where m1.utilisateur_id = ${session.utilisateurId} and m1.role = 'direction'
      )
      order by msg.supprime_le desc
      limit 200
    `,
  ]);
  const messagesSupprimes = [...messagesSupprimesInternes, ...messagesSupprimesClient]
    .sort((a, b) => new Date(b.supprime_le) - new Date(a.supprime_le));

  res.status(200).json({ ok: true, connexions: lignes, consultations, messagesSupprimes });
}

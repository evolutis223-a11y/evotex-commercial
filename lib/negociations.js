// Requêtes partagées -- Espace Gestion du Projet & Négociations.
import { randomBytes } from "node:crypto";
import { sql } from "./db.js";

export async function utilisateurParEmail(email) {
  const rows = await sql()`select id, nom, email, mot_de_passe_hash from utilisateurs where email = ${email} limit 1`;
  return rows[0] || null;
}

// Connexion par identifiant OU email (retour du 17/09/2026 -- "l'email est
// parfois très compliqué à saisir... l'identifiant est bien plus rapide").
// valeur déjà normalisée (trim + minuscules) par l'appelant, comme l'email
// l'était déjà. L'identifiant reste facultatif : un compte qui n'en a pas
// encore ne peut être trouvé que par son email, comme avant.
export async function utilisateurParIdentifiantOuEmail(valeur) {
  const rows = await sql()`
    select id, nom, email, mot_de_passe_hash from utilisateurs
    where email = ${valeur} or identifiant = ${valeur}
    limit 1
  `;
  return rows[0] || null;
}

// Réservé à la Direction (ajouter_membre ou définir_identifiant). Renvoie
// false sur un identifiant déjà pris (contrainte unique) plutôt que de
// laisser remonter l'erreur SQL brute à l'appelant.
export async function definirIdentifiant(utilisateurId, identifiant) {
  try {
    await sql()`update utilisateurs set identifiant = ${identifiant} where id = ${utilisateurId}`;
    return true;
  } catch (err) {
    if (err?.code === "23505") return false;
    throw err;
  }
}

export async function utilisateurParId(id) {
  const rows = await sql()`select id, nom, email from utilisateurs where id = ${id} limit 1`;
  return rows[0] || null;
}

function genererJetonSession() {
  return randomBytes(24).toString("base64url");
}

// Pose une nouvelle session active pour ce compte -- utilisé par login.js et
// rejoindre.js, jamais appelé si une session est déjà active ailleurs (voir
// sessionDejaActive, à vérifier par l'appelant avant celle-ci).
export async function ouvrirSessionUtilisateur(utilisateurId, dureeSecondes) {
  const jeton = genererJetonSession();
  await sql()`
    update utilisateurs
    set session_jeton = ${jeton}, session_expire_le = now() + make_interval(secs => ${dureeSecondes})
    where id = ${utilisateurId}
  `;
  return jeton;
}

// true si CE compte a déjà une session active (non expirée) -- vérifié au
// login (mot de passe ou lien d'accès) avant d'en ouvrir une nouvelle.
//
// Exige EN PLUS un signal de présence récent (dernier_vu il y a moins de 2
// minutes), pas seulement un cookie pas encore expiré (retour du
// 17/09/2026 -- blocage répété constaté en usage réel : fermer un onglet
// sans cliquer "Déconnexion" laissait le compte marqué actif jusqu'à 14
// jours, bloquant même son propre titulaire, sans que la Direction puisse
// s'auto-débloquer). Une session réellement ouverte envoie un ping toutes
// les ~45s (ping.js) -- 2 minutes sans ping veut dire l'onglet est fermé,
// et une nouvelle connexion peut reprendre la main automatiquement.
// Vérification volontairement absente de jetonSessionValide (la validité
// d'une session DÉJÀ ouverte, sur chaque appel API) : y ajouter la même
// règle couperait à tort un onglet resté simplement en arrière-plan.
export async function sessionDejaActive(utilisateurId) {
  // Verrou desactive a la demande explicite du 17/09/2026 -- "cette
  // securite qui empeche de se connecter a deux endroits differents"
  // bloquait trop souvent en pratique (comptes de test, tests repetes),
  // au detriment de la stabilite ressentie de l'application. La logique
  // ci-dessous reste intacte et prete a etre reactivee (il suffira de
  // retirer ce "return false" anticipe) -- "plus tard, nous verrons
  // comment remettre ca".
  return false;
  const rows = await sql()`
    select 1 from utilisateurs
    where id = ${utilisateurId} and session_expire_le is not null and session_expire_le > now()
      and dernier_vu is not null and dernier_vu > now() - interval '2 minutes'
    limit 1
  `;
  return rows.length > 0;
}

// Coupure de la session active -- déconnexion volontaire (logout.js),
// déconnexion forcée par la Direction, ou réinitialisation de mot de passe
// (qui invalide toute session ouverte avec l'ancien mot de passe).
export async function fermerSessionUtilisateur(utilisateurId) {
  await sql()`update utilisateurs set session_jeton = null, session_expire_le = null where id = ${utilisateurId}`;
}

// Vérifie que le jeton du cookie signé correspond bien à la session active en
// base -- un cookie cryptographiquement valide ne suffit plus une fois cette
// vérification en place (voir lib/session-serveur.js).
export async function jetonSessionValide(utilisateurId, jeton) {
  if (!jeton) return false;
  const rows = await sql()`
    select 1 from utilisateurs
    where id = ${utilisateurId} and session_jeton = ${jeton}
      and session_expire_le is not null and session_expire_le > now()
    limit 1
  `;
  return rows.length > 0;
}

// Toutes les négociations actives d'un utilisateur, avec son rôle dans chacune.
export async function appartenancesDe(utilisateurId) {
  return sql()`
    select n.id as negociation_id, n.nom, n.statut_libelle, m.role
    from membres_negociation m
    join negociations n on n.id = m.negociation_id
    where m.utilisateur_id = ${utilisateurId} and m.actif = true
    order by n.cree_le desc
  `;
}

export async function membreDe(negociationId, utilisateurId) {
  const rows = await sql()`
    select role, actif, dossier_partage_vu_le from membres_negociation
    where negociation_id = ${negociationId} and utilisateur_id = ${utilisateurId}
    limit 1
  `;
  return rows[0] || null;
}

// Identité de Support (rôle "direction") dans une négociation -- pour
// colorer ses messages/vocaux distinctement, PARTOUT et pour TOUT LE MONDE
// (retour du 14/09/2026 : "quand le support s'exprime... on sait que cela
// vient du support"), y compris côté client qui ne reçoit jamais la liste
// complète des membres (vie privée de l'équipe).
export async function idDirectionDeLaNegociation(negociationId) {
  const rows = await sql()`select utilisateur_id from membres_negociation where negociation_id = ${negociationId} and role = 'direction' and actif = true limit 1`;
  return rows[0]?.utilisateur_id || null;
}

export async function membresDeLaNegociation(negociationId) {
  return sql()`
    select u.id as utilisateur_id, u.nom, u.email, u.identifiant, u.dernier_vu, u.photo_url, m.role, m.actif, m.titre_autre,
      ni.jeton as invitation_jeton, ni.expire_le as invitation_expire_le
    from membres_negociation m
    join utilisateurs u on u.id = m.utilisateur_id
    left join negociation_invitations ni on ni.negociation_id = m.negociation_id and ni.utilisateur_id = m.utilisateur_id
    where m.negociation_id = ${negociationId}
    order by m.ajoute_le asc
  `;
}

export async function marquerVu(utilisateurId) {
  await sql()`update utilisateurs set dernier_vu = now() where id = ${utilisateurId}`;
}

// Un message "supprimé" (illusion, retour du 14/09/2026) ne renvoie plus ni
// texte ni audio ici, à personne -- même pas à la Direction, qui doit aller
// le rechercher "par besoin" dans la Boîte noire (api/gestion/boite-noire.js)
// plutôt que le voir traîner dans le fil normal. La ligne, elle, reste en
// base intacte -- rien n'est jamais réellement supprimé.
export async function messagesDeLaNegociation(negociationId) {
  return sql()`
    select msg.id, msg.auteur_id, u.nom as auteur_nom, msg.cree_le,
      case when msg.supprime_le is null then msg.texte else null end as texte,
      (msg.supprime_le is not null) as supprime,
      (msg.supprime_le is null and msg.audio_base64 is not null) as est_vocal,
      case when msg.supprime_le is null then msg.audio_duree_secondes else null end as audio_duree_secondes
    from messages msg
    join utilisateurs u on u.id = msg.auteur_id
    where msg.negociation_id = ${negociationId}
    order by msg.cree_le asc
  `;
}

export async function posterMessageVocal(negociationId, auteurId, { audioBase64, typeMime, dureeSecondes }) {
  await sql()`
    insert into messages (negociation_id, auteur_id, texte, audio_base64, audio_type_mime, audio_duree_secondes)
    values (${negociationId}, ${auteurId}, '', ${audioBase64}, ${typeMime}, ${dureeSecondes})
  `;
}

// "Illusion de suppression" -- chacun supprime ses propres messages ; Support
// (estModerateur) peut en plus supprimer ceux des autres, comme un
// modérateur retirant "un message mal placé qui met tout le monde mal à
// l'aise" (retour du 14/09/2026) -- imposé ici même dans le WHERE, pas
// seulement contrôlé côté API. supprime_par_id distingue les deux cas pour
// la Boîte noire.
//
// Idempotent depuis le 17/09/2026 -- retour terrain : un double-clic (ou
// le bouton recliqué avant que l'écran n'ait eu le temps de refléter le
// premier essai) retombait sur "supprime_le is null" déjà faux, renvoyait
// false, et l'API répondait "Vous ne pouvez supprimer que vos propres
// messages" -- un message d'erreur trompeur puisque le message était déjà
// bel et bien supprimé. coalesce() ne modifie plus la date/l'auteur d'une
// suppression déjà posée (la Boîte noire garde la vraie première fois) ;
// seul un id inexistant ou hors droits renvoie encore false.
export async function supprimerMessage(id, utilisateurId, estModerateur) {
  const rows = estModerateur
    ? await sql()`update messages set supprime_le = coalesce(supprime_le, now()), supprime_par_id = coalesce(supprime_par_id, ${utilisateurId}) where id = ${id} returning id`
    : await sql()`update messages set supprime_le = coalesce(supprime_le, now()), supprime_par_id = coalesce(supprime_par_id, ${utilisateurId}) where id = ${id} and auteur_id = ${utilisateurId} returning id`;
  return rows.length > 0;
}

export async function supprimerMessageClient(id, utilisateurId, estModerateur) {
  const rows = estModerateur
    ? await sql()`update messages_client set supprime_le = coalesce(supprime_le, now()), supprime_par_id = coalesce(supprime_par_id, ${utilisateurId}) where id = ${id} returning id`
    : await sql()`update messages_client set supprime_le = coalesce(supprime_le, now()), supprime_par_id = coalesce(supprime_par_id, ${utilisateurId}) where id = ${id} and auteur_id = ${utilisateurId} returning id`;
  return rows.length > 0;
}

// Pour /api/gestion/message-audio -- inclut supprime_le pour refuser de
// resservir l'audio d'un message "supprimé" à qui que ce soit hors Direction.
export async function messageParId(id) {
  const rows = await sql()`select id, negociation_id, auteur_id, audio_base64, audio_type_mime, supprime_le from messages where id = ${id} limit 1`;
  return rows[0] || null;
}

export async function liensClientDeLaNegociation(negociationId) {
  return sql()`
    select libelle, url from negociation_liens_client
    where negociation_id = ${negociationId}
    order by ordre asc
  `;
}

// Dossier partagé -- métadonnées seulement (jamais contenu_base64 ici, pour
// garder léger le détail de négociation chargé à chaque sondage) ; le
// contenu se récupère à part, par fichier, via /api/gestion/fichier.
export async function fichiersPartagesDeLaNegociation(negociationId) {
  return sql()`
    select f.id, f.nom_fichier, f.type_mime, f.taille_octets, f.envoye_par_id, f.envoye_par_role, f.envoye_le, f.masque_pour_client, u.nom as envoye_par_nom
    from negociation_fichiers_partages f
    join utilisateurs u on u.id = f.envoye_par_id
    where f.negociation_id = ${negociationId}
    order by f.envoye_le desc
  `;
}

export async function fichierPartageParId(id) {
  const rows = await sql()`select * from negociation_fichiers_partages where id = ${id} limit 1`;
  return rows[0] || null;
}

export async function deposerFichierPartage({ negociationId, nomFichier, typeMime, tailleOctets, contenuBase64, envoyeParId, envoyeParRole }) {
  const rows = await sql()`
    insert into negociation_fichiers_partages (negociation_id, nom_fichier, type_mime, taille_octets, contenu_base64, envoye_par_id, envoye_par_role)
    values (${negociationId}, ${nomFichier}, ${typeMime}, ${tailleOctets}, ${contenuBase64}, ${envoyeParId}, ${envoyeParRole})
    returning id
  `;
  return rows[0].id;
}

// Direction : suppression réelle, pour tout fichier (le sien ou celui du
// client) -- "on peut les supprimer, il ne le sentira pas" (retour du
// 14/09/2026). Distinct du retrait côté client, qui ne fait que masquer.
export async function supprimerFichierPartage(id) {
  await sql()`delete from negociation_fichiers_partages where id = ${id}`;
}

// Client : retire un fichier QU'IL a envoyé, mais seulement de sa propre
// vue -- reste au dossier côté Direction/Négociateur.
export async function masquerFichierPartagePourClient(id) {
  await sql()`update negociation_fichiers_partages set masque_pour_client = true where id = ${id}`;
}

export async function marquerDossierPartageVu(negociationId, utilisateurId) {
  await sql()`update membres_negociation set dossier_partage_vu_le = now() where negociation_id = ${negociationId} and utilisateur_id = ${utilisateurId}`;
}

// "Lu", fichier par fichier, par personne -- ouvrir le dossier montre la
// liste (dossier_partage_vu_le, ci-dessus), mais chaque fichier reste
// signalé tant qu'il n'a pas été cliqué individuellement (retour du
// 14/09/2026). idempotent : cliquer deux fois sur le même fichier ne fait
// rien de plus la deuxième fois.
export async function marquerFichierLu(fichierId, utilisateurId) {
  await sql()`insert into fichier_partage_lu (fichier_id, utilisateur_id) values (${fichierId}, ${utilisateurId}) on conflict (fichier_id, utilisateur_id) do nothing`;
}

export async function fichiersLusParUtilisateur(negociationId, utilisateurId) {
  const rows = await sql()`
    select fl.fichier_id
    from fichier_partage_lu fl
    join negociation_fichiers_partages f on f.id = fl.fichier_id
    where f.negociation_id = ${negociationId} and fl.utilisateur_id = ${utilisateurId}
  `;
  return new Set(rows.map((r) => String(r.fichier_id)));
}

// Engagement du CLIENT sur le dossier d'échange, pour l'affichage côté
// équipe seulement -- "vu" = le client a rouvert la liste au moins une fois
// depuis que CE fichier y figure (dossier_partage_vu_le >= envoye_le du
// fichier) ; "lu" = le client a cliqué ce fichier précis (première fois,
// fichier_partage_lu). Retour du 14/09/2026 : "le négociateur [doit] savoir
// si le fichier a été vu et quand il a été lu". Jamais montré au client.
export async function engagementClientSurFichiers(negociationId) {
  const [vuRows, luRows] = await Promise.all([
    sql()`
      select max(dossier_partage_vu_le) as vu_le
      from membres_negociation
      where negociation_id = ${negociationId} and role = 'client'
    `,
    sql()`
      select fl.fichier_id, min(fl.lu_le) as lu_le
      from fichier_partage_lu fl
      join negociation_fichiers_partages f on f.id = fl.fichier_id
      join membres_negociation m on m.utilisateur_id = fl.utilisateur_id and m.negociation_id = f.negociation_id
      where f.negociation_id = ${negociationId} and m.role = 'client'
      group by fl.fichier_id
    `,
  ]);
  const luParFichier = {};
  for (const r of luRows) luParFichier[String(r.fichier_id)] = r.lu_le;
  return { vuLeClient: vuRows[0]?.vu_le || null, luParFichier };
}

// "Vu" réel d'un document "Mes Documents" par le client -- distinct d'une
// simple connexion (retour du 14/09/2026 : "vu, ça veut dire vu réellement,
// il l'a ouvert"). Jamais affiché au client, seulement dans la Boîte noire.
export async function enregistrerDocumentVu(negociationId, utilisateurId, libelle) {
  await sql()`insert into document_vu_log (negociation_id, utilisateur_id, libelle) values (${negociationId}, ${utilisateurId}, ${libelle})`;
}

export async function enregistrerConnexion(utilisateurId, userAgent) {
  await sql()`insert into connexions_log (utilisateur_id, user_agent) values (${utilisateurId}, ${userAgent || null})`;
}

// Bloc-notes -- chacun ne voit que la sienne, sauf Direction qui voit celles
// de tous les membres de la négociation (cf. schema.sql).
export async function noteDe(negociationId, utilisateurId) {
  const rows = await sql()`
    select texte, maj_le from notes_negociation
    where negociation_id = ${negociationId} and auteur_id = ${utilisateurId}
    limit 1
  `;
  return rows[0] || null;
}

export async function toutesLesNotes(negociationId) {
  return sql()`
    select n.texte, n.maj_le, u.id as auteur_id, u.nom as auteur_nom
    from notes_negociation n
    join utilisateurs u on u.id = n.auteur_id
    where n.negociation_id = ${negociationId}
    order by n.maj_le desc
  `;
}

export async function enregistrerNote(negociationId, utilisateurId, texte) {
  await sql()`
    insert into notes_negociation (negociation_id, auteur_id, texte, maj_le)
    values (${negociationId}, ${utilisateurId}, ${texte}, now())
    on conflict (negociation_id, auteur_id) do update set texte = excluded.texte, maj_le = now()
  `;
}

// Tchat direct négociateur <-> client -- distinct des Échanges internes.
export async function messagesClientDeLaNegociation(negociationId) {
  return sql()`
    select msg.id, msg.auteur_id, u.nom as auteur_nom, msg.cree_le,
      case when msg.supprime_le is null then msg.texte else null end as texte,
      (msg.supprime_le is not null) as supprime,
      (msg.supprime_le is null and msg.audio_base64 is not null) as est_vocal,
      case when msg.supprime_le is null then msg.audio_duree_secondes else null end as audio_duree_secondes
    from messages_client msg
    join utilisateurs u on u.id = msg.auteur_id
    where msg.negociation_id = ${negociationId}
    order by msg.cree_le asc
  `;
}

export async function posterMessageClient(negociationId, auteurId, texte) {
  await sql()`insert into messages_client (negociation_id, auteur_id, texte) values (${negociationId}, ${auteurId}, ${texte})`;
}

export async function posterMessageClientVocal(negociationId, auteurId, { audioBase64, typeMime, dureeSecondes }) {
  await sql()`
    insert into messages_client (negociation_id, auteur_id, texte, audio_base64, audio_type_mime, audio_duree_secondes)
    values (${negociationId}, ${auteurId}, '', ${audioBase64}, ${typeMime}, ${dureeSecondes})
  `;
}

// Pour /api/gestion/message-audio -- symétrique de messageParId.
export async function messageClientParId(id) {
  const rows = await sql()`select id, negociation_id, auteur_id, audio_base64, audio_type_mime, supprime_le from messages_client where id = ${id} limit 1`;
  return rows[0] || null;
}

// Ticket -- fenêtre de temps posée par Direction pour pousser à l'efficacité
// (retour du 14/09/2026). Verrouillée = expirée et pas encore à l'étape de
// clôture (6). Direction seule peut ouvrir/réactiver.
export function ticketVerrouille(negociation) {
  if (!negociation.ticket_expire_le) return false;
  if (negociation.etape >= 6) return false;
  return new Date(negociation.ticket_expire_le).getTime() < Date.now();
}

// Révélation des intitulés d'étape au client -- retour du 16/09/2026,
// jamais activé par défaut (voir schema.sql pour le détail complet).
export async function basculerLibellesClient(negociationId, visible) {
  await sql()`update negociations set etape_libelles_visibles_client = ${visible} where id = ${negociationId}`;
}

export async function ouvrirTicket(negociationId, dureeHeures) {
  // make_interval(hours => ...) exige un entier -- une durée libre en
  // jour/heure/minute (retour du 16/09/2026) est fractionnaire (ex. 2h30 =
  // 2.5h), d'où le passage par des secondes (secs accepte un flottant).
  const dureeSecondes = Math.round(dureeHeures * 3600);
  await sql()`
    update negociations
    set ticket_ouvert_le = now(), ticket_expire_le = now() + make_interval(secs => ${dureeSecondes})
    where id = ${negociationId}
  `;
}

// Coupure immédiate du ticket -- distincte d'une réduction de durée (retour
// du 16/09/2026).
export async function couperTicket(negociationId) {
  await sql()`update negociations set ticket_expire_le = now() where id = ${negociationId}`;
}

// La Direction peut mener ses propres négociations sans négociateur (retour
// du 16/09/2026) -- elle devient membre "direction" de la négociation
// qu'elle crée, rôle qui a déjà tous les droits nécessaires.
export async function creerNegociation(nom, createurId) {
  const rows = await sql()`insert into negociations (nom, statut_libelle, etape) values (${nom}, 'Premier contact', 1) returning id`;
  const negociationId = rows[0].id;
  await sql()`
    insert into membres_negociation (negociation_id, utilisateur_id, role)
    values (${negociationId}, ${createurId}, 'direction')
  `;
  return negociationId;
}

// Suppression définitive -- toutes les tables dépendantes (membres,
// messages, notes, tchat client, liens client, invitations) déclarent
// "on delete cascade" dans schema.sql, une seule suppression suffit.
export async function supprimerNegociation(negociationId) {
  await sql()`delete from negociations where id = ${negociationId}`;
}

function genererJetonInvitation() {
  return randomBytes(24).toString("base64url");
}

export function invitationValide(invitation) {
  if (!invitation || !invitation.jeton) return false;
  if (!invitation.expire_le) return true;
  return new Date(invitation.expire_le).getTime() > Date.now();
}

// Génère (première fois) ou renouvelle (retour du 16/09/2026 : "pas besoin
// de renvoyer un nouveau lien quand on veut renouveler") le lien d'accès
// d'un membre -- le jeton ne bouge jamais une fois créé, seule l'échéance
// est mise à jour. dureeHeures à 0/falsy => lien permanent (expire_le nul).
export async function genererOuRenouvelerInvitation(negociationId, utilisateurId, dureeHeures) {
  const existante = await sql()`
    select jeton from negociation_invitations
    where negociation_id = ${negociationId} and utilisateur_id = ${utilisateurId} limit 1
  `;
  const jeton = existante[0]?.jeton || genererJetonInvitation();
  const rows = dureeHeures
    ? await sql()`
        insert into negociation_invitations (negociation_id, utilisateur_id, jeton, expire_le)
        values (${negociationId}, ${utilisateurId}, ${jeton}, now() + make_interval(secs => ${Math.round(dureeHeures * 3600)}))
        on conflict (negociation_id, utilisateur_id) do update set expire_le = excluded.expire_le
        returning jeton, expire_le
      `
    : await sql()`
        insert into negociation_invitations (negociation_id, utilisateur_id, jeton, expire_le)
        values (${negociationId}, ${utilisateurId}, ${jeton}, null)
        on conflict (negociation_id, utilisateur_id) do update set expire_le = null
        returning jeton, expire_le
      `;
  return rows[0];
}

// Coupure immédiate (distincte d'un lien qui expire naturellement) --
// symétrique de couperTicket ci-dessus.
export async function couperInvitation(negociationId, utilisateurId) {
  const rows = await sql()`
    update negociation_invitations set expire_le = now()
    where negociation_id = ${negociationId} and utilisateur_id = ${utilisateurId}
    returning expire_le
  `;
  return rows[0]?.expire_le || null;
}

// Utilisé par /api/gestion/rejoindre.js -- pas de session au moment de
// l'appel, c'est justement ce lien qui va en poser une.
export async function invitationParJeton(jeton) {
  const rows = await sql()`
    select ni.negociation_id, ni.utilisateur_id, ni.jeton, ni.expire_le
    from negociation_invitations ni
    where ni.jeton = ${jeton}
    limit 1
  `;
  return rows[0] || null;
}

// GET  ?id=<négociation>[&voirComme=<utilisateurId>]  -- détail scopé au rôle
// POST { negociationId, action, ... }                 -- actions (message, membres)
import { sessionDepuisRequete } from "../../lib/session-serveur.js";
import {
  appartenancesDe,
  creerNegociation,
  supprimerNegociation,
  membreDe,
  membresDeLaNegociation,
  idDirectionDeLaNegociation,
  messagesDeLaNegociation,
  liensClientDeLaNegociation,
  noteDe,
  toutesLesNotes,
  enregistrerNote,
  messagesClientDeLaNegociation,
  posterMessageClient,
  posterMessageVocal,
  posterMessageClientVocal,
  supprimerMessage,
  supprimerMessageClient,
  ticketVerrouille,
  ouvrirTicket,
  couperTicket,
  genererOuRenouvelerInvitation,
  couperInvitation,
  basculerLibellesClient,
  fichiersPartagesDeLaNegociation,
  fichierPartageParId,
  deposerFichierPartage,
  supprimerFichierPartage,
  masquerFichierPartagePourClient,
  marquerDossierPartageVu,
  marquerFichierLu,
  fichiersLusParUtilisateur,
  engagementClientSurFichiers,
  enregistrerDocumentVu,
  fermerSessionUtilisateur,
  definirIdentifiant,
} from "../../lib/negociations.js";
import { sql } from "../../lib/db.js";
import { hacherMotDePasse } from "../../lib/auth.js";
import { ETAPES, TOUS_LES_OUTILS, libelleEtape } from "../../lib/etapes.js";

const ROLES_LECTURE_SEULE = new Set(["apporteur", "autre"]);
// Documents et images seulement dans le dossier d'échange -- jamais de
// vidéo (retour du 14/09/2026, tranché : "vérifiez PDF, JPEG, PNG... pas de
// vidéo"). Vérifié par extension (fiable, indépendant du type MIME envoyé
// par le navigateur) ; le typeMime lui-même est aussi refusé s'il annonce
// video/audio, en secours.
const EXTENSIONS_FICHIER_PARTAGE_AUTORISEES = new Set([
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv",
  "jpg", "jpeg", "png", "gif", "webp",
]);
// Messages vocaux (retour du 14/09/2026) -- ce que MediaRecorder produit
// nativement dans les navigateurs (webm/opus, parfois ogg/mp4 selon le
// navigateur). Circuit séparé de l'Échange de Fichiers -- jamais mélangé à
// la liste ci-dessus.
const TYPES_AUDIO_AUTORISES = ["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav"];
const TAILLE_MAX_VOCAL_OCTETS = 4 * 1024 * 1024;
const DUREE_MAX_VOCAL_SECONDES = 10 * 60;

// Messages de bienvenue automatiques (retour du 17/09/2026), postés une
// seule fois, à la toute première arrivée d'un membre dans une négociation.
const MESSAGE_BIENVENUE_CLIENT = "Bonjour et bienvenue ! Je suis votre interlocuteur EVOTEX pour ce projet. Vous retrouverez ici l'avancement de votre dossier, les documents que nous vous transmettons, et vous pouvez m'écrire directement à tout moment. Le Guide (icône en haut) répond aux questions les plus courantes sur votre espace.";
const MESSAGE_BIENVENUE_EQUIPE = "Bienvenue dans l'équipe de négociation ! Ce fil est réservé en interne, jamais visible du client -- utilisez-le pour échanger sur le dossier. Le Guide, dans le menu, détaille votre rôle et ce que vous pouvez faire.";

// Filtre de langage (retour du 14/09/2026) -- "qu'un message lui dise
// clairement que ces mots ne sont pas acceptés sur cette plateforme".
// Uniquement les messages texte (rien à filtrer sur un vocal). Comparaison
// sur le texte normalisé (minuscules, accents retirés) avec des limites de
// mot, pour éviter de bloquer un mot plus long qui contiendrait la racine
// par hasard (ex. "connaissance" ne doit pas matcher "con").
const MOTS_INTERDITS = [
  "merde", "putain", "connard", "connasse", "con", "conne", "salope", "salopard", "salaud",
  "encule", "enculee", "enfoire", "enfoiree", "batard", "batarde", "pute", "putes",
  "niquer", "nique", "foutre", "chiant", "chiante", "couillon", "abruti", "abrutie",
  "cretin", "cretine", "debile", "fdp", "ta gueule",
];
function normaliserTexte(texte) {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
function contientLangageInterdit(texte) {
  const normalise = normaliserTexte(texte);
  return MOTS_INTERDITS.some((mot) => new RegExp(`(^|[^a-z0-9])${mot}([^a-z0-9]|$)`, "i").test(normalise));
}
// Durée libre en heures (fractions acceptées pour les minutes, ex. 0.25 =
// 15 min) -- retour du 16/09/2026 : "champ libre jr h minute", fini les 4
// durées fixes. Bornes larges mais sûres : 1 minute à 1 an. Partagée par le
// Ticket et le Lien d'accès (durée temporaire) -- même échelle raisonnable.
const DUREE_ACCES_MIN_HEURES = 1 / 60;

// Validation partagée entre poster_message_vocal et poster_message_client_vocal.
function verifierVocal(req) {
  const { audioBase64, typeMime, dureeSecondes } = req.body || {};
  if (!audioBase64 || !typeMime) return { erreur: "Vocal incomplet." };
  if (!TYPES_AUDIO_AUTORISES.includes(String(typeMime))) return { erreur: "Format audio non reconnu." };
  const tailleOctets = Buffer.byteLength(audioBase64, "base64");
  if (tailleOctets > TAILLE_MAX_VOCAL_OCTETS) return { erreur: "Vocal trop volumineux (4 Mo maximum)." };
  const duree = Math.max(0, Math.round(Number(dureeSecondes) || 0));
  if (duree > DUREE_MAX_VOCAL_SECONDES) return { erreur: "Vocal trop long (10 minutes maximum)." };
  return { audioBase64, typeMime: String(typeMime), dureeSecondes: duree };
}
const DUREE_ACCES_MAX_HEURES = 8760;

export default async function handler(req, res) {
  const session = await sessionDepuisRequete(req);
  if (!session) {
    res.status(401).json({ ok: false, erreur: "Non connecté." });
    return;
  }

  if (req.method === "GET") {
    await gerer_get(req, res, session);
    return;
  }
  if (req.method === "POST") {
    await gerer_post(req, res, session);
    return;
  }
  res.status(405).json({ ok: false, erreur: "Méthode non autorisée." });
}

async function gerer_get(req, res, session) {
  const negociationId = Number(req.query.id);
  if (!negociationId) {
    res.status(400).json({ ok: false, erreur: "id manquant." });
    return;
  }

  const monAppartenance = await membreDe(negociationId, session.utilisateurId);
  if (!monAppartenance || !monAppartenance.actif) {
    res.status(403).json({ ok: false, erreur: "Accès refusé à cette négociation." });
    return;
  }

  // Mode "voir comme" -- Direction peut prévisualiser n'importe quel membre
  // de n'importe laquelle de ses négociations (mur de rôle). Le Négociateur
  // ne peut prévisualiser QUE le client de SA PROPRE négociation en cours
  // (petit bouton "Vue Client", retour du 16/09/2026) -- jamais un autre
  // négociateur, jamais une autre négociation.
  const voirCommeId = Number(req.query.voirComme) || null;
  let roleAffiche = monAppartenance.role;
  let voirComme = null;
  if (voirCommeId && (monAppartenance.role === "direction" || monAppartenance.role === "negociateur")) {
    const cible = await membreDe(negociationId, voirCommeId);
    if (cible && cible.actif && (monAppartenance.role === "direction" || cible.role === "client")) {
      roleAffiche = cible.role;
      voirComme = voirCommeId;
    }
  }

  // Requêtes indépendantes, lancées en parallèle plutôt qu'en séquence
  // (retour du 17/09/2026, diagnostic de lenteur -- "le panneau du chat...
  // ça prend du temps, ça bloque") : cette route enchaînait une dizaine
  // d'allers-retours base l'un après l'autre, chacun payant son propre
  // round-trip réseau (~150-200ms), jusqu'à 2s au total mesurés en
  // conditions réelles. Aucune de ces requêtes ne dépend du résultat d'une
  // autre -- seul le TRAITEMENT qui suit (fichiersVisibles, etc.) a besoin
  // qu'elles soient toutes revenues.
  const [infoRows, liensClient, fichiersBruts, fichiersLus, engagementClient] = await Promise.all([
    sql()`
      select nom, statut_libelle, etape, cree_le, ticket_ouvert_le, ticket_expire_le, etape_libelles_visibles_client
      from negociations where id = ${negociationId} limit 1
    `,
    liensClientDeLaNegociation(negociationId),
    // Dossier d'échange : jamais le contenu_base64 ici (déjà exclu par la
    // requête), et jamais les fichiers qu'un client a masqués de sa propre
    // vue quand c'est lui qui regarde -- filtré plus bas, après coup.
    fichiersPartagesDeLaNegociation(negociationId),
    // "nouveau" par fichier (pas seulement le total) -- distinct du "vu" du
    // dossier dans son ensemble (dossier_partage_vu_le, ci-dessous) : ouvrir
    // le dossier montre la liste, mais chaque fichier reste "nouveau" tant
    // que CE fichier précis n'a pas été cliqué (retour du 14/09/2026).
    // Toujours la lecture de la PERSONNE RÉELLEMENT connectée, jamais la
    // cible d'un "voir comme" -- prévisualiser ne doit jamais éteindre le
    // badge à la place du vrai client.
    fichiersLusParUtilisateur(negociationId, session.utilisateurId),
    // Engagement du CLIENT (vu/lu, avec horodatage) -- pour affichage côté
    // équipe seulement (jamais reconstruit ni montré quand roleAffiche est
    // "client", "voir comme" inclus : un client qui prévisualise sa propre
    // vue ne doit jamais voir cette mention interne). Retour du 14/09/2026.
    roleAffiche !== "client" ? engagementClientSurFichiers(negociationId) : Promise.resolve(null),
  ]);
  const negociation = infoRows[0] || null;
  const verrouille = negociation ? ticketVerrouille(negociation) : false;
  const fichiersVisiblesBruts = roleAffiche === "client" ? fichiersBruts.filter((f) => !f.masque_pour_client) : fichiersBruts;
  const fichiersVisibles = fichiersVisiblesBruts.map((f) => {
    const base = { ...f, nouveau: !fichiersLus.has(String(f.id)) };
    if (!engagementClient) return base;
    const luLe = engagementClient.luParFichier[String(f.id)] || null;
    const vuLeBrut = engagementClient.vuLeClient;
    const vuLe = vuLeBrut && new Date(vuLeBrut) >= new Date(f.envoye_le) ? vuLeBrut : null;
    return { ...base, clientVuLe: vuLe, clientLuLe: luLe };
  });
  const dossierPartage = {
    fichiers: fichiersVisibles,
    total: fichiersVisibles.length,
    nouveaux: fichiersVisibles.filter((f) => f.nouveau).length,
  };

  if (roleAffiche === "client") {
    const [messagesClient, directionId] = await Promise.all([
      messagesClientDeLaNegociation(negociationId),
      idDirectionDeLaNegociation(negociationId),
    ]);
    // Les 6 points sont toujours visibles au client (juste les numéros) --
    // mais ce qu'ils signifient (le libellé) reste caché tant que la
    // Direction n'a pas explicitement décidé de le révéler (retour du
    // 16/09/2026, voir schema.sql). Jamais "conseil"/"recommandes" -- ce
    // sont des consignes internes, pas pour le client même une fois révélé.
    const etapesClient = negociation?.etape_libelles_visibles_client
      ? ETAPES.map((e) => ({ n: e.n, label: e.label }))
      : null;
    res.status(200).json({
      ok: true,
      role: roleAffiche,
      voirComme,
      negociation,
      liensClient,
      dossierPartage,
      messagesClient,
      directionId,
      verrouille,
      // Retour du 16/09/2026, tranché : "l'espace de travail partagé,
      // identique à celui du négociateur" -- le client passe désormais par
      // le MÊME rendreStageOutils()/rafraichirGrandApercu() que tout le
      // monde, qui a besoin de tousLesOutils. monRoleReel distingue un
      // vrai client d'une Direction/négociateur qui le prévisualise
      // ("voir comme"), comme pour tous les autres rôles.
      monRoleReel: monAppartenance.role,
      tousLesOutils: TOUS_LES_OUTILS,
      etapesClient,
    });
    return;
  }

  // Bloc-notes : on montre la note de la personne prévisualisée ("voir
  // comme" inclus, pour un aperçu fidèle) -- jamais éditable en mode
  // "voir comme" (appliqué côté page). Notes visibles par toute l'équipe,
  // sans exception -- "transparence totale" (retour du 14/09/2026) : voir
  // favorise les idées/solutions croisées, seule l'écriture reste réservée
  // à son propre auteur.
  const utilisateurPourNote = voirComme || session.utilisateurId;
  const [membres, messages, messagesClient, maNote, notesEquipe] = await Promise.all([
    membresDeLaNegociation(negociationId),
    messagesDeLaNegociation(negociationId),
    messagesClientDeLaNegociation(negociationId),
    noteDe(negociationId, utilisateurPourNote),
    toutesLesNotes(negociationId),
  ]);
  // Retour du 14/09/2026 : la couleur d'un message suit désormais le RÔLE de
  // son auteur (Support toujours dans sa couleur propre, où qu'il apparaisse
  // et quel que soit qui regarde), pas juste "est-ce moi qui l'ai écrit".
  const directionId = membres.find((m) => m.role === "direction")?.utilisateur_id || null;

  res.status(200).json({
    ok: true,
    role: roleAffiche,
    voirComme,
    negociation,
    membres,
    messages,
    messagesClient,
    directionId,
    liensClient,
    dossierPartage,
    etapes: ETAPES,
    tousLesOutils: TOUS_LES_OUTILS,
    monRoleReel: monAppartenance.role,
    maNote: maNote?.texte || "",
    notesEquipe,
    verrouille,
  });
}

async function gerer_post(req, res, session) {
  const { negociationId, action } = req.body || {};

  // Créer une négociation ne dépend d'aucune négociation existante -- la
  // Direction peut mener ses propres négociations sans négociateur (retour
  // du 16/09/2026 : "pourquoi payer... si nous avons l'opportunité de le
  // faire sans avoir recours à une autre personne"). Elle en devient membre
  // avec le rôle "direction", qui a déjà tous les droits nécessaires.
  if (action === "creer_negociation") {
    const appartenances = await appartenancesDe(session.utilisateurId);
    if (!appartenances.some((a) => a.role === "direction")) {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const nom = (req.body.nom || "").toString().trim();
    if (!nom) {
      res.status(400).json({ ok: false, erreur: "Nom de la négociation requis." });
      return;
    }
    const negociationId = await creerNegociation(nom, session.utilisateurId);
    res.status(200).json({ ok: true, negociationId });
    return;
  }

  if (!negociationId || !action) {
    res.status(400).json({ ok: false, erreur: "negociationId et action requis." });
    return;
  }

  const monAppartenance = await membreDe(negociationId, session.utilisateurId);
  if (!monAppartenance || !monAppartenance.actif) {
    res.status(403).json({ ok: false, erreur: "Accès refusé." });
    return;
  }

  // Le Client ne passe par cette route que pour son propre tchat direct et
  // le dossier d'échange (dépôt/retrait/vu) -- tout le reste lui reste
  // fermé, comme avant.
  const ACTIONS_CLIENT_AUTORISEES = new Set(["poster_message_client", "poster_message_client_vocal", "supprimer_message_client", "deposer_fichier_partage", "supprimer_fichier_partage", "marquer_dossier_partage_vu", "marquer_fichier_lu", "marquer_document_vu"]);
  if (monAppartenance.role === "client" && !ACTIONS_CLIENT_AUTORISEES.has(action)) {
    res.status(403).json({ ok: false, erreur: "Accès refusé." });
    return;
  }

  if (action === "poster_message_client") {
    // Direction et Négociateur écrivent au client ("un seul a la parole") ;
    // le Client répond de son côté ; Apporteur/Autre restent lecture seule.
    const autorise = monAppartenance.role === "client" || monAppartenance.role === "direction" || monAppartenance.role === "negociateur";
    if (!autorise) {
      res.status(403).json({ ok: false, erreur: "Lecture seule pour ce rôle." });
      return;
    }
    const texte = (req.body.texte || "").toString().trim();
    if (!texte) {
      res.status(400).json({ ok: false, erreur: "Message vide." });
      return;
    }
    if (contientLangageInterdit(texte)) {
      res.status(400).json({ ok: false, erreur: "Ce message contient des mots non acceptés sur cette plateforme -- merci de reformuler." });
      return;
    }
    if (monAppartenance.role !== "direction" && monAppartenance.role !== "client") {
      const nego = await negociationPourVerrou(negociationId);
      if (ticketVerrouille(nego)) {
        res.status(423).json({ ok: false, erreur: "Ticket de négociation expiré -- en attente de réactivation par la Direction." });
        return;
      }
    }
    await posterMessageClient(negociationId, session.utilisateurId, texte);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "poster_message_client_vocal") {
    const autorise = monAppartenance.role === "client" || monAppartenance.role === "direction" || monAppartenance.role === "negociateur";
    if (!autorise) {
      res.status(403).json({ ok: false, erreur: "Lecture seule pour ce rôle." });
      return;
    }
    if (monAppartenance.role !== "direction" && monAppartenance.role !== "client") {
      const nego = await negociationPourVerrou(negociationId);
      if (ticketVerrouille(nego)) {
        res.status(423).json({ ok: false, erreur: "Ticket de négociation expiré -- en attente de réactivation par la Direction." });
        return;
      }
    }
    const vocal = verifierVocal(req);
    if (vocal.erreur) {
      res.status(400).json({ ok: false, erreur: vocal.erreur });
      return;
    }
    await posterMessageClientVocal(negociationId, session.utilisateurId, vocal);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "supprimer_message_client") {
    const id = Number(req.body?.id);
    if (!id) {
      res.status(400).json({ ok: false, erreur: "id requis." });
      return;
    }
    // Support supprime en modérateur -- même un message qui n'est pas le
    // sien (retour du 14/09/2026 : "un message mal placé qui met tout le
    // monde mal à l'aise... Support peut directement supprimer").
    const ok = await supprimerMessageClient(id, session.utilisateurId, monAppartenance.role === "direction");
    if (!ok) {
      res.status(403).json({ ok: false, erreur: "Vous ne pouvez supprimer que vos propres messages." });
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "poster_message") {
    if (ROLES_LECTURE_SEULE.has(monAppartenance.role)) {
      res.status(403).json({ ok: false, erreur: "Lecture seule pour ce rôle." });
      return;
    }
    const texte = (req.body.texte || "").toString().trim();
    if (!texte) {
      res.status(400).json({ ok: false, erreur: "Message vide." });
      return;
    }
    if (contientLangageInterdit(texte)) {
      res.status(400).json({ ok: false, erreur: "Ce message contient des mots non acceptés sur cette plateforme -- merci de reformuler." });
      return;
    }
    await sql()`insert into messages (negociation_id, auteur_id, texte) values (${negociationId}, ${session.utilisateurId}, ${texte})`;
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "poster_message_vocal") {
    if (ROLES_LECTURE_SEULE.has(monAppartenance.role)) {
      res.status(403).json({ ok: false, erreur: "Lecture seule pour ce rôle." });
      return;
    }
    const vocal = verifierVocal(req);
    if (vocal.erreur) {
      res.status(400).json({ ok: false, erreur: vocal.erreur });
      return;
    }
    await posterMessageVocal(negociationId, session.utilisateurId, vocal);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "supprimer_message") {
    const id = Number(req.body?.id);
    if (!id) {
      res.status(400).json({ ok: false, erreur: "id requis." });
      return;
    }
    const ok = await supprimerMessage(id, session.utilisateurId, monAppartenance.role === "direction");
    if (!ok) {
      res.status(403).json({ ok: false, erreur: "Vous ne pouvez supprimer que vos propres messages." });
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "ajouter_membre") {
    const { nom, email, role, motDePasse, titreAutre, photoUrl, identifiant } = req.body || {};
    if (!nom || !email || !role || !motDePasse) {
      res.status(400).json({ ok: false, erreur: "Champs manquants." });
      return;
    }
    if (role === "autre" && !titreAutre) {
      res.status(400).json({ ok: false, erreur: "Titre requis pour le rôle \"Autre\"." });
      return;
    }
    // Réservé à la Direction, sans exception (retour du 17/09/2026 -- "il
    // n'y a que l'admin qui ajoute un membre... pour que je reste le seul
    // modérateur"). Le Négociateur ne crée plus le compte Client lui-même
    // (§4 du CDC, périmé depuis ce retour) : il demande à la Direction de
    // l'ajouter.
    const autorise = monAppartenance.role === "direction";
    if (!autorise) {
      res.status(403).json({ ok: false, erreur: "Droits insuffisants pour ce rôle." });
      return;
    }
    const emailNormalise = String(email).trim().toLowerCase();
    const identifiantNormalise = identifiant ? String(identifiant).trim().toLowerCase() : null;
    const hash = await hacherMotDePasse(motDePasse);
    const existants = await sql()`select id from utilisateurs where email = ${emailNormalise} limit 1`;
    let utilisateurId;
    if (existants[0]) {
      utilisateurId = existants[0].id;
      if (photoUrl) await sql()`update utilisateurs set photo_url = ${photoUrl} where id = ${utilisateurId}`;
      if (identifiantNormalise) {
        const ok = await definirIdentifiant(utilisateurId, identifiantNormalise);
        if (!ok) { res.status(409).json({ ok: false, erreur: "Cet identifiant est déjà pris." }); return; }
      }
    } else {
      let inseres;
      try {
        inseres = await sql()`insert into utilisateurs (nom, email, mot_de_passe_hash, photo_url, identifiant) values (${nom}, ${emailNormalise}, ${hash}, ${photoUrl || null}, ${identifiantNormalise}) returning id`;
      } catch (err) {
        if (err?.code === "23505") { res.status(409).json({ ok: false, erreur: "Cet identifiant ou cet email est déjà pris." }); return; }
        throw err;
      }
      utilisateurId = inseres[0].id;
    }
    // Message de bienvenue automatique (retour du 17/09/2026 -- "un premier
    // message de support leur souhaitant la bienvenue... pour les mettre
    // dans le bain") -- uniquement à la toute première arrivée dans CETTE
    // négociation, jamais rejoué si on modifie ensuite le rôle d'un membre
    // déjà présent (on conflict ci-dessous mettrait sinon le même message à
    // chaque édition).
    const dejaMembre = await sql()`select 1 from membres_negociation where negociation_id = ${negociationId} and utilisateur_id = ${utilisateurId} limit 1`;
    const premiereArrivee = dejaMembre.length === 0;
    await sql()`
      insert into membres_negociation (negociation_id, utilisateur_id, role, titre_autre)
      values (${negociationId}, ${utilisateurId}, ${role}, ${role === "autre" ? titreAutre : null})
      on conflict (negociation_id, utilisateur_id) do update set role = excluded.role, actif = true, titre_autre = excluded.titre_autre
    `;
    if (premiereArrivee) {
      if (role === "client") {
        await sql()`insert into messages_client (negociation_id, auteur_id, texte) values (${negociationId}, ${session.utilisateurId}, ${MESSAGE_BIENVENUE_CLIENT})`;
      } else {
        await sql()`insert into messages (negociation_id, auteur_id, texte) values (${negociationId}, ${session.utilisateurId}, ${MESSAGE_BIENVENUE_EQUIPE})`;
      }
    }
    res.status(200).json({ ok: true });
    return;
  }

  // Réinitialisation de mot de passe (retour du 17/09/2026 -- jusqu'ici
  // impossible : ajouter_membre n'écrase jamais le mot de passe d'un compte
  // existant). Réservé à la Direction, même garde que retirer_membre. Coupe
  // aussi la session active de la cible : un mot de passe qu'on vient de
  // changer ne doit pas laisser une session ouverte avec l'ancien.
  if (action === "reinitialiser_mot_de_passe") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const utilisateurId = Number(req.body.utilisateurId);
    const nouveauMotDePasse = (req.body.nouveauMotDePasse || "").toString();
    if (!utilisateurId || nouveauMotDePasse.length < 6) {
      res.status(400).json({ ok: false, erreur: "Mot de passe trop court (6 caractères minimum)." });
      return;
    }
    const cible = await membreDe(negociationId, utilisateurId);
    if (!cible || !cible.actif) {
      res.status(400).json({ ok: false, erreur: "Ce membre ne fait pas partie de la négociation." });
      return;
    }
    const hash = await hacherMotDePasse(nouveauMotDePasse);
    await sql()`update utilisateurs set mot_de_passe_hash = ${hash} where id = ${utilisateurId}`;
    await fermerSessionUtilisateur(utilisateurId);
    res.status(200).json({ ok: true });
    return;
  }

  // Identifiant de connexion, alternatif à l'email (retour du 17/09/2026 --
  // "l'email est parfois très compliqué à saisir"). Réservé à la Direction,
  // même garde que reinitialiser_mot_de_passe. Vide efface l'identifiant
  // (retour à email seul pour ce compte).
  if (action === "definir_identifiant") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const utilisateurId = Number(req.body.utilisateurId);
    const identifiantBrut = (req.body.identifiant || "").toString().trim().toLowerCase();
    if (!utilisateurId) {
      res.status(400).json({ ok: false, erreur: "Membre manquant." });
      return;
    }
    const cible = await membreDe(negociationId, utilisateurId);
    if (!cible || !cible.actif) {
      res.status(400).json({ ok: false, erreur: "Ce membre ne fait pas partie de la négociation." });
      return;
    }
    const ok = await definirIdentifiant(utilisateurId, identifiantBrut || null);
    if (!ok) {
      res.status(409).json({ ok: false, erreur: "Cet identifiant est déjà pris par un autre compte." });
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  // Déconnexion forcée (retour du 17/09/2026, session unique par compte) --
  // débloque un compte dont la session est restée marquée active (fenêtre
  // fermée sans se déconnecter) sans attendre l'expiration naturelle (14
  // jours). Réservé à la Direction, même garde que retirer_membre.
  if (action === "forcer_deconnexion") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const utilisateurId = Number(req.body.utilisateurId);
    const cible = utilisateurId ? await membreDe(negociationId, utilisateurId) : null;
    if (!cible) {
      res.status(400).json({ ok: false, erreur: "Ce membre ne fait pas partie de la négociation." });
      return;
    }
    await fermerSessionUtilisateur(utilisateurId);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "ajouter_lien_client") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const { libelle, url } = req.body || {};
    if (!libelle || !url) {
      res.status(400).json({ ok: false, erreur: "Libellé et URL requis." });
      return;
    }
    await sql()`insert into negociation_liens_client (negociation_id, libelle, url, ordre) values (${negociationId}, ${libelle}, ${url}, 0)`;
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "retirer_lien_client") {
    // Symétrique d'ajouter_lien_client -- même bouton, le même libellé sert
    // de clé pour retrouver et retirer le lien (retour du 14/09/2026 :
    // "annuler envoyé", pour reprendre un fichier envoyé par erreur ou
    // incohérent avant que le client ne le voie).
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const { libelle } = req.body || {};
    if (!libelle) {
      res.status(400).json({ ok: false, erreur: "Libellé requis." });
      return;
    }
    await sql()`delete from negociation_liens_client where negociation_id = ${negociationId} and libelle = ${libelle}`;
    res.status(200).json({ ok: true });
    return;
  }

  // Dossier d'échange bidirectionnel (retour du 14/09/2026) : Direction,
  // Négociateur ET Client peuvent y déposer -- Apporteur/Autre restent
  // lecture seule, comme pour tout le reste.
  if (action === "deposer_fichier_partage") {
    if (!["direction", "negociateur", "client"].includes(monAppartenance.role)) {
      res.status(403).json({ ok: false, erreur: "Lecture seule pour ce rôle." });
      return;
    }
    if (monAppartenance.role !== "direction") {
      const nego = await negociationPourVerrou(negociationId);
      if (ticketVerrouille(nego)) {
        res.status(423).json({ ok: false, erreur: "Ticket de négociation expiré -- en attente de réactivation par la Direction." });
        return;
      }
    }
    const { nomFichier, typeMime, contenuBase64 } = req.body || {};
    if (!nomFichier || !typeMime || !contenuBase64) {
      res.status(400).json({ ok: false, erreur: "Fichier incomplet." });
      return;
    }
    const extension = String(nomFichier).toLowerCase().split(".").pop();
    if (!EXTENSIONS_FICHIER_PARTAGE_AUTORISEES.has(extension) || /^(video|audio)\//.test(String(typeMime))) {
      res.status(400).json({ ok: false, erreur: "Type de fichier non autorisé -- documents et images seulement (PDF, Word, Excel, PowerPoint, TXT, CSV, JPG, PNG, GIF, WEBP), pas de vidéo." });
      return;
    }
    const tailleOctets = Buffer.byteLength(contenuBase64, "base64");
    const LIMITE_OCTETS = 4 * 1024 * 1024; // 4 Mo -- reste sous la limite de 4,5 Mo par requête de la fonction Vercel, marge pour l'enveloppe JSON.
    if (tailleOctets > LIMITE_OCTETS) {
      res.status(413).json({ ok: false, erreur: "Fichier trop volumineux (4 Mo maximum)." });
      return;
    }
    const id = await deposerFichierPartage({
      negociationId, nomFichier: String(nomFichier).slice(0, 200), typeMime, tailleOctets, contenuBase64,
      envoyeParId: session.utilisateurId, envoyeParRole: monAppartenance.role,
    });
    res.status(200).json({ ok: true, id });
    return;
  }

  if (action === "supprimer_fichier_partage") {
    const fichierId = Number(req.body?.fichierId);
    if (!fichierId) {
      res.status(400).json({ ok: false, erreur: "fichierId requis." });
      return;
    }
    const fichier = await fichierPartageParId(fichierId);
    if (!fichier || fichier.negociation_id !== negociationId) {
      res.status(404).json({ ok: false, erreur: "Fichier introuvable." });
      return;
    }
    if (monAppartenance.role === "direction" || monAppartenance.role === "negociateur") {
      // "On peut les supprimer, il ne le sentira pas" -- retrait réel, pour
      // n'importe quel fichier du dossier (retour du 14/09/2026).
      await supprimerFichierPartage(fichierId);
      res.status(200).json({ ok: true });
      return;
    }
    if (monAppartenance.role === "client" && fichier.envoye_par_role === "client" && fichier.envoye_par_id === session.utilisateurId) {
      // Le client ne retire QUE ses propres dépôts, et seulement de sa
      // propre vue -- le fichier reste au dossier côté équipe.
      await masquerFichierPartagePourClient(fichierId);
      res.status(200).json({ ok: true });
      return;
    }
    res.status(403).json({ ok: false, erreur: "Vous ne pouvez retirer que vos propres fichiers." });
    return;
  }

  if (action === "marquer_dossier_partage_vu") {
    await marquerDossierPartageVu(negociationId, session.utilisateurId);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "marquer_fichier_lu") {
    const fichierId = Number(req.body?.fichierId);
    if (!fichierId) {
      res.status(400).json({ ok: false, erreur: "fichierId requis." });
      return;
    }
    const fichier = await fichierPartageParId(fichierId);
    if (!fichier || fichier.negociation_id !== negociationId) {
      res.status(404).json({ ok: false, erreur: "Fichier introuvable." });
      return;
    }
    await marquerFichierLu(fichierId, session.utilisateurId);
    res.status(200).json({ ok: true });
    return;
  }

  // Réservé au client réel : Direction/Négociateur qui consultent leurs
  // propres outils n'ont rien à "prouver" -- seule la vraie ouverture d'un
  // document par le client compte pour la Boîte noire.
  if (action === "marquer_document_vu") {
    if (monAppartenance.role !== "client") {
      res.status(200).json({ ok: true });
      return;
    }
    const libelle = (req.body?.libelle || "").toString().slice(0, 300);
    if (libelle) await enregistrerDocumentVu(negociationId, session.utilisateurId, libelle);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "changer_etape") {
    // Direction et Négociateur font évoluer l'étape -- navigable dans le
    // désordre (pas de contrainte de séquence), jamais l'Apporteur (lecture seule).
    if (ROLES_LECTURE_SEULE.has(monAppartenance.role)) {
      res.status(403).json({ ok: false, erreur: "Lecture seule pour ce rôle." });
      return;
    }
    if (monAppartenance.role !== "direction") {
      const nego = await negociationPourVerrou(negociationId);
      if (ticketVerrouille(nego)) {
        res.status(423).json({ ok: false, erreur: "Ticket de négociation expiré -- en attente de réactivation par la Direction." });
        return;
      }
    }
    const etape = Number(req.body.etape);
    if (!ETAPES.some((e) => e.n === etape)) {
      res.status(400).json({ ok: false, erreur: "Étape invalide." });
      return;
    }
    await sql()`update negociations set etape = ${etape}, statut_libelle = ${libelleEtape(etape)} where id = ${negociationId}`;
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "ouvrir_ticket") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const dureeHeures = Number(req.body.dureeHeures);
    if (!Number.isFinite(dureeHeures) || dureeHeures < DUREE_ACCES_MIN_HEURES || dureeHeures > DUREE_ACCES_MAX_HEURES) {
      res.status(400).json({ ok: false, erreur: "Durée de ticket invalide." });
      return;
    }
    await ouvrirTicket(negociationId, dureeHeures);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "couper_ticket") {
    // Coupure immédiate, distincte d'une simple réduction de durée -- retour
    // du 16/09/2026 : "je peux couper instantanément ? Oui."
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    await couperTicket(negociationId);
    res.status(200).json({ ok: true });
    return;
  }

  // Révèle ou recache les intitulés d'étape au client -- jamais activé par
  // défaut (retour du 16/09/2026, voir schema.sql). "Le commercial ou moi
  // pouvons afficher" -- Direction ET Négociateur, personne d'autre.
  if (action === "basculer_libelles_client") {
    if (monAppartenance.role !== "direction" && monAppartenance.role !== "negociateur") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction et au négociateur." });
      return;
    }
    await basculerLibellesClient(negociationId, !!req.body.visible);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "enregistrer_note") {
    // Note privée -- toujours celle de la vraie personne connectée, jamais
    // écrasable via le mode "voir comme" (désactivé côté page de toute façon).
    const texte = (req.body.texte || "").toString();
    await enregistrerNote(negociationId, session.utilisateurId, texte);
    res.status(200).json({ ok: true });
    return;
  }

  if (action === "retirer_membre") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const { utilisateurId } = req.body || {};
    await sql()`update membres_negociation set actif = false where negociation_id = ${negociationId} and utilisateur_id = ${utilisateurId}`;
    res.status(200).json({ ok: true });
    return;
  }

  // Lien d'accès -- distinct du Ticket (retour du 16/09/2026, voir schema.sql
  // pour le détail) : envoyé à UN membre précis pour le connecter directement
  // à cette négociation, sans email ni mot de passe. Réservé à la Direction,
  // même logique de droits que "ajouter_membre"/"retirer_membre".
  if (action === "generer_invitation") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const utilisateurId = Number(req.body.utilisateurId);
    const cible = utilisateurId ? await membreDe(negociationId, utilisateurId) : null;
    if (!cible || !cible.actif) {
      res.status(400).json({ ok: false, erreur: "Ce membre ne fait pas partie de la négociation." });
      return;
    }
    const dureeHeures = Number(req.body.dureeHeures) || 0;
    if (dureeHeures && (dureeHeures < DUREE_ACCES_MIN_HEURES || dureeHeures > DUREE_ACCES_MAX_HEURES)) {
      res.status(400).json({ ok: false, erreur: "Durée de lien invalide." });
      return;
    }
    const invitation = await genererOuRenouvelerInvitation(negociationId, utilisateurId, dureeHeures);
    res.status(200).json({ ok: true, jeton: invitation.jeton, expireLe: invitation.expire_le });
    return;
  }

  if (action === "couper_invitation") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    const utilisateurId = Number(req.body.utilisateurId);
    const expireLe = await couperInvitation(negociationId, utilisateurId);
    res.status(200).json({ ok: true, expireLe });
    return;
  }

  // Suppression définitive -- réservée à la Direction, comme la création.
  if (action === "supprimer_negociation") {
    if (monAppartenance.role !== "direction") {
      res.status(403).json({ ok: false, erreur: "Réservé à la Direction." });
      return;
    }
    await supprimerNegociation(negociationId);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(400).json({ ok: false, erreur: "Action inconnue." });
}

async function negociationPourVerrou(negociationId) {
  const rows = await sql()`select etape, ticket_expire_le from negociations where id = ${negociationId} limit 1`;
  return rows[0];
}

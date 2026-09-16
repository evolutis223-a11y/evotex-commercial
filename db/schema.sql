-- Espace Gestion du Projet & Négociations — evotex-commercial
-- Base Neon dédiée, totalement distincte de toute base de l'ERP BATEXCI.
-- Étape 1 (cf. CDC_GESTION_INTERNE.md) : négociations, membres, rôles,
-- messages, boîte noire, comptes client.

create table if not exists utilisateurs (
  id            bigint generated always as identity primary key,
  nom           text not null,
  email         text not null unique,
  mot_de_passe_hash text not null,
  cree_le       timestamptz not null default now()
);

-- Présence -- mis à jour à la connexion et par un signal léger (~45s) tant
-- qu'une page de l'Espace de Travail reste ouverte (retour du 14/09/2026 :
-- "on peut mettre des boutons rouges/verts... on sait qui est en ligne").
-- Une approximation honnête ("vu récemment"), jamais une vraie présence
-- temps réel promise à tort.
alter table utilisateurs add column if not exists dernier_vu timestamptz;

-- Profil (retour du 14/09/2026) : chaque membre a son propre compte et son
-- propre profil, pas juste une ligne technique -- photo optionnelle pour
-- commencer, colonne pensée pour accueillir d'autres détails de profil plus tard.
alter table utilisateurs add column if not exists photo_url text;

create table if not exists negociations (
  id            bigint generated always as identity primary key,
  nom           text not null,
  statut_libelle text not null default 'Négociation ouverte',
  cree_le       timestamptz not null default now()
);

-- Étape numérotée (1-6) de la négociation -- remplace la saisie libre de
-- statut_libelle dans l'interface (source de confusion, cf. retour du
-- 13/09/2026) ; statut_libelle reste tenu à jour automatiquement à partir du
-- libellé de l'étape, pour que la vue Client (déjà branchée dessus) n'ait
-- rien à changer. Navigable dans le désordre, jamais verrouillé séquentiellement.
alter table negociations add column if not exists etape integer not null default 1;

-- Système de "ticket" (retour du 14/09/2026) : Direction ouvre une fenêtre de
-- temps (1 jour, 3 jours, 1 semaine, 1 mois...) pour pousser à l'efficacité
-- et créer une légère pression côté client. Nul = aucun ticket en cours,
-- négociation libre (comportement d'origine, rétrocompatible). Expiré et
-- étape < 6 (pas encore clôturée) => verrouillée pour tous sauf Direction,
-- qui doit réactiver explicitement.
alter table negociations add column if not exists ticket_ouvert_le timestamptz;
alter table negociations add column if not exists ticket_expire_le timestamptz;

-- Le client voit toujours les 6 points de la frise d'étapes (juste les
-- numéros, jamais l'équipe ni les intitulés), mais jamais ce que chaque
-- point signifie -- tant que la Direction n'a pas explicitement décidé de
-- les révéler (retour du 16/09/2026 : "il verra que les points... au moment
-- voulu, nous activerons... il sera surpris de voir qu'il était soumis à un
-- test"). Faux par défaut -- jamais montré tant que non activé à la main.
alter table negociations add column if not exists etape_libelles_visibles_client boolean not null default false;

-- Rôle d'un utilisateur, propre à une négociation donnée (pas un rôle global).
create table if not exists membres_negociation (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  utilisateur_id  bigint not null references utilisateurs(id) on delete cascade,
  role            text not null check (role in ('direction','negociateur','apporteur','client')),
  actif           boolean not null default true,
  ajoute_le       timestamptz not null default now(),
  unique (negociation_id, utilisateur_id)
);

-- Rôle "autre" (retour du 14/09/2026) : personne qui facilite discrètement,
-- avec un titre libre -- droits lecture seule par défaut (comme Apporteur),
-- un vrai mur de permissions détaillé reste une évolution future.
alter table membres_negociation drop constraint if exists membres_negociation_role_check;
alter table membres_negociation add constraint membres_negociation_role_check check (role in ('direction','negociateur','apporteur','client','autre'));
alter table membres_negociation add column if not exists titre_autre text;

-- Fil de messages par négociation. Lecture : tous les membres actifs.
-- Écriture : direction + negociateur uniquement (appliqué côté API, pas ici).
create table if not exists messages (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  auteur_id       bigint not null references utilisateurs(id),
  texte           text not null,
  cree_le         timestamptz not null default now()
);

-- Boîte noire : une ligne par connexion réussie, tous rôles confondus.
create table if not exists connexions_log (
  id              bigint generated always as identity primary key,
  utilisateur_id  bigint not null references utilisateurs(id) on delete cascade,
  connecte_le     timestamptz not null default now(),
  user_agent      text
);

-- Liens sélectionnés à la main par Direction/Négociateur, affichés dans la
-- vue Client de la négociation (§6bis du CDC). Pas encore d'activation à
-- distance ni d'expiration automatique — ça, c'est l'Étape 2.
create table if not exists negociation_liens_client (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  libelle         text not null,
  url             text not null,
  ordre           integer not null default 0
);

-- Bloc-notes privé pendant la négociation (retour du 14/09/2026 : "il faut
-- donner un outil qui permet de prendre note pendant la discussion"). Chaque
-- membre ne voit que sa propre note ; Direction voit celles de tout le monde
-- ("la direction consulte tout et voit tout" -- la boîte leur appartient,
-- les négociateurs sont des tiers externes sous convention).
create table if not exists notes_negociation (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  auteur_id       bigint not null references utilisateurs(id) on delete cascade,
  texte           text not null default '',
  maj_le          timestamptz not null default now(),
  unique (negociation_id, auteur_id)
);

-- Tchat direct négociateur ↔ client (retour du 14/09/2026), distinct des
-- Échanges internes à l'équipe : lecture pour tous les membres actifs (les
-- autres membres "assistent" en observateurs), écriture réservée à
-- Direction, au Négociateur, et au Client lui-même -- jamais Apporteur/Autre.
create table if not exists messages_client (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  auteur_id       bigint not null references utilisateurs(id) on delete cascade,
  texte           text not null,
  cree_le         timestamptz not null default now()
);
create index if not exists idx_messages_client_negociation on messages_client(negociation_id, cree_le);

-- Lien d'accès envoyé à un membre pour rejoindre directement sa négociation,
-- sans ressaisir email/mot de passe -- distinct du Ticket, qui verrouille la
-- durée de la négociation elle-même (retour du 16/09/2026 : "ce ticket
-- définit le temps ou la durée des négociations. Elle est différente du lien
-- envoyé aux membres pour participer... qui peut être un lien permanent
-- comme un lien temporaire. Et renouvelable aussi. Pas besoin de renvoyer un
-- nouveau lien"). expire_le nul = lien permanent. Le jeton ne change jamais
-- lors d'un renouvellement -- seule l'échéance bouge.
create table if not exists negociation_invitations (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  utilisateur_id  bigint not null references utilisateurs(id) on delete cascade,
  jeton           text not null unique,
  expire_le       timestamptz,
  cree_le         timestamptz not null default now(),
  unique (negociation_id, utilisateur_id)
);
create index if not exists idx_negociation_invitations_jeton on negociation_invitations(jeton);

-- Dossier partagé d'échange de fichiers, DANS LES DEUX SENS -- Direction,
-- Négociateur ET Client peuvent y déposer un fichier (retour du 14/09/2026 :
-- "comme une boîte de réception... il peut nous faire venir ça par ce
-- dossier"). Distinct de negociation_liens_client, qui reste un envoi à sens
-- unique choisi par Direction depuis le catalogue de vente. Le contenu est
-- stocké en base64 (pas d'objet-storage configuré pour ce projet) -- adapté
-- à des documents ponctuels (facture, cahier des charges signé...), pas à de
-- gros volumes.
create table if not exists negociation_fichiers_partages (
  id                bigint generated always as identity primary key,
  negociation_id    bigint not null references negociations(id) on delete cascade,
  nom_fichier       text not null,
  type_mime         text not null,
  taille_octets     integer not null,
  contenu_base64    text not null,
  envoye_par_id     bigint not null references utilisateurs(id),
  envoye_par_role   text not null,
  envoye_le         timestamptz not null default now(),
  -- Un client peut retirer un fichier QU'IL a lui-même envoyé -- mais
  -- seulement de sa propre vue : "ça ne se supprime pas chez nous, ça reste
  -- chez nous, mais ça ne s'affiche plus chez lui" (retour du 14/09/2026).
  -- Direction, elle, supprime pour de vrai (delete ligne), sans ce drapeau.
  masque_pour_client boolean not null default false
);
create index if not exists idx_fichiers_partages_negociation on negociation_fichiers_partages(negociation_id, envoye_le);

-- "Vu" du dossier partagé, par membre -- pour distinguer les fichiers reçus
-- depuis la dernière consultation (badge "nouveaux" côté vignette).
alter table membres_negociation add column if not exists dossier_partage_vu_le timestamptz;

-- "Lu", au fichier près, par personne -- distinct du "vu" du dossier dans
-- son ensemble (retour du 14/09/2026 : ouvrir le dossier montre la liste,
-- mais chaque fichier reste marqué "non lu" tant qu'on ne l'a pas cliqué
-- lui-même). Le compteur "nouveaux" de la vignette se base sur cette table,
-- pas sur dossier_partage_vu_le.
create table if not exists fichier_partage_lu (
  id              bigint generated always as identity primary key,
  fichier_id      bigint not null references negociation_fichiers_partages(id) on delete cascade,
  utilisateur_id  bigint not null references utilisateurs(id) on delete cascade,
  lu_le           timestamptz not null default now(),
  unique (fichier_id, utilisateur_id)
);
create index if not exists idx_fichier_partage_lu_utilisateur on fichier_partage_lu(utilisateur_id);

-- Consultation réelle d'un document "Mes Documents" par le client -- pas
-- juste "il s'est connecté", mais "il a réellement ouvert ce document"
-- (retour du 14/09/2026). Visible uniquement à la Direction, dans la Boîte
-- noire -- jamais montré au client (pas un accusé de réception affiché).
create table if not exists document_vu_log (
  id              bigint generated always as identity primary key,
  negociation_id  bigint not null references negociations(id) on delete cascade,
  utilisateur_id  bigint not null references utilisateurs(id) on delete cascade,
  libelle         text not null,
  vu_le           timestamptz not null default now()
);
create index if not exists idx_document_vu_log_negociation on document_vu_log(negociation_id, vu_le desc);

-- Messages vocaux + suppression "illusion" (retour du 14/09/2026) --
-- s'ajoutent aux deux tchats existants (messages = interne, messages_client
-- = avec le client) plutôt qu'un nouveau système à part. Un message vocal a
-- son audio ici (audio_base64/audio_type_mime/audio_duree_secondes),
-- texte alors vide -- d'où le passage de "texte" en nullable.
--
-- Suppression : "on peut lui donner cette illusion de supprimer... nous
-- avons la possibilité de le retrouver plus loin, par besoin" -- jamais un
-- vrai DELETE. supprime_le posé => le message disparaît de l'écran de tout
-- le monde (contenu/audio jamais renvoyés par les fonctions de lecture
-- normales, même à la Direction), mais la ligne reste en base, retrouvable
-- par la Direction via la Boîte noire. Chacun ne supprime que ses propres
-- messages (tranché le 14/09/2026) -- imposé aussi côté requête, pas
-- seulement côté API.
-- supprime_par_id distingue l'auteur qui retire son propre message d'un
-- retrait par Support en modérateur (retour du 14/09/2026 : "chacun le
-- sien, mais Support peut supprimer pour les autres... un message mal
-- placé qui met tout le monde mal à l'aise") -- la Boîte noire doit pouvoir
-- montrer QUI a vraiment supprimé, pas seulement qui a écrit.
alter table messages alter column texte drop not null;
alter table messages add column if not exists audio_base64 text;
alter table messages add column if not exists audio_type_mime text;
alter table messages add column if not exists audio_duree_secondes integer;
alter table messages add column if not exists supprime_le timestamptz;
alter table messages add column if not exists supprime_par_id bigint references utilisateurs(id);

alter table messages_client alter column texte drop not null;
alter table messages_client add column if not exists audio_base64 text;
alter table messages_client add column if not exists audio_type_mime text;
alter table messages_client add column if not exists audio_duree_secondes integer;
alter table messages_client add column if not exists supprime_le timestamptz;
alter table messages_client add column if not exists supprime_par_id bigint references utilisateurs(id);

create index if not exists idx_membres_negociation_utilisateur on membres_negociation(utilisateur_id);
create index if not exists idx_membres_negociation_negociation on membres_negociation(negociation_id);
create index if not exists idx_messages_negociation on messages(negociation_id, cree_le);
create index if not exists idx_connexions_log_utilisateur on connexions_log(utilisateur_id, connecte_le desc);

# Cahier des Charges — Espace Commercial & Gestion (EVOTEX Commercial)

Document de cadrage interne du projet `evotex-commercial`, distinct du Cahier des Charges Produit de l'ERP BATEXCI/EVOTEX (qui documente l'application elle-même — Production, Vente, RH, Comptabilité, etc., dans le dépôt `Batexci ERP`).

Statut : **cadrage validé (feu vert du 13/09/2026)** pour le chantier "Espace Gestion du Projet & Négociations". Développement pas encore démarré. Document vivant — à mettre à jour à chaque étape validée, jamais rétroactivement silencieux.

---

## 1. Deux volets étanches

### 1.1 Volet Externe / Client-facing
Contenu déjà en place, aucune donnée sensible, pensé pour être montré ou envoyé tel quel à un prospect :
- **Présentation Exécutive** (`#/presentation`)
- **Socle de Lancement** (`#/socle-lancement`)
- **Grille de Licences** (`#/licences`)
- **Cahier des Charges Client** (`#/expression-besoins`)
- **L'outil qui pilote toute l'usine** (`#/presentation-usine`) et sa version avec le regard du PCA (`#/presentation-usine-pca`), ajoutées le 19/09/2026 : deux présentations pour deux cibles, avec une mention « Version du JJ/MM/AAAA » sous le document, réservée au commercial (voir README)

Aucun mot de passe. Le hub public (`#/`) reste le point d'entrée visible.

### 1.2 Volet Interne / Confidentialité stricte (EVOTEX / E223)
**Ne doit jamais être accessible ni visible par un prospect ou client, sous aucune circonstance.** Recouvre :
- Espace "Gestion du Projet" (tableau de bord des négociations)
- Boîte noire (journal de connexions)
- Simulateur financier / Calculateur de coût et rentabilité
- Gestionnaire de conventions et modèles contractuels (ex. Convention de Négociation Commerciale & d'Apport d'Affaires E223)
- Gestion des liens flash / temporaires

Protégé par mot de passe **serveur** (avant l'envoi de la page — jamais une simple vérification JavaScript, contournable). Déclencheur : Article 7 (confidentialité) de la Convention Apporteur d'Affaires E223.

---

## 2. Contexte métier — pourquoi cette séparation

La Convention de Négociation Commerciale & d'Apport d'Affaires (E223 / projet EVOTEX V1 / déploiement BATEX-CI) établit que le Négociateur et l'Apporteur d'affaires sont des **tiers externes**, sans lien de subordination, sans pouvoir de signature au nom de E223, agissant uniquement sur mandat (Article 8), avec un quota de 10% HT sur la vente (Article 3) et une obligation stricte de confidentialité sur les informations commerciales/tarifaires (Article 7). L'espace interne existe pour leur donner les outils nécessaires à leur mission, sans jamais leur exposer plus que leur rôle ne l'exige.

---

## 3. Modèle de rôles (par négociation, pas global)

Une **négociation** est un dossier (ex. « BATEX-CI — EVOTEX V1 ») auquel sont rattachés des membres, chacun avec un rôle propre à cette négociation :

| Rôle | Droits |
|---|---|
| **Direction** | Accès total ; crée/retire des membres ; réassigne les rôles ; mode "Voir comme" (prévisualiser la vue exacte d'un membre) ; pilote l'activation des liens ; accès Calculateur et conventions. |
| **Négociateur** | Voit les retours client et l'historique de la négociation ; envoie des liens (génération, cf. §5) ; écrit dans le fil de messages. |
| **Apporteur d'affaires** | Lecture seule : voit l'avancement et le fil de messages, ne peut rien envoyer, rien partager, rien écrire. |
| **Client** | Compte du client final (cf. §6bis) — lecture seule de sa propre négociation uniquement (statut, liens sélectionnés). Jamais le fil de messages interne ni les membres. |

Comptes **individuels** (jamais un mot de passe partagé) — condition nécessaire à la fois pour les droits différenciés et pour la boîte noire.

---

## 4. Gestion des équipes de négociation

- La Direction crée/ajoute un membre à une négociation spécifique, avec un rôle (Négociateur ou Apporteur d'affaires).
- La Direction retire/désactive un membre à tout moment, sans affecter les autres comptes.
- Une négociation peut compter plusieurs négociateurs ; plusieurs négociations peuvent coexister (autres clients, ou plus tard d'autres produits).
- Chaque membre, en se connectant, sait dans quelle(s) négociation(s) il intervient.

---

## 5. Liens de consultation — activation et contrôle

- Le Négociateur génère un lien de consultation (démo ERP, vue spécifique, page commerciale) — il a l'impression de détenir la main entière.
- **Le point d'arrêt (kill-switch) reste exclusivement du côté Direction** : un lien généré n'est réellement actif qu'une fois validé/activé depuis Gestion du Projet, et peut être coupé à distance à tout moment — *à confirmer explicitement, voir question ouverte §7*.
- Liens à durée limitée (expiration automatique) envisagés en complément du contrôle manuel.
- Objectif explicite : le Négociateur garde confiance (il pense avoir toutes les cartes), pendant que Direction garde la maîtrise fine du calendrier sans le confronter directement.

---

## 6. Outils intégrés à l'espace interne

- **Calculateur de Coût et de Rentabilité** : réintégré ici (il avait été totalement exclu du site public — jamais caché, absent). Utilisé lors des arbitrages tarifaires, jamais exposé hors de cet espace protégé.
- **Gestionnaire de Conventions & Modèles** : consultation/téléchargement des modèles (Convention Apporteur d'Affaires E223, contrats types).
- **Boîte noire** : journal des connexions (qui, quand), consultable par Direction.
- **Fil de messages par négociation** : lecture pour tous les membres de la négociation ; écriture réservée à Direction et Négociateur.

---

## 7. Décisions de séquencement (tranchées le 13/09/2026)

1. **Calculateur + Gestionnaire de conventions** → étape distincte, après les fondations. L'Étape 1 reste concentrée sur négociations/membres/rôles/mot de passe/messages.
2. **Liens flash** → kill-switch exclusivement côté Direction. Le Négociateur génère un lien et le perçoit comme pleinement actif ; seule la Direction l'active/le désactive réellement (Étape 2, cf. §5).
3. **Vue client avec continuité** → intégrée dès l'Étape 1 (et non reportée en Étape 3 comme envisagé initialement). Voir §6bis.

## 6bis. Vue client (Étape 1) — version définitive : compte authentifié

Décision du 13/09/2026 : **pas de lien public/slug non protégé**. Le client est un 4ᵉ rôle du même système d'authentification que Direction/Négociateur/Apporteur d'affaires — pas un système à part :

| Rôle | Droits |
|---|---|
| **Client** | Se connecte avec Email + mot de passe attribué. Voit uniquement sa propre négociation, en lecture seule : statut/étape courante, liens actuellement pertinents sélectionnés par Direction. Ne voit jamais le fil de messages interne, ni les membres, ni les autres négociations. |

- Le compte client est créé **à la création de la négociation**, par Direction ou par le Négociateur (mot de passe généré ou choisi à ce moment-là).
- Toute connexion du compte client passe par la même boîte noire que les autres rôles — traçabilité complète de l'interlocuteur officiel.
- Contenu affiché toujours piloté depuis Gestion du Projet (pas de mécanisme d'expiration automatique des liens à ce stade — ça reste l'Étape 2).

---

## 8. Journal des étapes

| Étape | Contenu | Statut |
|---|---|---|
| Cadrage | Rôles, architecture unifiée, modèle négociation, présent document | ✅ Feu vert du 13/09/2026 |
| Étape 1 | Petite base de données, mot de passe serveur, négociations, membres, rôles, messages, voir comme, boîte noire, **vue client minimale** | ✅ Séquencement validé — plan d'exécution à suivre |
| Étape 2 | Activation/désactivation à distance des liens (kill-switch Direction), liens à expiration | Non démarrée |
| Étape 3 | (fusionnée dans l'Étape 1, cf. §6bis) | — |

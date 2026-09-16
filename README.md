# EVOTEX 1.0 — Espace Commercial

Site statique autonome (HTML/CSS/JS pur, sans framework, sans backend) — **totalement séparé du code de l'ERP BATEXCI** (`Batexci ERP/app-web`). Aucune logique interne de coût, de marge ou de structure technique de l'ERP n'existe dans ce site — il ne contient que du contenu commercial destiné à être montré ou envoyé à un prospect.

## Contenu

- `index.html` — coquille de la page, routeur par ancre (`#/`, `#/socle-lancement`, `#/expression-besoins`, `#/licences`).
- `css/` — tokens de design partagés (`tokens.css`) + une feuille de style par vue.
- `js/` — un fichier par vue (`hub.js`, `socle-lancement.js`, `besoins.js`, `licences.js`) + le routeur (`router.js`).

Le **Socle de Lancement** (`#/socle-lancement`) reproduit à l'identique les 12 pages du deck de présentation exécutive d'origine (format diaporama paysage, navigation précédent/suivant + points de pagination). Les liens « En savoir plus » de la Grille de Licences y renvoient directement sur la page de l'offre concernée (`#/socle-lancement/licence-deploiement`, `.../licence-saas`, `.../licence-vente-totale`).

Aucune dépendance, aucun `package.json`, aucune étape de build. Le site peut s'ouvrir directement ou être servi par n'importe quel serveur de fichiers statiques.

Le Calculateur de Coût interne (charges, marge, prix de vente suggéré) est **définitivement exclu de cet espace** — il n'existe plus dans ce dossier et doit vivre ailleurs, dans un espace strictement interne, jamais partagé avec un prospect.

## Aperçu en local

Depuis ce dossier :

```bash
npx serve .
```

Puis ouvrez l'URL affichée (ex. `http://localhost:3000`).

## Déploiement sur Vercel (nouveau projet, séparé de l'ERP)

1. Sur [vercel.com](https://vercel.com), créez un **nouveau projet** (pas dans le projet existant de l'ERP).
2. Deux options :
   - **Sans Git** : `npx vercel` depuis ce dossier, puis suivez les instructions (déploiement direct du dossier).
   - **Avec Git** (recommandé pour les mises à jour futures) : créez un nouveau dépôt GitHub vide, poussez ce dossier dedans, puis connectez ce dépôt à un nouveau projet Vercel. Vercel détecte un site statique automatiquement (aucune configuration de build nécessaire — laissez "Framework Preset" sur "Other").
3. Le lien obtenu (ex. `votre-projet.vercel.app`) est totalement indépendant de celui de l'ERP.

## Confidentialité

- La balise `<meta name="robots" content="noindex, nofollow">` décourage l'indexation par les moteurs de recherche, mais **le lien reste accessible à quiconque le possède** — ce n'est pas une protection par mot de passe.
- Ce site ne contient aucune information technique sur la structure interne de l'ERP (le cahier des charges technique n'est pas publié ici) ni aucune logique de coût/marge — seul du contenu commercial destiné à être vu par un prospect.
- Pour restreindre davantage l'accès (mot de passe réel, restriction par IP, etc.), Vercel propose une protection par mot de passe au niveau du projet dans les paramètres (fonctionnalité payante selon le plan).

## Demandes envoyées par e-mail

Deux formulaires envoient leurs réponses par `mailto:` (ouverture du client email par défaut du visiteur, pré-rempli) vers **evolutis223@gmail.com** :
- **Cahier des Charges Client** (`#/expression-besoins`) — coordonnées, périmètre du projet, modules souhaités, budget, besoins spécifiques.
- **Demande de devis** (`#/licences`, modale sur chaque carte) — coordonnées, offre choisie, délai, durée de suivi, budget.

Aucune donnée n'est stockée ni envoyée à un serveur — cohérent avec l'absence totale de backend sur ce site.

# Zyren AI Universe — V4

Site vitrine statique, indépendant, avec quatre pages et des univers visuels distincts.

## Lancer

Ouvrir `index.html` dans un navigateur, ou servir le dossier `ZyrenAI_V4` via localhost (Live Server / Apache / Python `python -m http.server 8000`). Les liens sont relatifs : ne déplace pas les HTML sans les dossiers `css`, `js`, `assets`.

## Arborescence

- `index.html` — accueil
- `eva.html` — interface de chat Eva simulée
- `capri.html` — bureau et réactions Capri simulés
- `discord.html` — interface Discord simulée
- `css/global.css`, `css/eva.css`, `css/capri.css`, `css/discord.css`
- `js/main.js`, `js/eva.js`, `js/capri.js`, `js/discord.js`
- `assets/videos/eva.mp4`, `capri.mp4`, `discord.mp4` (facultatifs)

## Vidéos

Déposer une vidéo MP4 sous le nom exact dans `assets/videos/`. Si la vidéo est absente, un encart de remplacement est affiché. Les démonstrations HTML ne contrôlent ni Windows, ni Capri, ni Discord.

## Publication

Publier le contenu de ce dossier à la racine du dépôt GitHub Pages (ou adapter le répertoire servi). Les pages utilisent des chemins relatifs, compatibles avec un sous-répertoire comme `localhost/ZyrenAI/`.

## Crédits

Site de présentation personnel Zyren AI Lab. Capri est un projet tiers, lien officiel : https://capriai.app/. Aucun partenariat officiel revendiqué. Les éléments d'interface sont des maquettes originales et ne reprennent pas les ressources de Capri ou Discord.

## Accessibilité et performance

Mise en page responsive, animations CSS et JS légères, `prefers-reduced-motion`, aucune bibliothèque JS externe. Google Fonts est facultatif ; des polices système prennent le relais hors ligne.


## V4.1 — Démonstration Eva améliorée

La page `eva.html` contient maintenant un bureau Windows **fictif** synchronisé avec un chat interactif, un journal des actions, des réponses temporisées et des exemples cliquables. Aucun accès aux applications Windows, au micro, à l'écran réel ou à Discord.

Fichiers modifiés : `eva.html`, `css/eva.css`, `js/eva.js`. Pour une mise à jour ciblée, remplace uniquement ces trois fichiers en conservant les dossiers.


## Capri V4.2
18 sprites PNG issus de sprites.zip dans `assets/capri/`. Expressions et clignements simulés sur la page Capri. Les commandes ne pilotent pas Capri installé.


## V5 — Démonstrations interactives
- `capri.html` : bureau fictif déplaçable avec Capri (glisser-déposer), sprites PNG fournis, humeurs, musique, notes, mainframe et clignement. Le vrai Capri n'est pas piloté par cette page.
- `discord.html` : interface Discord fictive, salons, messages, saisie libre, commandes slash `/help`, `/ping`, `/profil`, `/stats`, `/avatar`, embeds et réponses simulées. Aucun bot ni serveur réel connecté.
- Les scripts spécifiques sont `js/capri-playground.js` et `js/discord-lab.js`.
- Le site fonctionne sans installation Node/Python ni backend : HTML, CSS et JavaScript dans le navigateur. Conserver l'arborescence lors de l'extraction.
- Tous les sprites viennent du fichier sprites.zip fourni par l'utilisateur.

# Zyren AI Lab — Documentation officielle 2.0

> Portfolio statique, démonstrations interactives et documentation technique. Version publique officielle : **2.0** · 17 novembre 2026.

## 1. Présentation

Zyren AI Lab est un site vitrine statique dédié aux projets EVA Windows, EVA Discord et Capri. Il présente des prototypes, des simulations interactives, les choix techniques et les limites de chaque démonstration. Les interfaces du site **ne sont pas des connexions à des services privés**.

### Objectifs
- Montrer des projets concrets plutôt qu'une simple galerie d'images.
- Permettre l'exploration sans installation et sans accès aux machines de l'auteur.
- Séparer les démonstrations du site des véritables applications locales.
- Documenter les décisions de conception, les versions et les limites.
- Rester compatible avec GitHub Pages et les hébergements de fichiers statiques.

## 2. Carte du site

| Page | Rôle |
|---|---|
| `index.html` | Accueil, identité visuelle, présentation des trois projets, terminal ZyrenOS |
| `eva.html` | EVA Windows, commandes et démonstration d'interface |
| `discord.html` | EVA Discord, modules, simulation et architecture |
| `capri.html` | Compagnon Capri, sprites et interface animée |
| `lab.html` | Simulations interactives EVA Discord, dashboard et Capri |
| `portfolio.html` | Portfolio technique, études de cas, architecture et outils |
| `journal.html` | Journal technique détaillé, lisible depuis le site |
| `mentions-legales.html` | Informations légales |

## 3. EVA Windows — assistant de bureau

**But :** assistant local pour Windows combinant commandes vocales françaises, chat et personnage pixel art. Le projet applicatif est distinct de la démonstration web.

**Pistes et fonctionnalités travaillées :** C#/.NET 8 WinForms ; reconnaissance vocale Vosk FR ; commandes ouvrir/fermer des applications ; plans d'actions multi-étapes (`/plan`, `/executer`, `/annuler`) ; gestion du micro ; panneaux Chat, Applications, Tenues, Animations, Mémoire, Thèmes et Système ; suivi CPU/RAM/GPU/VRAM ; interactions Discord Rich Presence.

**Points d'attention :** certaines fonctions ont connu des erreurs de compilation et de fonctionnement (notamment fenêtres, tenues et Discord RP). Ne pas présenter l'ensemble comme une version stable ou validée. Les commandes Windows ne sont pas exécutées par le site.

## 4. EVA Discord — bot communautaire

**But :** bot Python pour Discord, réunissant configuration, modération, IA, communauté et automatisations.

**Architecture de travail :** processus bot Python privé ; modules/cogs ; routeur IA et moteurs Claude, Groq ou Ollama selon configuration ; dashboard privé local ; configuration par serveur.

**Huit domaines de configuration présentés dans le laboratoire :** intelligence IA, protection, journaux, communauté, niveaux XP, automatisations, confidentialité et accueil. Les réglages du laboratoire sont **fictifs** et n'écrivent jamais dans le serveur Discord.

**État de l'IA :** des tests directs d'Ollama ont fonctionné, mais la commande `/ask` du bot a rencontré une indisponibilité des fournisseurs (`ProviderUnavailable providers={}`). Cette intégration doit être considérée comme en cours de diagnostic, non comme un service public opérationnel.

**Sécurité :** ne pas publier les tokens Discord, les clés IA, les identifiants privés, les fichiers `.env`, les bases de données ni le dashboard local.

## 5. Capri — compagnon animé

**But :** présenter un compagnon de bureau animé, avec expressions, tenues et interactions. Les sprites sont conservés dans `assets/capri/`.

**Historique technique :** exploration d'un compagnon Chrome/Ollama, d'un runtime local et d'une application Windows Capri. La page publique propose une expérience illustrative et un studio de sprites, sans contrôle réel du bureau. Capri est présenté comme un projet distinct de l'univers EVA ; éviter de revendiquer la création du logiciel tiers d'origine.

## 6. Démonstrations et limites

- **ZyrenOS :** terminal simulé dans le navigateur. Les commandes affichent des informations ou naviguent sur le site ; aucune commande système n'est exécutée.
- **AI Lab :** démonstrations à données fictives, sans connexion au bot ou au dashboard privé.
- **EVA :** interface illustrative, pas une exécution distante de l'assistant Windows.
- **Capri :** interactions visuelles, pas un accès au compagnon installé sur l'ordinateur du visiteur.
- **Explorateurs de fonctionnalités :** les anciennes sections vidéo sont remplacées par six modules propres à chaque projet, avec détails accessibles au clic et liens vers les démonstrations existantes.

## 7. Architecture du site

```text
Navigateur
  ├── Pages HTML (accueil, projets, lab, portfolio, journal)
  ├── CSS (thème, composants, responsive, améliorations V15)
  ├── JavaScript (navigation, simulations, animations, terminal)
  └── Assets (sprites et visuels locaux)

Applications privées (hors site)
  ├── EVA Windows / C#
  ├── EVA Discord / Python + dashboard local
  └── Capri / runtime local
```

Aucun backend n'est nécessaire pour servir le site. Les données des démonstrations ne constituent pas des données de production.

## 8. Historique des blocs (versions antérieures à 2.0)

| Bloc | Livrables |
|---|---|
| V12 | Refonte visuelle et enrichissement de la fiche EVA Discord |
| V13 — Visual Experience | Identité cyberpunk, animations, terminal ZyrenOS et interface néon |
| V14 — Interactive AI Lab | Simulations des huit panneaux EVA Discord, dashboard fictif, studio Capri |
| V15 — Developer Portfolio | Études de cas, architecture, stack, historique, documentation et harmonisation |

Les numéros V13/V14/V15 désignent des **blocs du site**, pas des versions du bot Discord ou des applications Windows.

## 9. Installation et publication

1. Extraire l'archive.
2. Ouvrir `index.html` pour un premier contrôle.
3. Pour un test plus réaliste, utiliser un serveur statique local (`python -m http.server 8000`).
4. Vérifier navigation, terminal, démos, responsive et console du navigateur.
5. Publier le contenu du dossier `ZyrenAI-git/` à la racine de la branche GitHub Pages choisie.
6. Ne jamais inclure de secrets ou fichiers privés dans le dépôt.

## 10. Tests recommandés

- Liens internes et chemins relatifs depuis toutes les pages.
- Menu mobile, fermeture par Échap et navigation au clavier.
- Terminal ZyrenOS, historique et commandes documentées.
- Simulations AI Lab sans requêtes privées.
- Images Capri, contraste, tailles d'écran, réduction des animations.
- Console JavaScript sans erreurs, et chargement des assets en HTTPS.

## 11. Améliorations futures

- Ajouter de véritables captures ou enregistrements lorsque disponibles et autorisés.
- Documenter des tests reproductibles et des résultats mesurés.
- Améliorer les performances des animations sur machines modestes.
- Ajouter une documentation technique plus profonde pour chaque dépôt public.
- Effectuer un audit complet d'accessibilité et de compatibilité mobile.

## 12. Inventaire du dépôt

### Feuilles de style
- `css/capri-real.css`
- `css/capri.css`
- `css/design.css`
- `css/discord.css`
- `css/eva-discord-v12.css`
- `css/eva.css`
- `css/global.css`
- `css/legal.css`
- `css/orbit-v9.css`
- `css/signal-v10.css`
- `css/v11.css`
- `css/v12.css`
- `css/v13.css`
- `css/v14-lab.css`
- `css/v15-portfolio.css`
- `css/v6.css`
- `css/v7.css`
- `css/v8.css`

### Scripts
- `js/capri-playground.js`
- `js/capri-real.js`
- `js/capri-touch.js`
- `js/capri-v6.js`
- `js/capri.js`
- `js/discord-lab.js`
- `js/discord-v6.js`
- `js/discord.js`
- `js/eva-v6.js`
- `js/eva.js`
- `js/lab-v14.js`
- `js/main.js`
- `js/progress-v7.js`
- `js/signal-v10.js`
- `js/site-v11.js`
- `js/site-v12.js`
- `js/site-v13.js`
- `js/site-v15.js`
- `js/site-v6.js`
- `js/uiverse-v8.js`

### Sprites Capri

75 images PNG présentes dans `assets/capri/` (noms conservés pour compatibilité).

## 13. Maintenance

Modifier les contenus dans les pages HTML et les composants associés. `css/refinement-v15.css` centralise les améliorations de cartes, de navigation et de documentation. Ne pas ajouter de pourcentages d'avancement sans critères mesurables. Les liens de démonstration doivent pointer vers des fonctionnalités existantes.

## 14. Crédits et transparence

Les noms des produits et services tiers restent la propriété de leurs détenteurs. Les prototypes et simulations sont présentés à des fins de portfolio ; ils ne constituent pas des services publics connectés ou des preuves de disponibilité en production.

## 15. Explorateurs de fonctionnalités et lecteur de documentation

Chaque page projet (`eva.html`, `discord.html`, `capri.html`) possède désormais une grille de six fonctionnalités propres au projet. Les cartes ouvrent un panneau de détail dans la même page, accessible au clavier, refermable par le bouton de fermeture ou la touche Échap. Le panneau renvoie vers les simulations disponibles et indique explicitement leur caractère illustratif.

Le journal `journal.html` affiche les sections du présent README sous forme de HTML rendu depuis Markdown lors de la construction du site. Les titres, listes, tableaux, citations et blocs de code sont stylés pour conserver un contraste suffisant. Le sommaire est navigable et une recherche locale filtre les sections sans requête réseau. Pour mettre à jour la documentation affichée, il faut régénérer `journal.html` à partir du README (le navigateur n'exécute aucun moteur Markdown distant).

Fichiers ajoutés : `css/feature-explorer-v15.css`, `js/feature-explorer-v15.js`, `css/docs-reader-v15.css`, `js/docs-reader-v15.js`.


## 16. Version officielle 2.0 — convention de publication

**Zyren AI Lab 2.0** est le nom de la version publique consolidée du site. Les noms V12, V13, V14 et V15 mentionnés dans l'historique décrivent les étapes antérieures de développement ; ils ne sont plus des versions publiques concurrentes.

- Le site reste entièrement statique et compatible avec GitHub Pages.
- Les démonstrations ne se connectent pas aux applications privées ni aux serveurs Discord réels.
- Les fichiers CSS et JavaScript historiques conservent leur nom pour ne pas rompre les dépendances ; le nom d'un fichier ne constitue pas la version publiée.
- Les pages du site partagent désormais une feuille de style de consolidation `css/zyren-2.0.css` et un script `js/zyren-2.0.js`.
- Le lecteur de documentation a été retravaillé pour le contraste, la hiérarchie visuelle, la navigation et les petits écrans.
- Les fonctionnalités des projets locaux sont documentées comme expérimentales lorsque leur validation n'est pas confirmée.


## Démonstration EVA Discord — ZyrenAI 2.0

La page `discord.html` propose un simulateur Discord local, réalisé en HTML, CSS et JavaScript. Il reprend les colonnes de serveurs, de salons, de messages et de membres. Les salons `#annonces`, `#règlement`, `#général`, `#projets`, `#eva-bot`, `#niveaux`, `#tickets`, `#logs` et le salon vocal fictif possèdent chacun leur contenu.

Dans `#eva-bot`, taper `/` ouvre une liste de commandes filtrée au clavier. Les commandes simulées comprennent `/help`, `/ping`, `/profil`, `/stats`, `/avatar`, `/config`, `/ask`, `/warn`, `/timeout`, `/purge`, `/ticket`, `/xp` et `/clear`. `/config` ouvre huit modules interactifs avec réglages fictifs (Accueil, Intelligence IA, Protection, Journaux, Communauté, Niveaux XP, Automatisations, Confidentialité). Les avertissements et tickets de démonstration alimentent les salons correspondants.

**Confidentialité :** le simulateur n'appelle aucune API, n'envoie aucun message Discord, n'accède à aucune clé privée et ne conserve aucun paramètre au-delà de la session de page. Les réponses IA sont pré-écrites et clairement identifiées comme simulées.

**Fichiers :** `css/discord-simulator-2.css`, `js/discord-simulator-2.js` et `discord.html`. Les anciens scripts de simulation sont conservés dans le projet pour compatibilité historique, mais ne sont plus chargés par `discord.html`.

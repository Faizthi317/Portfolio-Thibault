# Portfolio — Thibault Mesmin

Portfolio personnel présentant mon parcours de reconversion, mes compétences et mes projets en développement web.

## À propos

Ancien sapeur-pompier de Paris, je me suis reconverti dans le développement logiciel.
Ce site met en avant :

- mon profil et mes compétences techniques,
- mes projets,
- une page dédiée à mon parcours,
- un formulaire de contact.

Le projet a été construit avec une approche **HTML/CSS/JavaScript vanilla**, avec l’aide de l’IA pour accélérer l’idéation et certaines tout en comprenant le système de prompts pour l'IA générative.

## Fonctionnalités

- Navigation multi-pages (`Accueil`, `Parcours`, `Contact`)
- Menu responsive (desktop + mobile)
- Changement de thème (clair/sombre) avec persistance via `localStorage`
- Animations d’apparition au scroll
- Mise en avant automatique de la section active sur la page d’accueil
- Formulaire de contact connecté à Formspree

## Stack technique

- HTML5
- CSS3
- JavaScript (ES6+)
- Formspree (envoi du formulaire de contact)

## Structure du projet

```text
Portefolio/
├── index.html
├── src/
│   ├── parcours/
│   │   ├── parcours.html
│   │   └── parcours.css
│   └── contact/
│       ├── contact.html
│       └── contact.css
├── tests/
│   ├── script.test.js
│   └── perf/
│       ├── run-lighthouse.sh
│       ├── run-jmeter.sh
│       └── jmeter-static-site.jmx
├── styles.css
├── script.js
├── README.md
└── assets/
```

## Tests

### Tests unitaires

```bash
npm run test
```

### Tests de performance (Lighthouse)

```bash
npm run perf:lighthouse
```

Le script audite par défaut `http://127.0.0.1:4173/index.html` et démarre un serveur local temporaire si nécessaire.

Pour auditer une URL spécifique (ex: version déployée) :

```bash
bash ./tests/perf/run-lighthouse.sh "https://ton-site.com"
```

Les rapports sont générés dans `tests/perf/results/`.

### Tests de charge (JMeter)

Prérequis (macOS) :

```bash
brew install jmeter
```

Lancer un test de charge sur le plan fourni :

```bash
npm run perf:jmeter
```

Variables disponibles :

- `JMETER_PROTOCOL` (défaut: `http`)
- `JMETER_HOST` (défaut: `127.0.0.1`)
- `JMETER_PORT` (défaut: `4173`)
- `JMETER_USERS` (défaut: `50`)
- `JMETER_RAMPUP` (défaut: `30`)
- `JMETER_LOOPS` (défaut: `10`)

Exemple :

```bash
JMETER_USERS=100 JMETER_RAMPUP=60 JMETER_LOOPS=20 npm run perf:jmeter
```

Rapports JMeter générés dans `tests/perf/results/`.

## Lancer le projet en local

### Option 1 — Ouverture directe

Ouvrir le fichier `index.html` dans un navigateur.

### Option 2 — Serveur local (recommandé)

Avec VS Code, utiliser une extension type **Live Server** pour un rechargement automatique.

## Formulaire de contact

Le formulaire de `src/contact/contact.html` envoie les données vers l’endpoint Formspree défini dans l’attribut `action` du formulaire.

Endpoint actuel :

```html
https://formspree.io/f/mbdapark
```

Pour utiliser ton propre endpoint :

1. Crée un formulaire sur Formspree.
2. Remplace l’URL dans `src/contact/contact.html`.

## Personnalisation

- Modifier les textes et sections dans `index.html`, `src/parcours/parcours.html`, `src/contact/contact.html`
- Adapter le style global dans `styles.css`
- Ajuster les comportements JS dans `script.js`
- Remplacer les images/médias dans `assets/`

## CI/CD

Le workflow GitHub Actions est défini dans `.github/workflows/ci-cd.yml`.

- **CI** : à chaque `push` et `pull_request` sur `main`, le pipeline lance :
	- `npm ci`
	- `npm run test`
- **CD** : sur `push` vers `main` uniquement, le site est déployé automatiquement sur **GitHub Pages**.

### Activation GitHub Pages

1. Ouvrir **Settings > Pages** dans le repository GitHub.
2. Dans **Build and deployment**, choisir **Source: GitHub Actions**.
3. Push sur `main` pour déclencher le premier déploiement.

## Auteur

**Thibault Mesmin**

- GitHub : https://github.com/Faizthi317
- LinkedIn : https://www.linkedin.com/in/thibault-m-952951241

## Licence

Ce projet est publié à des fins de démonstration de portfolio personnel.

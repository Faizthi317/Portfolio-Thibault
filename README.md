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
├── parcours.html
├── contact.html
├── styles.css
├── script.js
├── README.md
└── assets/
```

## Lancer le projet en local

### Option 1 — Ouverture directe

Ouvrir le fichier `index.html` dans un navigateur.

### Option 2 — Serveur local (recommandé)

Avec VS Code, utiliser une extension type **Live Server** pour un rechargement automatique.

## Formulaire de contact

Le formulaire de `contact.html` envoie les données vers l’endpoint Formspree défini dans l’attribut `action` du formulaire.

Endpoint actuel :

```html
https://formspree.io/f/mbdapark
```

Pour utiliser ton propre endpoint :

1. Crée un formulaire sur Formspree.
2. Remplace l’URL dans `contact.html`.

## Personnalisation

- Modifier les textes et sections dans `index.html`, `parcours.html`, `contact.html`
- Adapter le style global dans `styles.css`
- Ajuster les comportements JS dans `script.js`
- Remplacer les images/médias dans `assets/`

## Auteur

**Thibault Mesmin**

- GitHub : https://github.com/Faizthi317
- LinkedIn : https://www.linkedin.com/in/thibault-m-952951241

## Licence

Ce projet est publié à des fins de démonstration de portfolio personnel.

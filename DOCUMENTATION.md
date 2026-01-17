# Documentation du Portfolio - Julien PIRAT

## Table des matieres

1. [Architecture du site](#architecture-du-site)
2. [Comment fonctionne le site](#comment-fonctionne-le-site)
3. [Systeme multilingue (FR/EN)](#systeme-multilingue-fren)
4. [Ajouter un projet](#ajouter-un-projet)
5. [Modifier un projet](#modifier-un-projet)
6. [Supprimer un projet](#supprimer-un-projet)
7. [Ajouter un systeme](#ajouter-un-systeme)
8. [Modifier un systeme](#modifier-un-systeme)
9. [Supprimer un systeme](#supprimer-un-systeme)
10. [Gestion des categories](#gestion-des-categories)
11. [Gestion des images et medias](#gestion-des-images-et-medias)
12. [Modifier les textes de l'interface](#modifier-les-textes-de-linterface)

---

## Architecture du site

```
julienpirat.github.io/
├── index.html          # Page principale du site
├── data.json           # FICHIER PRINCIPAL - Donnees projets/systemes + traductions
├── css/
│   └── style.css       # Styles visuels du site
├── js/
│   └── main.js         # Logique JavaScript (generation, modals, filtres, langue)
├── Assets/
│   ├── Images/         # Images des projets
│   └── Gifs/           # GIFs pour les systemes
└── DOCUMENTATION.md    # Ce fichier
```

---

## Comment fonctionne le site

### Principe de modularite

Le site fonctionne sur un principe simple : **toutes les donnees sont centralisees dans `data.json`**.

Quand le site se charge :
1. Le fichier `main.js` charge `data.json`
2. La langue est recuperee depuis `localStorage` (defaut: francais)
3. Les cartes de projets et systemes sont generees dans la langue active
4. Les filtres sont crees a partir des categories definies dans `data.json`
5. Quand on clique sur une carte, le modal s'ouvre avec les details traduits

**Avantage** : Pour ajouter, modifier ou supprimer un projet, il suffit de modifier `data.json`. Aucune modification de code HTML ou JavaScript n'est necessaire.

### Structure de data.json

```json
{
  "profile": { ... },      // Informations personnelles
  "ui": {                  // Textes de l'interface (FR + EN)
    "fr": { ... },
    "en": { ... }
  },
  "skills": [ ... ],       // Liste des competences
  "projects": [ ... ],     // Liste des projets (avec traductions)
  "systems": [ ... ],      // Liste des systemes techniques (avec traductions)
  "categories": {          // Categories pour les filtres (FR + EN)
    "fr": [ ... ],
    "en": [ ... ]
  }
}
```

---

## Systeme multilingue (FR/EN)

### Fonctionnement

- **Langue par defaut** : Francais (`fr`)
- **Bouton de langue** : En haut a droite du header (FR | EN)
- **Sauvegarde** : La preference est stockee dans `localStorage`
- **Cle** : `portfolioLang`

### Structure des textes bilingues

Tous les textes traduisibles utilisent un objet avec les cles `fr` et `en` :

```json
{
  "shortDescription": {
    "fr": "Description en francais",
    "en": "Description in English"
  }
}
```

### Champs bilingues dans les projets

| Champ | Bilingue | Exemple |
|-------|----------|---------|
| `name` | Non | `"Arcanthys"` |
| `category` | Oui | `{ "fr": "Game Jam", "en": "Game Jam" }` |
| `shortDescription` | Oui | `{ "fr": "...", "en": "..." }` |
| `fullDescription` | Oui | `{ "fr": "...", "en": "..." }` |
| `contributions` | Oui | `{ "fr": ["..."], "en": ["..."] }` |
| `role` | Oui | `{ "fr": "Programmeur Gameplay", "en": "Gameplay Programmer" }` |
| `team` | Oui | `{ "fr": "6 developpeurs", "en": "6 developers" }` |
| `date` | Oui | `{ "fr": "Juin 2024", "en": "June 2024" }` |
| `award` | Oui | `{ "fr": "Meilleur Prototype", "en": "Best Prototype" }` |
| `tags` | Non | `["Unreal Engine", "C++"]` |
| `technologies` | Non | `"Unreal Engine, C++"` |
| `videoUrl` | Non | `"https://..."` |
| `images` | Non | `["Assets/Images/..."]` |

### Champs bilingues dans les systemes

| Champ | Bilingue | Exemple |
|-------|----------|---------|
| `name` | Non | `"DetourCrowd Navigation"` |
| `category` | Oui | `{ "fr": "Systemes IA", "en": "AI Systems" }` |
| `shortDescription` | Oui | `{ "fr": "...", "en": "..." }` |
| `fullDescription` | Oui | `{ "fr": "...", "en": "..." }` |
| `technicalDetails` | Oui | `{ "fr": ["..."], "en": ["..."] }` |
| `tags` | Non | `["IA", "Navigation"]` |
| `technologies` | Non | `"Unreal Engine, C++"` |
| `context` | Non | `"Arcanthys"` |

---

## Ajouter un projet

### Etape 1 : Ouvrir data.json

### Etape 2 : Trouver le tableau "projects"

```json
"projects": [
  { ... projet existant ... },
  { ... projet existant ... }
]
```

### Etape 3 : Ajouter un nouvel objet projet

Ajouter une virgule apres le dernier projet, puis coller ce template :

```json
{
  "id": "nom-unique-du-projet",
  "name": "Nom du Projet",
  "category": {
    "fr": "Game Jam",
    "en": "Game Jam"
  },
  "categoryId": "game-jam",
  "tags": ["Unreal Engine", "C++", "Blueprints"],
  "shortDescription": {
    "fr": "Description courte en francais (2-3 lignes max).",
    "en": "Short description in English (2-3 lines max)."
  },
  "fullDescription": {
    "fr": "Description complete en francais.\n\nUtiliser \\n pour les sauts de ligne.",
    "en": "Full description in English.\n\nUse \\n for line breaks."
  },
  "contributions": {
    "fr": [
      "Premiere contribution en francais",
      "Deuxieme contribution"
    ],
    "en": [
      "First contribution in English",
      "Second contribution"
    ]
  },
  "award": {
    "fr": "",
    "en": ""
  },
  "videoUrl": "",
  "images": [],
  "technologies": "Unreal Engine 5, C++, Blueprints",
  "role": {
    "fr": "Programmeur Gameplay",
    "en": "Gameplay Programmer"
  },
  "team": {
    "fr": "4 developpeurs",
    "en": "4 developers"
  },
  "date": {
    "fr": "Juin 2024",
    "en": "June 2024"
  },
  "institution": "",
  "links": {
    "itch": "",
    "github": ""
  }
}
```

### Champs obligatoires

| Champ | Description | Exemple |
|-------|-------------|---------|
| `id` | Identifiant unique (pas d'espaces, minuscules, tirets) | `"mon-super-projet"` |
| `name` | Nom affiche du projet | `"Mon Super Projet"` |
| `category` | Categorie bilingue | `{ "fr": "Game Jam", "en": "Game Jam" }` |
| `categoryId` | ID correspondant au filtre | `"game-jam"` |
| `tags` | Technologies utilisees (tableau) | `["Unreal Engine", "C++"]` |
| `shortDescription` | Description courte bilingue | `{ "fr": "...", "en": "..." }` |
| `fullDescription` | Description complete bilingue | `{ "fr": "...", "en": "..." }` |
| `technologies` | Technologies (texte simple) | `"Unreal Engine 5, C++"` |
| `role` | Role bilingue | `{ "fr": "...", "en": "..." }` |
| `team` | Taille equipe bilingue | `{ "fr": "...", "en": "..." }` |
| `date` | Date bilingue | `{ "fr": "Juin 2024", "en": "June 2024" }` |

### Champs optionnels

| Champ | Description | Exemple |
|-------|-------------|---------|
| `contributions` | Liste bilingue des taches | `{ "fr": [...], "en": [...] }` |
| `award` | Prix obtenu bilingue | `{ "fr": "Meilleur Prototype", "en": "Best Prototype" }` |
| `videoUrl` | URL YouTube embed | `"https://www.youtube.com/embed/VIDEO_ID"` |
| `images` | Chemins vers les images | `["Assets/Images/projet.png"]` |
| `institution` | Universite/ecole | `"UQAC"` |
| `links.itch` | Lien itch.io | `"https://xxx.itch.io/projet"` |
| `links.github` | Lien GitHub | `"https://github.com/xxx/projet"` |

### Valeurs de categoryId disponibles

| categoryId | Categorie FR | Categorie EN |
|------------|--------------|--------------|
| `in-development` | En developpement | In Development |
| `game-jam` | Game Jam | Game Jam |
| `competition` | Concours | Competition |
| `university` | Universitaire | University |
| `personal` | Personnel | Personal |

### Exemple complet bilingue

```json
{
  "id": "space-explorer",
  "name": "Space Explorer",
  "category": {
    "fr": "Game Jam",
    "en": "Game Jam"
  },
  "categoryId": "game-jam",
  "tags": ["Unreal Engine", "Blueprints", "Sci-Fi"],
  "shortDescription": {
    "fr": "Jeu d'exploration spatiale realise en 48h lors de la Global Game Jam 2024.",
    "en": "Space exploration game made in 48h during Global Game Jam 2024."
  },
  "fullDescription": {
    "fr": "Space Explorer est un jeu d'exploration spatiale ou le joueur doit naviguer entre les asteroides pour trouver des ressources.\n\nLe jeu a ete realise en 48 heures avec une equipe de 5 personnes.",
    "en": "Space Explorer is a space exploration game where the player must navigate between asteroids to find resources.\n\nThe game was made in 48 hours with a team of 5 people."
  },
  "contributions": {
    "fr": [
      "Systeme de deplacement du vaisseau",
      "Generation procedurale des asteroides",
      "Systeme de collecte de ressources"
    ],
    "en": [
      "Spaceship movement system",
      "Procedural asteroid generation",
      "Resource collection system"
    ]
  },
  "award": {
    "fr": "Prix du Public",
    "en": "Audience Award"
  },
  "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "images": ["Assets/Images/space-explorer.png"],
  "technologies": "Unreal Engine 5.3, Blueprints",
  "role": {
    "fr": "Programmeur Gameplay",
    "en": "Gameplay Programmer"
  },
  "team": {
    "fr": "5 developpeurs",
    "en": "5 developers"
  },
  "date": {
    "fr": "Janvier 2024",
    "en": "January 2024"
  },
  "links": {
    "itch": "https://exemple.itch.io/space-explorer",
    "github": ""
  }
}
```

---

## Modifier un projet

1. Ouvrir `data.json`
2. Trouver le projet par son `id` ou son `name`
3. Modifier les champs souhaites (penser aux deux langues si bilingue)
4. Sauvegarder le fichier

---

## Supprimer un projet

1. Ouvrir `data.json`
2. Trouver le projet dans le tableau `"projects"`
3. Supprimer l'objet entier (avec les accolades `{ }`)
4. Verifier qu'il n'y a pas de virgule orpheline
5. Sauvegarder le fichier

**Attention aux virgules :**

```json
// CORRECT
"projects": [
  { "id": "projet-1", ... },
  { "id": "projet-2", ... }
]

// INCORRECT (virgule en trop)
"projects": [
  { "id": "projet-1", ... },
]
```

---

## Ajouter un systeme

### Template pour un nouveau systeme

Ajouter dans le tableau `"systems"` de `data.json` :

```json
{
  "id": "nom-unique-systeme",
  "name": "Nom du Systeme",
  "category": {
    "fr": "Systemes IA",
    "en": "AI Systems"
  },
  "categoryId": "ai-systems",
  "tags": ["IA", "Performance", "Unreal Engine"],
  "shortDescription": {
    "fr": "Description courte en francais.",
    "en": "Short description in English."
  },
  "fullDescription": {
    "fr": "Description complete en francais.\n\nExpliquer le probleme resolu et la solution.",
    "en": "Full description in English.\n\nExplain the problem solved and the solution."
  },
  "technicalDetails": {
    "fr": [
      "Detail technique 1 en francais",
      "Detail technique 2"
    ],
    "en": [
      "Technical detail 1 in English",
      "Technical detail 2"
    ]
  },
  "images": ["Assets/Gifs/mon-systeme.gif"],
  "technologies": "Unreal Engine, C++",
  "context": "Arcanthys"
}
```

### Categories de systemes disponibles

| categoryId | Categorie FR | Categorie EN | Icone |
|------------|--------------|--------------|-------|
| `ai-systems` | Systemes IA | AI Systems | Cerveau |
| `performance` | Performance | Performance | CPU |
| `debug-tools` | Outils de Debug | Debug Tools | Cle a molette |

---

## Modifier un systeme

Meme principe que pour les projets :
1. Ouvrir `data.json`
2. Trouver le systeme dans le tableau `"systems"`
3. Modifier les champs (penser aux deux langues)
4. Sauvegarder

---

## Supprimer un systeme

1. Ouvrir `data.json`
2. Trouver et supprimer l'objet du systeme dans `"systems"`
3. Verifier les virgules
4. Sauvegarder

---

## Gestion des categories

### Categories actuelles

Les categories sont definies dans `data.json` sous `"categories"` avec les deux langues :

```json
"categories": {
  "fr": [
    { "id": "all", "name": "Tous", "icon": "grid" },
    { "id": "in-development", "name": "En developpement", "icon": "rocket" },
    { "id": "game-jam", "name": "Game Jam", "icon": "trophy" },
    { "id": "competition", "name": "Concours", "icon": "award" },
    { "id": "university", "name": "Universitaire", "icon": "graduation-cap" },
    { "id": "personal", "name": "Personnel", "icon": "code" },
    { "id": "systems", "name": "Systemes & Outils", "icon": "cog" }
  ],
  "en": [
    { "id": "all", "name": "All", "icon": "grid" },
    { "id": "in-development", "name": "In Development", "icon": "rocket" },
    { "id": "game-jam", "name": "Game Jam", "icon": "trophy" },
    { "id": "competition", "name": "Competition", "icon": "award" },
    { "id": "university", "name": "University", "icon": "graduation-cap" },
    { "id": "personal", "name": "Personal", "icon": "code" },
    { "id": "systems", "name": "Systems & Tools", "icon": "cog" }
  ]
}
```

### Ajouter une nouvelle categorie

1. Ajouter l'objet dans les DEUX tableaux (`fr` et `en`) :

```json
"categories": {
  "fr": [
    ...
    { "id": "professional", "name": "Professionnel", "icon": "briefcase" }
  ],
  "en": [
    ...
    { "id": "professional", "name": "Professional", "icon": "briefcase" }
  ]
}
```

2. Utiliser cette categorie dans vos projets avec le `categoryId` correspondant :

```json
{
  "id": "mon-projet-pro",
  "categoryId": "professional",
  "category": {
    "fr": "Professionnel",
    "en": "Professional"
  },
  ...
}
```

### Icones disponibles

| Nom | Description |
|-----|-------------|
| `grid` | Grille |
| `rocket` | Fusee |
| `trophy` | Trophee |
| `award` | Medaille |
| `graduation-cap` | Chapeau diplome |
| `code` | Code |
| `cog` | Engrenage |

---

## Gestion des images et medias

### Ou placer les fichiers

```
Assets/
├── Images/     # Images PNG, JPG pour les projets
└── Gifs/       # GIFs animes pour les systemes
```

### Ajouter une image a un projet

1. Placer l'image dans `Assets/Images/`
2. Ajouter le chemin dans `data.json` :

```json
"images": ["Assets/Images/mon-projet.png"]
```

### Ajouter un GIF a un systeme

1. Placer le GIF dans `Assets/Gifs/`
2. Ajouter le chemin :

```json
"images": ["Assets/Gifs/mon-systeme.gif"]
```

### Ajouter une video YouTube

1. Aller sur la video YouTube
2. Cliquer sur "Partager" > "Integrer"
3. Copier l'URL du `src` (format : `https://www.youtube.com/embed/VIDEO_ID`)
4. Ajouter dans le projet :

```json
"videoUrl": "https://www.youtube.com/embed/VIDEO_ID"
```

**Note** : La video a priorite sur l'image dans le modal.

---

## Modifier les textes de l'interface

### Ou sont les textes UI

Les textes de l'interface (titres de sections, boutons, labels) sont dans `data.json` sous `"ui"` :

```json
"ui": {
  "fr": {
    "heroAvailable": "Disponible pour opportunites",
    "heroIntro": "Salut, je suis",
    "viewWork": "Voir mes projets",
    "portfolioLabel": "Portfolio",
    "portfolioTitle": "Projets",
    "portfolioDescription": "Une collection de jeux...",
    ...
  },
  "en": {
    "heroAvailable": "Available for opportunities",
    "heroIntro": "Hi, I'm",
    "viewWork": "View My Work",
    "portfolioLabel": "Portfolio",
    "portfolioTitle": "Featured Projects",
    "portfolioDescription": "A collection of games...",
    ...
  }
}
```

### Liste des cles UI disponibles

| Cle | Utilisation |
|-----|-------------|
| `heroAvailable` | Badge "Disponible" dans le hero |
| `heroIntro` | "Salut, je suis" |
| `heroDescription` | Description sous le nom |
| `viewWork` | Bouton "Voir mes projets" |
| `portfolioLabel` | Label section projets |
| `portfolioTitle` | Titre section projets |
| `portfolioDescription` | Description section projets |
| `technicalLabel` | Label section systemes |
| `systemsTitle` | Titre section systemes |
| `systemsDescription` | Description section systemes |
| `aboutLabel` | Label section a propos |
| `aboutTitle` | Titre section a propos |
| `aboutDescription` | Description section a propos |
| `skillsTitle` | Titre carte competences |
| `skillsDescription` | Description carte competences |
| `teamTitle` | Titre carte equipe |
| `teamDescription` | Description carte equipe |
| `educationTitle` | Titre carte formation |
| `educationDescription` | Description carte formation |
| `footerText` | Texte du footer |
| `viewDetails` | "Voir details" sur les cartes |
| `description` | Label "Description" dans modal |
| `contributions` | Label "Mes contributions" |
| `projectDetails` | Label "Details du projet" |
| `technologies` | Label "Technologies" |
| `links` | Label "Liens" |
| `playOnItch` | "Jouer sur itch.io" |
| `viewOnGitHub` | "Voir sur GitHub" |
| `date` | Label "Date" |
| `team` | Label "Equipe" |
| `role` | Label "Role" |
| `overview` | Label "Apercu" |
| `technicalDetails` | Label "Details techniques" |
| `implementationDetails` | Label "Details d'implementation" |
| `projectContext` | Label "Contexte du projet" |
| `specialty` | "Specialite" (carte flottante) |
| `aiSystems` | "Systemes IA" (carte flottante) |
| `currentTeam` | "Equipe actuelle" (carte flottante) |
| `award` | "Prix" (carte flottante) |

### Modifier un texte

1. Ouvrir `data.json`
2. Trouver la cle dans `"ui"` > `"fr"` et `"ui"` > `"en"`
3. Modifier le texte dans les deux langues
4. Sauvegarder

---

## Conseils

### Valider le JSON

Avant de sauvegarder, verifier que le JSON est valide :
- Utiliser un validateur en ligne comme [jsonlint.com](https://jsonlint.com)
- Ou utiliser VS Code qui souligne les erreurs de syntaxe

### Erreurs courantes

1. **Virgule manquante** entre deux objets
2. **Virgule en trop** apres le dernier element d'un tableau
3. **Guillemets manquants** autour des valeurs texte
4. **Oubli d'une langue** : toujours remplir `fr` ET `en` pour les champs bilingues
5. **categoryId incorrect** : doit correspondre a un `id` dans `categories`

### Tester localement

Pour tester le site en local :
1. Utiliser un serveur local (Live Server dans VS Code)
2. Ou `python -m http.server 8000` puis ouvrir `http://localhost:8000`

### Tester le changement de langue

1. Ouvrir le site
2. Cliquer sur FR ou EN dans le header
3. Verifier que tous les textes changent
4. Ouvrir un modal et verifier le contenu
5. Rafraichir la page : la langue doit etre conservee

---

## Resume rapide

| Action | Fichier | Section | Penser aux 2 langues |
|--------|---------|---------|---------------------|
| Ajouter un projet | `data.json` | `"projects"` | Oui |
| Modifier un projet | `data.json` | `"projects"` | Oui |
| Supprimer un projet | `data.json` | `"projects"` | - |
| Ajouter un systeme | `data.json` | `"systems"` | Oui |
| Modifier un systeme | `data.json` | `"systems"` | Oui |
| Supprimer un systeme | `data.json` | `"systems"` | - |
| Ajouter une categorie | `data.json` | `"categories"` | Oui (fr + en) |
| Modifier textes UI | `data.json` | `"ui"` | Oui (fr + en) |
| Ajouter une image | `Assets/Images/` | ref dans `data.json` | Non |
| Ajouter un GIF | `Assets/Gifs/` | ref dans `data.json` | Non |

---

*Documentation mise a jour pour le portfolio bilingue de Julien PIRAT*

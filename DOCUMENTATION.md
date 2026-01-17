# Documentation du Portfolio - Julien PIRAT

## Table des matieres

1. [Architecture du site](#architecture-du-site)
2. [Comment fonctionne le site](#comment-fonctionne-le-site)
3. [Ajouter un projet](#ajouter-un-projet)
4. [Modifier un projet](#modifier-un-projet)
5. [Supprimer un projet](#supprimer-un-projet)
6. [Ajouter un systeme](#ajouter-un-systeme)
7. [Modifier un systeme](#modifier-un-systeme)
8. [Supprimer un systeme](#supprimer-un-systeme)
9. [Gestion des categories](#gestion-des-categories)
10. [Gestion des images et medias](#gestion-des-images-et-medias)

---

## Architecture du site

```
julienpirat.github.io/
├── index.html          # Page principale du site
├── data.json           # FICHIER PRINCIPAL - Toutes les donnees des projets/systemes
├── css/
│   └── style.css       # Styles visuels du site
├── js/
│   └── main.js         # Logique JavaScript (generation des cartes, modals, filtres)
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
2. Les cartes de projets et systemes sont generees automatiquement a partir de ces donnees
3. Les filtres sont crees a partir des categories definies dans `data.json`
4. Quand on clique sur une carte, le modal s'ouvre avec les details du projet/systeme

**Avantage** : Pour ajouter, modifier ou supprimer un projet, il suffit de modifier `data.json`. Aucune modification de code HTML ou JavaScript n'est necessaire.

### Structure de data.json

```json
{
  "profile": { ... },      // Informations personnelles
  "skills": [ ... ],       // Liste des competences
  "projects": [ ... ],     // Liste des projets (cartes principales)
  "systems": [ ... ],      // Liste des systemes techniques
  "categories": [ ... ]    // Categories pour les filtres
}
```

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
  "category": "Game Jam",
  "tags": ["Unreal Engine", "C++", "Blueprints"],
  "shortDescription": "Description courte qui apparait sur la carte (2-3 lignes max).",
  "fullDescription": "Description complete qui apparait dans le modal.\n\nUtiliser \\n pour les sauts de ligne.",
  "contributions": [
    "Premiere contribution/tache realisee",
    "Deuxieme contribution",
    "Troisieme contribution"
  ],
  "award": "",
  "videoUrl": "",
  "images": [],
  "technologies": "Unreal Engine 5, C++, Blueprints",
  "role": "Gameplay Programmer",
  "team": "4 developers",
  "date": "2024",
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
| `id` | Identifiant unique (pas d'espaces, minuscules) | `"mon-super-projet"` |
| `name` | Nom affiche du projet | `"Mon Super Projet"` |
| `category` | Categorie (doit correspondre aux filtres) | `"Game Jam"`, `"University"`, `"Competition"`, `"Personal"`, `"In Development"` |
| `tags` | Technologies utilisees (tableau) | `["Unreal Engine", "C++"]` |
| `shortDescription` | Description pour la carte | `"Jeu de plateforme..."` |
| `fullDescription` | Description complete pour le modal | `"Description longue..."` |
| `technologies` | Technologies (texte) | `"Unreal Engine 5, C++"` |
| `role` | Role dans le projet | `"Gameplay Programmer"` |
| `team` | Taille de l'equipe | `"6 developers"` |
| `date` | Date du projet | `"June 2024"` |

### Champs optionnels

| Champ | Description | Exemple |
|-------|-------------|---------|
| `contributions` | Liste des taches realisees | `["Tache 1", "Tache 2"]` |
| `award` | Prix obtenu (si applicable) | `"Best Prototype"` |
| `videoUrl` | URL YouTube embed | `"https://www.youtube.com/embed/VIDEO_ID"` |
| `images` | Chemins vers les images | `["Assets/Images/projet.png"]` |
| `institution` | Universite/ecole (si applicable) | `"UQAC"` |
| `links.itch` | Lien itch.io | `"https://xxx.itch.io/projet"` |
| `links.github` | Lien GitHub | `"https://github.com/xxx/projet"` |

### Exemple complet

```json
{
  "id": "space-explorer",
  "name": "Space Explorer",
  "category": "Game Jam",
  "tags": ["Unreal Engine", "Blueprints", "Sci-Fi"],
  "shortDescription": "Jeu d'exploration spatiale realise en 48h lors de la Global Game Jam 2024.",
  "fullDescription": "Space Explorer est un jeu d'exploration spatiale ou le joueur doit naviguer entre les asteroides pour trouver des ressources.\n\nLe jeu a ete realise en 48 heures avec une equipe de 5 personnes.",
  "contributions": [
    "Systeme de deplacement du vaisseau",
    "Generation procedurale des asteroides",
    "Systeme de collecte de ressources"
  ],
  "award": "Prix du Public",
  "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "images": ["Assets/Images/space-explorer.png"],
  "technologies": "Unreal Engine 5.3, Blueprints",
  "role": "Gameplay Programmer",
  "team": "5 developers",
  "date": "January 2024",
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
3. Modifier les champs souhaites
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
  "category": "AI Systems",
  "tags": ["AI", "Performance", "Unreal Engine"],
  "shortDescription": "Description courte pour la carte du systeme.",
  "fullDescription": "Description complete du systeme.\n\nExpliquer le probleme resolu et la solution implementee.",
  "technicalDetails": [
    "Detail technique 1",
    "Detail technique 2",
    "Detail technique 3"
  ],
  "images": ["Assets/Gifs/mon-systeme.gif"],
  "technologies": "Unreal Engine, C++",
  "context": "Arcanthys"
}
```

### Champs des systemes

| Champ | Description | Exemple |
|-------|-------------|---------|
| `id` | Identifiant unique | `"mon-systeme"` |
| `name` | Nom affiche | `"Mon Systeme"` |
| `category` | Categorie du systeme | `"AI Systems"`, `"Performance"`, `"Debug Tools"` |
| `tags` | Technologies | `["AI", "C++"]` |
| `shortDescription` | Description carte | `"Systeme de..."` |
| `fullDescription` | Description complete | `"Description longue..."` |
| `technicalDetails` | Details techniques (liste) | `["Detail 1", "Detail 2"]` |
| `images` | GIF ou image | `["Assets/Gifs/systeme.gif"]` |
| `technologies` | Technologies utilisees | `"Unreal Engine, C++"` |
| `context` | Projet ou le systeme est utilise | `"Arcanthys"` |

### Categories de systemes disponibles

Les icones sont automatiquement assignees selon la categorie :

| Categorie | Icone |
|-----------|-------|
| `"AI Systems"` | Cerveau |
| `"Performance"` | CPU |
| `"Debug Tools"` | Cle a molette |

---

## Modifier un systeme

Meme principe que pour les projets :
1. Ouvrir `data.json`
2. Trouver le systeme dans le tableau `"systems"`
3. Modifier les champs
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

Les categories sont definies dans `data.json` sous `"categories"` :

```json
"categories": [
  { "id": "all", "name": "All", "icon": "grid" },
  { "id": "in-development", "name": "In Development", "icon": "rocket" },
  { "id": "game-jam", "name": "Game Jam", "icon": "trophy" },
  { "id": "competition", "name": "Competition", "icon": "award" },
  { "id": "university", "name": "University", "icon": "graduation-cap" },
  { "id": "personal", "name": "Personal", "icon": "code" },
  { "id": "systems", "name": "Systems & Tools", "icon": "cog" }
]
```

### Ajouter une nouvelle categorie

1. Ajouter l'objet dans le tableau `"categories"` :

```json
{ "id": "professional", "name": "Professional", "icon": "briefcase" }
```

2. Utiliser cette categorie dans vos projets :

```json
{
  "id": "mon-projet-pro",
  "category": "Professional",
  ...
}
```

**Important** : La valeur de `category` dans un projet doit correspondre (en minuscules avec tirets) a l'`id` de la categorie.

| Category dans projet | id dans categories |
|---------------------|-------------------|
| `"In Development"` | `"in-development"` |
| `"Game Jam"` | `"game-jam"` |
| `"University"` | `"university"` |

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

**Note** : La video a priorite sur l'image dans le modal. Si `videoUrl` est rempli, c'est la video qui s'affichera.

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
4. **Caracteres speciaux** non echappes (utiliser `\"` pour les guillemets dans le texte)

### Tester localement

Pour tester le site en local :
1. Utiliser un serveur local (Live Server dans VS Code par exemple)
2. Ou simplement ouvrir `index.html` dans un navigateur (certaines fonctionnalites peuvent ne pas marcher a cause des restrictions CORS)

---

## Resume rapide

| Action | Fichier a modifier | Section |
|--------|-------------------|---------|
| Ajouter un projet | `data.json` | `"projects"` |
| Modifier un projet | `data.json` | `"projects"` |
| Supprimer un projet | `data.json` | `"projects"` |
| Ajouter un systeme | `data.json` | `"systems"` |
| Modifier un systeme | `data.json` | `"systems"` |
| Supprimer un systeme | `data.json` | `"systems"` |
| Ajouter une categorie | `data.json` | `"categories"` |
| Ajouter une image | `Assets/Images/` | puis reference dans `data.json` |
| Ajouter un GIF | `Assets/Gifs/` | puis reference dans `data.json` |

---

*Documentation generee pour le portfolio de Julien PIRAT*

# Documentation du Portfolio - Julien PIRAT

## Table des matieres

1. [Architecture du site](#architecture-du-site)
2. [Comment fonctionne le site](#comment-fonctionne-le-site)
3. [Systeme multilingue (FR/EN)](#systeme-multilingue-fren)
4. [Design des cartes](#design-des-cartes)
5. [Pages de projet individuelles](#pages-de-projet-individuelles)
6. [Ajouter un projet](#ajouter-un-projet)
7. [Modifier un projet](#modifier-un-projet)
8. [Supprimer un projet](#supprimer-un-projet)
9. [Ajouter un systeme](#ajouter-un-systeme)
10. [Gestion des categories](#gestion-des-categories)
11. [Gestion des images et medias](#gestion-des-images-et-medias)
12. [Modifier les textes de l'interface](#modifier-les-textes-de-linterface)

---

## Architecture du site

```
julienpirat.github.io/
├── index.html              # Page principale du site
├── data.json               # FICHIER PRINCIPAL - Donnees projets/systemes + traductions
├── css/
│   └── style.css           # Styles visuels du site
├── js/
│   ├── main.js             # Logique principale (cartes, filtres, langue)
│   └── project.js          # Logique des pages projet individuelles
├── projects/               # Pages de projet individuelles
│   ├── arcanthys.html
│   ├── green-rebirth.html
│   ├── clean-dream.html
│   ├── vrecycle.html
│   ├── temple-trap.html
│   ├── vivaldi.html
│   └── tower-defense.html
├── Assets/
│   ├── Images/             # Images des projets
│   └── Gifs/               # GIFs pour les systemes
└── DOCUMENTATION.md        # Ce fichier
```

---

## Comment fonctionne le site

### Principe de modularite

Le site fonctionne sur un principe simple : **toutes les donnees sont centralisees dans `data.json`**.

Quand le site se charge :
1. Le fichier `main.js` charge `data.json`
2. La langue est recuperee depuis `localStorage` (defaut: francais)
3. Les cartes de projets sont generees avec leur video YouTube (si disponible)
4. Les filtres sont crees a partir des categories definies dans `data.json`
5. Quand on clique sur "Voir details", on navigue vers la page du projet

### Nouveau design des cartes

Chaque carte de projet affiche :
- Une video YouTube (miniature avec lecture au survol) ou une image
- Le nom du projet et le role
- Les metadonnees : taille de l'equipe, duree, technologies
- Une courte description
- Les liens (GitHub, itch.io, Voir details)

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

---

## Design des cartes

### Nouveau format des cartes

Les cartes de projet suivent le design de loreark.github.io :

```
┌─────────────────────────────────┐
│   [Video YouTube / Image]       │
│                                 │
├─────────────────────────────────┤
│ Nom du Projet   🏆 Prix         │
│ Role (couleur accent)           │
│                                 │
│ 👥 8   ⏱️ 3 mois   </> Tech     │
│                                 │
│ Description courte du projet... │
│                                 │
│ [GitHub] [itch.io] [Voir →]     │
└─────────────────────────────────┘
```

### Video au survol

Quand on survole une carte avec une video YouTube :
1. Apres 500ms, la video se charge automatiquement
2. La video joue en boucle, en sourdine
3. En quittant la carte, la video s'arrete

---

## Pages de projet individuelles

### Fonctionnement

Chaque projet a sa propre page HTML dans le dossier `projects/`.

Ces pages :
- Chargent les donnees depuis `../data.json`
- Identifient le projet via le nom du fichier (ex: `arcanthys.html` → projet `arcanthys`)
- Affichent tous les details du projet
- Supportent le changement de langue
- Incluent la navigation vers les projets precedent/suivant

### Contenu d'une page projet

- Video YouTube en grand format (ou image)
- Description complete
- Carte d'informations (equipe, duree, technologies, role)
- Liste des contributions
- Tags/Technologies
- Liens externes
- Navigation entre projets

---

## Ajouter un projet

### Etape 1 : Ajouter les donnees dans data.json

Trouver le tableau `"projects"` et ajouter un nouvel objet :

```json
{
  "id": "nom-unique-du-projet",
  "name": "Nom du Projet",
  "subtitle": {
    "fr": "Type de jeu",
    "en": "Game Type"
  },
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
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "videoId": "VIDEO_ID",
  "images": [],
  "technologies": "Unreal Engine 5 / C++ / Blueprints",
  "role": {
    "fr": "Programmeur Gameplay",
    "en": "Gameplay Programmer"
  },
  "teamSize": 4,
  "team": {
    "fr": "4 developpeurs",
    "en": "4 developers"
  },
  "duration": {
    "fr": "2 mois",
    "en": "2 months"
  },
  "date": {
    "fr": "Juin 2024",
    "en": "June 2024"
  },
  "links": {
    "itch": "https://xxx.itch.io/projet",
    "github": "https://github.com/xxx/projet"
  }
}
```

### Etape 2 : Creer la page projet

Copier un fichier existant dans `projects/` (ex: `arcanthys.html`) et le renommer avec l'`id` du projet.

```bash
cp projects/arcanthys.html projects/mon-nouveau-projet.html
```

**Important** : Le nom du fichier doit correspondre exactement a l'`id` du projet dans `data.json`.

### Champs obligatoires

| Champ | Description | Exemple |
|-------|-------------|---------|
| `id` | Identifiant unique (minuscules, tirets) | `"mon-super-projet"` |
| `name` | Nom affiche du projet | `"Mon Super Projet"` |
| `subtitle` | Sous-titre bilingue (type de jeu) | `{ "fr": "Roguelite 3D", "en": "3D Roguelite" }` |
| `category` | Categorie bilingue | `{ "fr": "Game Jam", "en": "Game Jam" }` |
| `categoryId` | ID correspondant au filtre | `"game-jam"` |
| `tags` | Technologies utilisees (tableau) | `["Unreal Engine", "C++"]` |
| `shortDescription` | Description courte bilingue | `{ "fr": "...", "en": "..." }` |
| `fullDescription` | Description complete bilingue | `{ "fr": "...", "en": "..." }` |
| `technologies` | Technologies (format "X / Y / Z") | `"Unreal Engine / C++"` |
| `role` | Role bilingue | `{ "fr": "...", "en": "..." }` |
| `teamSize` | Nombre de personnes (entier) | `8` |
| `team` | Description equipe bilingue | `{ "fr": "8 developpeurs", "en": "8 developers" }` |
| `duration` | Duree bilingue | `{ "fr": "3 mois", "en": "3 months" }` |
| `date` | Date bilingue | `{ "fr": "Juin 2024", "en": "June 2024" }` |

### Champs optionnels

| Champ | Description | Exemple |
|-------|-------------|---------|
| `contributions` | Liste bilingue des contributions | `{ "fr": [...], "en": [...] }` |
| `award` | Prix obtenu bilingue | `{ "fr": "Meilleur Prototype", "en": "Best Prototype" }` |
| `videoUrl` | URL YouTube embed complète | `"https://www.youtube.com/embed/VIDEO_ID"` |
| `videoId` | ID de la video YouTube seul | `"VIDEO_ID"` |
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

---

## Modifier un projet

1. Ouvrir `data.json`
2. Trouver le projet par son `id` ou son `name`
3. Modifier les champs souhaites (penser aux deux langues si bilingue)
4. Sauvegarder le fichier

---

## Supprimer un projet

1. Ouvrir `data.json`
2. Trouver et supprimer l'objet du projet dans `"projects"`
3. Verifier qu'il n'y a pas de virgule orpheline
4. Supprimer le fichier HTML correspondant dans `projects/`
5. Sauvegarder

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

**Note** : Les systemes utilisent toujours le modal (pas de page dediee).

---

## Gestion des categories

### Categories actuelles

Les categories sont definies dans `data.json` sous `"categories"` avec les deux langues.

### Ajouter une nouvelle categorie

1. Ajouter l'objet dans les DEUX tableaux (`fr` et `en`) de `"categories"`
2. Utiliser cette categorie dans vos projets avec le `categoryId` correspondant

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

### Ajouter une video YouTube

1. Aller sur la video YouTube
2. Copier l'ID de la video (la partie apres `v=` dans l'URL)
3. Ajouter dans le projet :

```json
"videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
"videoId": "VIDEO_ID"
```

**Note** : `videoId` est utilise pour la miniature et la lecture au survol. `videoUrl` est utilise sur la page projet.

### Ajouter une image

1. Placer l'image dans `Assets/Images/`
2. Ajouter le chemin dans `data.json` :

```json
"images": ["Assets/Images/mon-projet.png"]
```

**Note** : Si une video est disponible, elle sera utilisee en priorite.

---

## Modifier les textes de l'interface

### Ou sont les textes UI

Les textes de l'interface sont dans `data.json` sous `"ui"` avec `"fr"` et `"en"`.

### Cles UI importantes

| Cle | Utilisation |
|-----|-------------|
| `viewDetails` | Bouton "Voir details" sur les cartes |
| `duration` | Label "Duree" |
| `team` | Label "Equipe" |
| `role` | Label "Role" |
| `technologies` | Label "Technologies" |
| `contributions` | Label "Mes contributions" |
| `playOnItch` | "Jouer sur itch.io" |
| `viewOnGitHub` | "Voir sur GitHub" |

---

## Conseils

### Valider le JSON

Avant de sauvegarder, verifier que le JSON est valide :
- Utiliser [jsonlint.com](https://jsonlint.com)
- Ou utiliser VS Code qui souligne les erreurs

### Erreurs courantes

1. **Virgule manquante** entre deux objets
2. **Virgule en trop** apres le dernier element
3. **videoId manquant** : pour avoir la miniature YouTube
4. **Oubli de creer la page projet** dans `projects/`
5. **Nom de fichier different de l'id** : `projects/arcanthys.html` doit correspondre a `"id": "arcanthys"`

### Tester localement

Pour tester le site en local :
1. Utiliser Live Server dans VS Code
2. Ou `python -m http.server 8000` puis ouvrir `http://localhost:8000`

---

## Resume rapide

| Action | Fichier(s) | Notes |
|--------|------------|-------|
| Ajouter un projet | `data.json` + `projects/nom.html` | Creer aussi la page HTML |
| Modifier un projet | `data.json` | Penser aux 2 langues |
| Supprimer un projet | `data.json` + supprimer `projects/nom.html` | |
| Ajouter un systeme | `data.json` | Modal uniquement |
| Modifier textes UI | `data.json` → `"ui"` | FR et EN |
| Ajouter une video | `data.json` | videoUrl + videoId |
| Ajouter une image | `Assets/Images/` + ref dans `data.json` | |

---

*Documentation mise a jour pour le portfolio v2.0 de Julien PIRAT - Design inspire de loreark.github.io*

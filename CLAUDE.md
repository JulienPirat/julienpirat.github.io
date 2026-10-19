# CLAUDE.md - Context for Claude Code

## Project Overview
Portfolio website for **Julien PIRAT**, a game developer specializing in Unreal Engine and C++.
- Bilingual site (FR/EN)
- Hosted on GitHub Pages

## Key Files

| File | Purpose |
|------|---------|
| `data.json` | **MAIN DATA FILE** - All projects, systems, translations |
| `js/main.js` | Homepage logic (cards, filters, language) |
| `js/project.js` | Individual project page logic |
| `css/style.css` | All styles |
| `index.html` | Homepage |
| `projects/*.html` | Individual project pages (filename must match project `id`) |

## Quick Commands

```bash
# Test locally
python -m http.server 8000
# Then open http://localhost:8000
```

## Data Structure Summary

### Adding a Project
1. Add object to `projects` array in `data.json`
2. Create `projects/{id}.html` (copy existing one)

### Required Fields for Projects
- `id`: unique-lowercase-id (matches HTML filename)
- `name`, `subtitle`, `category`, `categoryId`, `tags`
- `shortDescription`, `fullDescription` (bilingual)
- `role`, `team`, `teamSize`, `duration`, `date`, `technologies`

### Optional Fields
- `videoUrl`, `videoId` (YouTube)
- `images`, `contributions`, `award`, `links`

## Category IDs
| ID | FR | EN |
|----|----|----|
| `in-development` | En developpement | In Development |
| `game-jam` | Game Jam | Game Jam |
| `competition` | Concours | Competition |
| `university` | Universitaire | University |
| `personal` | Personnel | Personal |

## Current Projects (7)

### 1. Arcanthys (`arcanthys`)
- **Status**: In Development (Ashen Bloom Studio, 12 people)
- **Tech**: Unreal Engine, C++, GAS, Perforce
- **Role**: Gameplay Programmer
- **Tasks**: GAS integration, enemy AI (BehaviorTree, DetourCrowd), Quest system

### 2. Green Rebirth (`green-rebirth`)
- **Category**: Game Jam (CREAT 2024)
- **Award**: Best Prototype
- **Tech**: Unreal Engine 5.4, Blueprints
- **Team**: 7 devs + 1 artist
- **Tasks**: Flower propagation system, placement system, sensitivity settings
- **Video**: https://youtu.be/DDTdn_jTqTk

### 3. Clean Dream (`clean-dream`)
- **Category**: Ubisoft Competition 2024
- **Tech**: Unreal Engine, Multiplayer/Network
- **Team**: 8 devs
- **Tasks**: Mole behavior, hole interactions, network replication, RPCs
- **Video**: https://youtu.be/IAFDb1A4BvU

### 4. VRecycle (`vrecycle`)
- **Category**: University (UQAC)
- **Tech**: Unreal Engine, VR
- **Team**: 6 devs
- **Tasks**: Waste modeling with GameplayTags, VR controller movement, sorting system

### 5. TempleTrap (`temple-trap`)
- **Category**: University (UQAC)
- **Tech**: Unreal Engine, Coop/Puzzle
- **Team**: 4 devs
- **Tasks**: Rising water system, player death/respawn, artistic elements
- **Video**: https://youtu.be/cvBhtapsJg0

### 6. Vivaldi (`vivaldi`)
- **Category**: University (UQAC)
- **Tech**: Unreal Engine, C++, Blueprints
- **Team**: 7 devs
- **Tasks**: AI with BehaviorTrees, EQS, melee and ranged AI
- **Video**: https://youtu.be/xx8IPcbil-U

### 7. TowerDefense (`tower-defense`)
- **Category**: University (UQAC)
- **Tech**: Unreal Engine, C++
- **Tasks**: Turret placement/movement/destruction, wave system with DataTables
- **Video**: https://youtu.be/8MQ6IRRHSyM

## Current Systems (3)

### 1. DetourCrowd (`detourcrowd`)
- **Category**: AI Navigation
- **Context**: Arcanthys
- Dynamic avoidance between AI agents

### 2. AI Pooling (`ai-pooling`)
- **Category**: Performance/AI
- **Context**: Arcanthys
- Agent reuse to reduce CPU cost

### 3. Visual Logger (`visual-logger`)
- **Category**: Debug/Tools
- **Context**: Arcanthys
- Custom Visual Logger for AI behavior analysis

## Assets Location
- Images: `Assets/Images/`
- GIFs (systems): `Assets/Gifs/`

## Bilingual Text Format
All translatable text uses:
```json
{
  "fr": "Texte en francais",
  "en": "Text in English"
}
```

## Common Tasks

### Update project description
Edit `data.json` > find project by `id` > modify `shortDescription` or `fullDescription` (both `fr` and `en`)

### Add YouTube video to project
```json
"videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
"videoId": "VIDEO_ID"
```

### Change UI text
Edit `data.json` > `ui` > `fr`/`en` sections

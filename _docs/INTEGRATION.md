# MuscleOS PWA — Guide d'intégration

## Étape 1 — Ajouter dans muscleos.html

Dans le `<head>` de muscleos.html, ajoute ces 3 lignes
(juste après le `<meta charset="UTF-8">`) :

```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#080a0f">
<link rel="apple-touch-icon" href="icons/icon-apple.png">
```

En bas du fichier, juste avant `</body>`, ajoute :

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('[MuscleOS] Service Worker enregistré'))
      .catch(err => console.warn('[MuscleOS] SW erreur :', err));
  }
</script>
```

## Étape 2 — Structure des fichiers

Assure-toi que tout est dans le MÊME dossier :

```
📁 ton-dossier/
  ├── muscleos.html
  ├── manifest.json          ← nouveau
  ├── service-worker.js      ← nouveau (prochaine session)
  ├── fatigue-engine.js
  ├── user-profile.js
  ├── muscles.json
  ├── chest.json
  ├── back.json
  ├── shoulders.json
  ├── arms.json
  ├── legs.json
  ├── core.json
  ├── sources.json
  ├── index.json
  └── 📁 icons/
        ├── icon-192.png     ← nouveau
        ├── icon-512.png     ← nouveau
        └── icon-apple.png   ← nouveau (Safari iOS)
```

## À venir — service-worker.js

Le service worker sera ajouté lors de la prochaine session.
Il gère le cache offline et les mises à jour automatiques.
Quand tu mets à jour l'app, tu n'auras qu'à incrémenter :

```js
const CACHE_VERSION = 'muscleos-v3.5'; // → 'muscleos-v3.6', etc.
```

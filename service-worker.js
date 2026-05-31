// ════════════════════════════════════════════════════
// MUSCLEOS — SERVICE WORKER v1.0
//
// Stratégie : Cache-First + mise à jour en arrière-plan
//
//   1. L'app charge instantanément depuis le cache local
//   2. En parallèle, le SW vérifie si les fichiers ont changé
//   3. Si une nouvelle version existe → cache mis à jour
//   4. Un bandeau s'affiche : "Nouvelle version disponible"
//   5. L'utilisateur recharge → nouvelle version active
//
// ⚠️ MISE À JOUR : quand tu déploies une nouvelle version,
//    incrémente CACHE_VERSION ci-dessous.
//    Ex : 'muscleos-v3.5' → 'muscleos-v3.6'
//    C'est la SEULE chose à modifier dans ce fichier.
// ════════════════════════════════════════════════════

const CACHE_VERSION = 'muscleos-v3.5';

// ════════════════════════════════════════════════════
// FICHIERS À METTRE EN CACHE
//
// Tous les fichiers statiques de l'app.
// Si tu ajoutes un nouveau .json ou .js au projet,
// ajoute-le ici aussi.
// ════════════════════════════════════════════════════
const STATIC_FILES = [
  './muscleos.html',
  './manifest.json',
  './fatigue-engine.js',
  './user-profile.js',

  // Base de données biomécaniques
  './index.json',
  './muscles.json',
  './sources.json',
  './chest.json',
  './back.json',
  './shoulders.json',
  './arms.json',
  './legs.json',
  './core.json',

  // Icônes
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-apple.png',
];

// Fonts Google — chargées depuis un CDN externe
// Mises en cache séparément (peuvent ne pas être disponibles hors-ligne la 1ère fois)
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap',
];


// ════════════════════════════════════════════════════
// INSTALLATION — 1ère fois ou nouvelle version
//
// Télécharge et met en cache tous les fichiers statiques.
// skipWaiting() → le nouveau SW prend le contrôle immédiatement
// (sans attendre la fermeture de tous les onglets).
// ════════════════════════════════════════════════════
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      console.log('[MuscleOS SW] Installation — mise en cache des fichiers...');

      // Fichiers statiques : échec bloquant (si un fichier manque, l'install échoue)
      const staticPromise = cache.addAll(STATIC_FILES);

      // Fonts : optionnelles — l'app fonctionne sans elles hors-ligne
      const fontPromise = Promise.allSettled(
        FONT_URLS.map(url => cache.add(url).catch(() => null))
      );

      return Promise.all([staticPromise, fontPromise]);
    }).then(() => {
      console.log('[MuscleOS SW] Tous les fichiers mis en cache ✓');
      return self.skipWaiting();
    })
  );
});


// ════════════════════════════════════════════════════
// ACTIVATION — nettoyage des anciens caches
//
// Supprime les caches des versions précédentes.
// Ex : 'muscleos-v3.4' est supprimé quand 'muscleos-v3.5' s'active.
// ════════════════════════════════════════════════════
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      const deletions = keys
        .filter(key => key !== CACHE_VERSION)
        .map(key => {
          console.log('[MuscleOS SW] Suppression ancien cache :', key);
          return caches.delete(key);
        });
      return Promise.all(deletions);
    }).then(() => {
      console.log('[MuscleOS SW] Activation — cache actif :', CACHE_VERSION);
      return self.clients.claim();
    })
  );
});


// ════════════════════════════════════════════════════
// FETCH — stratégie Cache-First avec revalidation
//
// Pour chaque requête réseau :
//   1. Cherche dans le cache → répond immédiatement si trouvé
//   2. En arrière-plan, vérifie si le fichier a changé sur le serveur
//   3. Si changé → met à jour le cache + notifie l'app
//   4. Si non trouvé dans le cache → va chercher sur le réseau
//
// Requêtes exclues : chrome-extension://, about:, etc.
// ════════════════════════════════════════════════════
self.addEventListener('fetch', event => {
  // Ignore les requêtes non-HTTP et l'API Anthropic (jamais mettre en cache)
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;
  if (url.hostname === 'api.anthropic.com') return;

  // Ignore les requêtes POST (journal, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_VERSION).then(async cache => {
      const cached = await cache.match(event.request);

      // Lance la requête réseau en arrière-plan (ne bloque pas la réponse)
      const networkFetch = fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => null); // Silencieux si hors-ligne

      // Réponse immédiate depuis le cache si disponible
      if (cached) {
        return cached;
      }

      // Pas dans le cache → attendre le réseau
      return networkFetch.then(response => {
        if (response) return response;
        // Fallback ultime si hors-ligne et non mis en cache
        return new Response(
          '<h1 style="font-family:monospace;padding:2rem;color:#3dffa0;background:#080a0f">MuscleOS — hors ligne. Recharge après connexion.</h1>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      });
    })
  );
});


// ════════════════════════════════════════════════════
// MESSAGE — communication avec l'app
//
// L'app peut envoyer des messages au SW via :
//   navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
//
// Utilisé quand l'utilisateur clique "Mettre à jour maintenant"
// sur le bandeau de mise à jour.
// ════════════════════════════════════════════════════
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    console.log('[MuscleOS SW] Mise à jour forcée par l\'utilisateur');
    self.skipWaiting();
  }
});

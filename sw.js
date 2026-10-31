const CACHE_NAME="neon-v-shell-20261031-1";
const SHELL_ASSETS=[
  "./",
  "./videothek.css?v=20261023-2",
  "./videothek-fixes.css?v=20261025-145",
  "./videothek-playlist-essay.css?v=20261023-32",
  "./videothek-typesetting.css?v=20261010-1",
  "./videothek-neon.css?v=20261023-40",
  "./videothek-startup.css?v=20261031-18",
  "./videothek-theme-dark-refinement.css?v=20261023-7",
  "./videothek-theme-light.css?v=20261023-6",
  "./videothek-reference-catalog.js?v=20260914-3",
  "./videothek-import.js?v=20260927-4",
  "./videothek-storage.js?v=20261015-20",
  "./videothek.js?v=20261031-353",
  "./videothek-auto-projects.js?v=20261023-6",
  "./videothek-global-works.js?v=20261015-1",
  "./videothek-shared-editions.js?v=20261015-1",
  "./assets/videothek-neon-v-apple-touch.png",
  "./assets/videothek-neon-v-favicon-32.png"
];
self.addEventListener("install",event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE_NAME);await Promise.allSettled(SHELL_ASSETS.map(asset=>cache.add(asset)));await self.skipWaiting()})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(name=>name.startsWith("neon-v-shell-")&&name!==CACHE_NAME).map(name=>caches.delete(name)));await self.clients.claim()})()));
self.addEventListener("fetch",event=>{const request=event.request;if(request.method!=="GET")return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;if(request.mode==="navigate"){event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put("./",copy));return response}).catch(()=>caches.match("./")));return}event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}return response}))) });

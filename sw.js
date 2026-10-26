const CACHE = "study-dash-v26-46";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(async (c) => {
    const ASSETS = ["./","./index.html","./style.css?v=26.46","./app.js?v=26.46","./db.js","./timer.js","./charts.js","./share.js","./shamsi.js","./sync.js","./sky.js","./exam.js","./occasions.js","./manifest.json","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];
    await Promise.all(ASSETS.map((u)=>c.add(u).catch(()=>null)));
  }).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks)=>Promise.all(ks.filter((k)=>k!==CACHE).map((k)=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then((res) => {
    try { if (res && res.ok) { const c=res.clone(); caches.open(CACHE).then((cache)=>cache.put(e.request,c)).catch(()=>{}); } } catch {}
    return res;
  }).catch(() => caches.match(e.request).then((r)=>r||caches.match("./index.html"))));
});

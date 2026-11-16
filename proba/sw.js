// ПРОБА АЙФОНА (М5а) · хранит страницу в телефоне; ответ из памяти, сеть — только обновить память
var ИМЯ = 'проба-1', ФАЙЛЫ = ['./', 'index.html', 'manifest.json', 'icon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(ИМЯ).then(function (к) { return к.addAll(ФАЙЛЫ); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (о) {
    var сеть = fetch(e.request).then(function (н) { if (н.ok) caches.open(ИМЯ).then(function (к) { к.put(e.request, н.clone()); }); return н; }).catch(function () { return о; });
    return о || сеть;
  }));
});

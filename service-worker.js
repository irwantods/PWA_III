importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);
workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/detail-team.html', revision: '1' },
    { url: '/sw-register.js', revision: '1' },
    { url: '/soccer-ball-128.ico', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/pages/standing.html', revision: '1' },
    { url: '/pages/team.html', revision: '1' },
    { url: '/asset/css/materialize.min.css', revision: '1' },
    { url: '/asset/css/style.css', revision: '1' },
    { url: '/asset/css/Quicksand-VariableFont_wght.ttf', revision: '1' },
    { url: '/asset/img/save.png', revision: '1' },
    { url: '/asset/img/pwa.png', revision: '1' },
    { url: '/asset/img/update.png', revision: '1' },
    { url: '/asset/img/data_null.png', revision: '1' },
    { url: '/script/preloader.js', revision: '1' },
    { url: '/script/save-team.js', revision: '1' },
    { url: '/script/nav.js', revision: '1' },
    { url: '/script/materialize/materialize.min.js', revision: '1' },
    { url: '/script/api/api.js', revision: '1' },
    { url: '/script/idb/idb.js', revision: '1' },
    { url: '/script/idb/db.js', revision: '1' },
    // kak ini aku taro di url to cache ga tau kenapa uda di taro ext file png di registerRoute tp file png ga ada yang kesimpen
    { url: '/asset/img/soccer-ball-512.png', revision: '1' },
    { url: '/asset/img/soccer-ball-384.png', revision: '1' },
    { url: '/asset/img/soccer-ball-256.png', revision: '1' },
    { url: '/asset/img/soccer-ball-192.png', revision: '1' },
    { url: '/asset/img/soccer-ball-152.png', revision: '1' },
    { url: '/asset/img/soccer-ball-144.png', revision: '1' },
    { url: '/asset/img/soccer-ball-128.png', revision: '1' },
    { url: '/asset/img/soccer-ball-64.png', revision: '1' },
    { url: '/asset/img/soccer-ball-32.png', revision: '1' },
    // file css google
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    // file woff nya google
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
    { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },

], {
    // supaya ga keluar dino kondisi offline klik detail team karena kalo ga pake ini meskipun page detail team ada di cache tetep aja dino yang keluar
    ignoreUrlParametersMatching: [/&*/],
});

// Menyimpan cache API dari football
workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'soccer-api'
    })
);
workbox.routing.registerRoute(
    new RegExp("https://crests.football-data.org/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'soccer-crests'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|webp|ico)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);
// fungsi push notifikasi 
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('All About Soccer', options)
    );
});
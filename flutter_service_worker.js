'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7ce60c472341dfb7052275ad6f610197",
"assets/AssetManifest.bin.json": "513674bc0da8c806403e70ac754a6e3b",
"assets/AssetManifest.json": "42b6b113fdd07c5e50880d3e95b40d2f",
"assets/assets/add_icon.png": "2c876b0b99cbf8861ec510bb54e23a80",
"assets/assets/amazon.png": "e71d3ccd60d70b1dd4567ccbf836b9b9",
"assets/assets/barcode_image.png": "a582dc94d353c42b40739866a38695ae",
"assets/assets/blue_cut_bg.png": "7fc09d245a4f145fd4bd053849391bce",
"assets/assets/cultfit.png": "7b03518236594cfcbf53f1efc6e55170",
"assets/assets/digigold_logo_dark.png": "b2a2d19ec9be2cf0b9eba8ca5146319e",
"assets/assets/digigold_logo_white.png": "d33b351a48edcc4e2688920c2e89798f",
"assets/assets/green_up_arrow.png": "244d6eacb7296aded3303df5f9570120",
"assets/assets/home_icon.png": "fbc0f100169f565af3ffcea6c747df79",
"assets/assets/india_flag.png": "55513ceac7b5142c15ed62c996a36680",
"assets/assets/light_bulb_big.png": "abda7d7a013a3bdc805e20d766c40308",
"assets/assets/more_icon.svg": "195359c0f0990df3fbc00b89882b2248",
"assets/assets/netflix.png": "2b27a6f70b27b4288fe6a34ed0c4f1b4",
"assets/assets/nifecard_logo.png": "b98a8d2e5af5c05f2a0964abbcc3940c",
"assets/assets/nifecard_title.png": "505488473f49a8d68bced03047ff5013",
"assets/assets/nifelogo.jpeg": "36aa65fe0562ce33d52b81567abf4cfb",
"assets/assets/nifelogolottie.json": "0e78304901e719f82e03d51c110a0184",
"assets/assets/nife_icon.png": "64f1f69df4ffa3523ef5a06ab72e4bc0",
"assets/assets/nife_logo_gif.gif": "8f94d41a0b592e89d78f243557f61fbd",
"assets/assets/offers_icon.png": "a22f631681b85e153280f1bd30ab5892",
"assets/assets/plus_purple_icon.png": "c6878fa3d5480c8c97ccddea4201ad7e",
"assets/assets/plus_white_icon.png": "438a3f2eed1cac34233391210a14b020",
"assets/assets/rupay_logo.png": "1425e78014c633816ca14ca67ff16e1d",
"assets/assets/rupay_logo.svg": "4c15326d4f8181fa87e70f2a76e664b9",
"assets/assets/scan_icon.png": "f8f4c257d535d9c3e4e6984293e4eda0",
"assets/assets/visa_logo.png": "b0d975bfc9593d17c8dea4ebd6d6fd39",
"assets/assets/visa_rupay.png": "e3281e14a6930d1939405447c87ac719",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "d0ff5918ae43d6971cd3777a007e2930",
"assets/NOTICES": "7debab65ac41bd7df5ed19fbe8610ec2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "64edb91684bdb3b879812ba2e48dd487",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "f87e541501c96012c252942b6b75d1ea",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "4124c42a73efa7eb886d3400a1ed7a06",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e2234990e7dccdc13a2c39cc87f0c871",
"/": "e2234990e7dccdc13a2c39cc87f0c871",
"main.dart.js": "7ceabecf7c9fced35d3ac32e8e9bdb2e",
"manifest.json": "5b4bd7c72527c9fcc999e9cc275e9f7b",
"version.json": "346906ea405d85616def88d783638b45"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

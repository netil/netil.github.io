(global => {
    'use strict';

    // Load the sw-toolbox library.
    importScripts('./js/sw-toolbox.js');

    // Turn on debug logging, visible in the Developer Tools' console.
    global.toolbox.options.debug = true;

    // Precache at install time, but it won’t actually set up a route to serve them
    global.toolbox.precache(['./manifest.json', './index.html', './css/main.css', './sw2.js', './js/sw-toolbox.js']);

    // The route for the images
    global.toolbox.router.get('img/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'js',
            maxEntries: 10,
            maxAgeSeconds: 60*60*24 // cache for a day
        }
    });

    global.toolbox.router.get('img/(.*)', global.toolbox.cacheFirst, {

    });

    /*
    toolbox.router.get('/assets/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'assets',
            maxEntries: 10,
            maxAgeSeconds: 86400 // cache for a day
        }/*,
        // Set a timeout threshold of 2 seconds
        networkTimeoutSeconds: 2
    });
    */

    // By default, all requests that don't match our custom handler will use the toolbox.networkFirst
    // cache strategy, and their responses will be stored in the default cache.
    global.toolbox.router.default = global.toolbox.networkFirst;

    // Boilerplate to ensure our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
(global => {
    'use strict';

    // sw-tookbox 로딩
    importScripts('./js/sw-toolbox.js');

    // 디버깅을 위한 로깅 옵션 (개발자 도구 콘솔에 로깅됨)
    global.toolbox.options.debug = true;

    // 이미지 폴더로 요청되는 리소스
    toolbox.router.get('./img/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'img',
            maxEntries: 10,
            maxAgeSeconds: 60*60*24 // 1일간 유효
        }
    });

    // cloudflare.com (cdnjs.com)에서 요청되는 모든 리소스
    toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        cache: {
            name: 'cdnjs',
            maxEntries: 5,  // LRU
            maxAgeSeconds: 60*60*24
        },
        origin: /\.cloudflare\.com$/,

        // 네트워크 timeout 설정
        networkTimeoutSeconds: 2
    });

    // 정의된 route에 일치하지 않는 리소스들에 대한 요청의 기본 전략 설정
    // 응답은 기본 캐시에 저장된다.
    global.toolbox.router.default = global.toolbox.networkFirst;

    // sw가 페이지의 컨트롤을 빠른 시점에 취할 수 있도록 하는 boilerplate
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
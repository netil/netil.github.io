
# PWA?

> A new way to deliver amazing<br>user experiences on the web.<br>
> \- [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps?hl=en)

- Instant Loading:<br>
  <span style="font-size:20px">[Service Workers](https://www.w3.org/TR/service-workers/), [Background Sync API](https://wicg.github.io/BackgroundSync/spec/), [Cache API](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/#cache-objects)</span>
- Add to Home Screen:<br>
  <span style="font-size:20px">[Web App Manifest](https://www.w3.org/TR/appmanifest/)</span>
- Push-notifications:<br>
  <span style="font-size:20px">[Push API](https://w3c.github.io/push-api/), [Notifications API](https://notifications.spec.whatwg.org/)</span>


----------

## Performance matters

PWA 기술들 중, 가장 중요한 요소는 바로 <span class="underline bold green">offline caching!</span>

![](https://codelabs.developers.google.com/codelabs/sw-precache/img/79a9d0b80352f04e.png)

----------

# 캐싱은 왜 중요한가?

- 오프라인 지원 <!-- .element: class="fragment" -->
- 성능 향상<br> <!-- .element: class="fragment" -->
  네트워크 보다 캐시를 통해 요청받는 것이 빠르기 때문
- Lie-Fi <!-- .element: class="fragment" -->

----------

## Lie-Fi

> "Indicates that you are connected to a wireless network, however you are still unable to load webpages" <!-- .element: class="fragment" -->
> \- [urban dictionary](http://www.urbandictionary.com/define.php?term=lie-fi)

![](http://www.sitepen.com/blog/wp-content/uploads/2016/06/lie-fi.gif) <!-- .element: class="fragment" -->

<p class="reference">
    [What is lie-fi?](https://developers.google.com/web/fundamentals/performance/poor-connectivity/lie-fi)
</p>

----------

## The challenges of PWA

- iOS 미지원
  - [Service Workers](https://webkit.org/status/#specification-service-workers): Under Consideration
  - [Web App Manifest](https://webkit.org/status/#specification-web-app-manifest): Under Consideration
  - Push & Notification API?

- 데스크탑 브라우저? (Service Worker 기준)
  - IE (Not Supported), [Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/serviceworker/) (In Development)
  - [Safari](https://webkit.org/status/#specification-service-workers) (Under Consideration)
  - [FireFox](https://platform-status.mozilla.org/#service-worker) (Supported)
  
<p class="fragment" style="margin-top:30px;padding:10px 0;border:dotted 1px #fff">
 브라우저의 [지원 범위](https://jakearchibald.github.io/isserviceworkerready/)가 문제.<br>
 <span style="font-size:40px">캐싱을 모든 환경에서 사용할 순 없을까?</span>
</p>

----------

<div class="title-animate" style="margin-bottom:50px">
    <div><h1>그런데... 잠깐.</h1></div>
    <div><p>브라우저는 이미 캐싱하고 있지 않나?</p></div>
</div>

사용자가 방문하는 웹사이트의 모든 리소스들에 대해 브라우저는<br> <!-- .element: class="fragment" -->
로컬 캐시해 다음 방문시 로컬 캐시된 리소스를 활용

그러나 많은 경우(온라인 상태인 경우라도)<br> <!-- .element: class="fragment" -->
로컬 캐시된 리소스를 활용하지 못하는 경우가 발생

<p>물론, <span class="underline">오프라인인 경우에는 로컬 캐싱은 사용불가</span></p> <!-- .element: class="fragment" -->

----------

<!-- .slide: data-background="#639ddc" -->
<div class="title-animate">
    <div><h1>Cache</h1></div>
    <div><p>로컬 캐시에 대하여</p></div>
</div>

----------

# 캐시의 상태

|Status|Description|
|----|----|
| <span class="red bold fragment">first visit</span> | <span class="fragment">첫 방문인 경우, 당연히 캐싱되어 있는 리소스는 존재하지 않음</span> |
| <span class="red bold fragment">cleared</span> | <span class="fragment">캐싱되어 있는 경우라도, 사용자가 직접 캐시를 비우거나, 백신으로 인해 지워지거나 또는 브라우저의 버그로 제거되기도 한다. (약 19%의 Chrome 사용자들의 경우, 최소 1주일에 한번 이상 버그로 인해 캐시가 지워진다. - [참고](https://plus.google.com/+WilliamChanPanda/posts/hsfVHq6wKxG))</span> |
| <span class="red bold fragment">purged</span> | <span class="fragment">로컬 캐시의 공간은 모든 웹사이트가 공유해 사용하기 때문에 한정된 공간으로 인해 이전에 캐시된 내용은 새로운 캐시 저장을 위해 지워지게 된다.</span> |
| <span class="red bold fragment">expired</span> | <span class="fragment">약 69%의 리소스들은 캐싱에 대한 헤더가 없거나 또는 1일 미만의 값으로 설정되어 있다. 캐싱 기간이 만료되면, 로컬에 저장된 캐시의 내용이 유효하더라도 새롭게 요청되어 진다. ([참고](http://httparchive.org/interesting.php#caching))</span> |
| <span class="red bold fragment">revved</span> | <span class="fragment">이전 방문으로 인해 캐싱이 되어 있는 상태라고 해도, 사이트의 내용이 변경되어 사용자의 로컬 캐시된 리소스와 달라 사용되지 못할 수도 있다.</span> |

----------

# Facebook's case

페이스북에 접속하는 사용자들 중 로컬 캐시가 없는<br>
상태의 요청 비율은 <span class="red underline bold" style="font-size:50px">25.5%</span> (2015/04 기준)

|  Type | Request rate of<br>missing cache |
| --- | --- |
| Desktop | 24.8% |
| Mobile | 26.9% |

<p class="reference">
    [Web performance: Cache efficiency exercise](https://code.facebook.com/posts/964122680272229/web-performance-cache-efficiency-exercise/)
</p>

----------

## 브라우저의 캐시 공간

로컬 캐싱은 성능에 큰 영향을 주는 요소 중 한 가지<br>
그러나 모바일 환경 캐싱은 데스크탑 브라우저에 비해 적은 공간 사용

브라우저에 따라 최대 사용 공간은 다르며,<br>
잘 문서화 되어 있지 않아 정확한 limit 확인 어려움

| 종류 | 크기 |
| --- | --- |
| 데스크탑 | 3자리 수 이상 (또는 사용 디스크 전체 크기의 일부)<br> ex. IE9의 경우는 디스크 크기의 1/256 |
| 모바일 | 2자리 수 정도의 공간을 활용하는 것으로 알려져 있음<br> ex. Android 2.x의 경우는 최대 캐시 크기는 5.7MB에 불과<br> (iOS의 경우는 50MB 이상) |

<p class="reference">
    [Early findings: Mobile browser cache persistence and behaviour](http://www.webperformancetoday.com/2012/07/12/early-findings-mobile-browser-cache-persistence-and-behaviour/)
</p>

----------

<!-- .slide: data-background="#e74c3c" -->
<div class="title-animate">
    <div><h1>Service Workers</h1></div>
    <div><p>손쉽게 사용할 수 있는 도구들</p></div>
</div>

----------

## Service Worker Lifecycle

<blockquote style="margin:0auto;font-size:20px;background-color:#0404ce;color:yellow">
    1) Init &rarr; install / activate event <span class="size18">(when SW byte's difference)</span> &rarr; cache<br>
    2) Request &rarr; fetch / message event &rarr; cache
</blockquote>

<p style="margin:0">
    <img src="./img/lifecycle.png" style="width:500px;margin:inherit">
</p>

<pre style="margin:0 auto" class="fragment"><code class="lang-js hljs" style="height:240px">// souce: https://serviceworke.rs/strategy-cache-and-update/service-worker.js
var CACHE = 'cache-and-update';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './controlled.html',
      './asset'
    ]);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
</code></pre>

<p class="reference fragment">
    [Service workers 기초 및 활용](http://www.slideshare.net/jungkees/service-workers-44437352)<br>
    [The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/)
</p>

----------

# [sw-precache](https://github.com/GoogleChrome/sw-precache)<br>
빌드 기반의 리소스 프리캐싱

- 캐싱 리소스 파일의 컨텐츠에 기반해 hash를 통한 자동 버저닝
- 변경이 감지되면, 이전 버전을 만료시키고,<br>새로운 버전을 fetch 하도록 SW를 생성
- 변경되지 않은 캐시 요소에 대해선 그대로 유지
- cache-first strategy

----------

## sw-precache

ex. Gulp task:
```js
gulp.task('precache', function(callback) {
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = 'demo/pwa';

    swPrecache.write(path.join(rootDir, 'sw.js'), {
        staticFileGlobs: [ rootDir + '/**/*.{js,html,css,png,jpg,gif}' ],
        stripPrefix: rootDir

        // 런타임 캐싱 사용시, 생성되는 sw.js에 sw-toolbox가 자동으로 포함
        // https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject
        /*,runtimeCaching: [{
             urlPattern: /\.cloudflare\.com\/(.*)/i,
             handler: 'fastest',
                 options: {
                 cache: {
                     maxEntries: 10,
                     name: 'cdnjs'
                 }
             }
         }]*/
    }, callback);
});
```

<p style="margin-top:35px;font-size:20px">
[코드랩]: [Adding a Service Worker with sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/)
</p>

----------

# [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)
런타임 요청에 대한 공통의 캐싱 패턴을 제공

다음의 5가지 패턴(전략*)을 제공
- cacheFirst
- networkFirst
- fastest
- cacheOnly
- networkOnly

```js
// URL 패턴에 매칭되는 리소스에 대한 캐싱 전략을 지정
toolbox.router.get("/images", toolbox.
    [ cacheFirst | networkFirst | fastest | cacheOnly | networkOnly ], options);
```

<p style="margin-top:35px;font-size:20px">
*[The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)
</p>

----------

## sw-toolbox

```js
(global => {
    'use strict';

    // sw-tookbox 로딩
    importScripts('./js/sw-toolbox.js');

    // 디버깅을 위한 로깅 옵션 (개발자 도구 콘솔에 로깅됨)
    global.toolbox.options.debug = true;

    // 이미지 폴더로 요청되는 리소스
    toolbox.router.get('/demo/pwa/img/(.*)', global.toolbox.cacheFirst, {
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
    global.addEventListener('install',
        event => event.waitUntil(global.skipWaiting()));

    global.addEventListener('activate',
        event => event.waitUntil(global.clients.claim()));
})(self);
```

<p style="margin-top:35px;font-size:20px">
    [Instant Loading with Service Workers (Chrome Dev Summit 2015)](https://www.youtube.com/watch?v=jCKZDTtUA2A&t=16m58s)<br>
    [Service Worker Toolbox, Totally Tooling Tips](https://youtu.be/gfHXekzD7p0?list=PLNYkxOF6rcIB3ci6nwNyLYNU6RDOU3YyL)<br>
    [Getting started with the sw-toolbox](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134)
</p>

----------

### [offline-plugin for webpack](https://github.com/NekR/offline-plugin)
webpack 프로젝트에서 사용할 수 있는 플러그인

1) webpack.config 설정

```js
var OfflinePlugin = require('offline-plugin');

module.exports = {
  plugins: [
    // ... other plugins
    // 플러그인들 중, 가장 마지막에 추가
    new OfflinePlugin({
      caches: {
        main: ['external.js', ':rest:']
      },
      externals: ['external.js'],
      excludes: ['main.js']
    })
  ]
  // ...
}
```

2) in your client script

```js
require('offline-plugin/runtime').install();
```

----------

### more tools?
## Service Worker<br>
## helper libraries
https://github.com/GoogleChrome/sw-helpers

----------

<!-- .slide: data-background="#daa60b" -->
<div class="title-animate">
    <div><h1>Debug PWA</h1></div>
    <div><p>크롬 개발자 도구</p></div>
</div>

----------

# PWA 디버깅

<p style="background-color:#fff;color:#000;width:50%;margin:8px auto">SW는 'https' 에서만 동작</p>
그러나 디버깅 용도를 위해:<br>
http://localhost 및 http://127.0.0.1 에서도 동작 (포트 상관없음)

Chrome DevTools > Application Tab:
- Manifest
- Service Workers
- Cache

> chrome://serviceworker-internals/<br>
> [Debug Progressive Web Apps](//web-central.appspot.com/web/tools/chrome-devtools/debug/progressive-web-apps/?hl=en)<br> 
> [Service Worker Debugging](//www.chromium.org/blink/serviceworker/service-worker-faq)
 

----------

# Manifest

- 전체 outline 확인
- homescreen 이벤트 에뮬레이션

![](./img/debug-manifest.png)

----------

# Service Workers

- 네트워크 핸들링
- 에뮬레이션: [Push a notification](https://gauntface.github.io/simple-push-demo/), [Sync event](https://wicg.github.io/BackgroundSync/demo/)
- update/unregister sw
- start/stop sw

![](./img/debug-sw.png)

----------

# Cache

캐시된 리소스의 확인<br>
![](./img/debug-cache.png)

모든 캐시의 삭제는 Application > Clear storage
![](./img/debug-cache2.png)

----------

# Demo
sw-precache 및 sw-toolbox

<a href="https://netil.github.io/demo/pwa/" target="_new">https://netil.github.io/demo/pwa/</a>

----------

## 무엇을 캐싱해야 할까? 

[Application Shell architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73)

<img src=https://cdn-images-2.medium.com/max/1200/1*6BUS9ahijjPrr4BfV0Oq8g.jpeg width=70%>

----------

<!-- .slide: data-background="#008844" -->
<div class="title-animate">
    <div><h1>SW가 지원되지<br>않는 환경에선?</h1></div>
</div>

- 스토리지를 활용한 캐싱:<br>
  Web Storage, IndexedDB, File API, etc.

<p class="reference">
    [Offline Storage for Progressive Web Apps](https://medium.com/@addyosmani/offline-storage-for-progressive-web-apps-70d52695513c)
</p>

----------

## 웹 스토리지를 활용한 캐싱 방법

캐시의 상태에 따라 항상 모든 static 파일들이 로컬 영역 존재 보장 없음<br> <!-- .element: class="fragment" -->
자주 변경이 되지 않는 파일은 localStorage를 이용한 캐싱방법 고려

### 몇 가지 고려사항 : <!-- .element: class="underline fragment" -->
- 자주 변경될 필요 없는 기본 라이브러리들로 대상 한정 <!-- .element: class="fragment" -->
- 자주 변경되지 않더라도, 업데이트를 위한 '버전관리' 필요 <!-- .element: class="fragment" -->
- localStorage는 브라우저에 따라 최대 저장용량이 다를 수 있다.<br> <!-- .element: class="fragment" -->
  대체로 5MB 까지이나, 보다 정확한 최대치는 확인필요 
  
  
<p>[데모]: [네이버 검색 활용 예](//m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&query=blackpink)</p> <!-- .element: class="fragment" -->

----------

# 로딩 전략

initializer: 스토리지 버전과 비교<br>
> storage.VER == file.VER ?<br>
>   load from <span class="green">Storage</span> :
>   load from <span class="red">File</span>


```js
// 스토리지에 저장된 스크립트를 evaluation 한다.
let load = (code = "") => {
    let s = document.createElement("script");
    s.charset = "utf-8";
    s.text = code;
    (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
};
```

조건과 상황에 따라 다르지만, 기존 대비 <span class="red underline bold" style="font-size:40px">25%</span> 성능향상 경험

----------

## How much can be stored?

- 크롬의 경우 : <!-- .element: style="text-decoration:underline;list-style: none;text-indent:-20px" -->
- [temporary](https://developer.chrome.com/apps/offline_storage#temporary) 영역을 사용
- Per origin (not per API)
- Web Storage, App Cache, File System,<br>IndexedDB, WebSQL가 공유
- 그러나 Web Storage는 5MB로 고정<br><br>

| Browser | Limits |
| --- | --- |
| Firefox | No limits (prompt after 50MB) |
| Mobile Safari | 50MB max |
| Desktop Safari | unlimited (prompts after 5MB) |
| IE10+ | 250MB max (prompts at 10MB) |

----------

## [Chrome Quota Size](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit#slide=id.g1468a77557_0_15)
```js
navigator.webkitTemporaryStorage.queryUsageAndQuota ( 
    (usedBytes, grantedBytes) =>
        console.log('Using ', usedBytes, ' of ', grantedBytes, 'bytes'), 
    e => console.log('Error', e)
);
```
<p style="margin-top:35px;font-size:25px">
    <sup style="font-size:9px">(2016/6/16~17)</sup> [BlinkOn 6 conference](https://www.youtube.com/playlist?list=PL9ioqAuyl6UL-7hTmxb3WQjMwQmANbVPL): [State of Offline Storage APIs](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit#slide=id.g1468a77557_0_15)
</p>

| Type | Previous | Current Work |
| --- | --- |
| <span class="green bold">Pool</span> | (free space –<br> chrome's current usage) / 3 | fixed % of total disk space:<br>(drive size - OS size) * P |
| <span class="green bold">Origin quota</span> | pool size / 5 | pool size / N |

PWA gets at most 6% of free space on device

<p class="reference">
[Browser Storage Abuser](http://demo.agektmr.com/storage/),
[Offline Storage for Progressive Web Apps](https://medium.com/@addyosmani/offline-storage-for-progressive-web-apps-70d52695513c)
</p>

----------

## Google's interests?

<p class="fragment">
    <a href="https://developer.chrome.com/devsummit/"><img src="./img/chrome-dev-summit-logo.jpg" style="width:300px"></a><br>
    총 25 세션 중, 9개가 PWA 관련
</p>

<p class="fragment">
    Chrome '새로운 탭' 화면 구성에서 SW 사용중
    ![Chrome new tab](./img/chrome-newtab.png)
</p>

----------

> ## The future is<br>
> ## already here<br>
> ## — it's just not very evenly distributed<br>
    > \- [William Gibson](https://en.wikipedia.org/wiki/William_Gibson#Visionary_influence_and_prescience)

----------

# Resources

- [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist)
- https://pwa.rocks/ <span class="size18">(오페라 아카이빙 PWA 앱 목록)</span>
- Google Developers: [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
- Google Developers: [SW Case Studies](https://developers.google.com/web/showcase/)
- Mozilla [Service Worker Cookbook](https://serviceworke.rs/)
- Service Workers 101: [SW Infographic](https://github.com/delapuente/service-workers-101/)
- [The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/)
- [Awesome Progressive Web Apps](https://github.com/TalAter/awesome-progressive-web-apps) <span class="size18">(PWA 리소스 큐레이션)</span>
- [Progressive Web App Dev Summit 2016](https://events.withgoogle.com/progressive-web-app-dev-summit/)
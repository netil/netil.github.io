## 몇가지 키워드

- Server-side rendering
- Component (Module)
- Isomorphic
- Virtual DOM

----------

클라이언트 영역에서 처리하는 것이 좋다고 했었다가
지금은 서버 렌더링을 얘기한다

http://tomdale.net/2015/02/youre-missing-the-point-of-server-side-rendered-javascript-apps/

- SEO 문제
Ajax API로 구성되는 페이지의 경우 초기 화면은 blank로 구성되고 SEO에서 올바른 처리가 되지 못하는 문제
- 초기 로딩속도
정적 자원을 로딩한 후, 다시 컨텐츠를 구성하기 위해 Ajax API를 호출하는 처리시간의 소요
- JavaScript 사용이 제한된 환경
이 경우 클라이언트 렌더링은 무용지물 상태가 된다.

----------

## What about standard?

- ServiceWorker (offline cache)
- Web Component
- Module
- ES6(or 7)

----------


Module

CommonJS
RequireJS?
ES6 

----------

Transpiler

Babel

----------

Package Manger

npm
yarn
bower?

----------

Bundlers vs Build tools

## Bundler
- webpack
- Browserify

## Build tool
- Grunt
- Gulp

http://stateofjs.com/2016/buildtools/

----------

Frameworks

AngularJS
React
Vue
Polymer

----------



WebApp(SPA) or website?

----------

Two-way data binding

----------

구조적 개발에 대한 니즈

----------

jQuery?

----------

새로운 영역

----------

Node.js

----------

Hybrid App/JavaScript Native

- Cordova
- React Native
- Electron
- NW.js (Node-Webkit)

----------

Component 방식의 개발

----------

Browsers

브라우저 벤더들의 표준 implementation 관련
- Safari Technology Preview
- Chrome: Android에서도 canary/beta 채널 제공시작
- Edge?
- FireFox: 최근 Quantum(Server 기반) 엔진 변경 발표

----------

Asynchronous

- Promise
- await/async

----------

# 2017?

----------
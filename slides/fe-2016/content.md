어떤 것을 배워야 할까?
시간 투자가 필요하기 때문

그러나 해당 기술이 뜨지 못한다면?
결국, 많은 기술들 속에서 어떤 것을 '선택'해야 할지가 점점 중요

----------

'최신'에 대한 myth.

- Angular1 사례:
성능 이슈로 도입한 곳들 대부분이 전환하거나 전환예정

- Angular2?
Angular 2 Is Out: Should You Start Using It?
http://www.codelord.net/2016/10/09/angular-2-is-out-should-you-start-using-it/

----------

## 몇가지 키워드

- Server-side rendering
- Component (Module)
- Isomorphic
- Virtual DOM

----------

# Server-side rendering

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

# Virtual DOM

VTree
JavaScript로 표현된 DOM 구조

DOM 노드 핸들링은 비용이 많이 든다.

[React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)
[Virtual DOM and diffing algorithm](https://gist.github.com/Raynos/8414846)

https://www.youtube.com/watch?v=z5e7kWSHWTg

단방향 데이터 흐름

- 변경에 대한 업데이트는?
1) dirty checking (Angular1)
2) observable (Anguar2)

https://medium.com/tony-freed-consulting/what-is-virtual-dom-c0ec6d6a925c#.pxlx9kxwi

----------

# Isomorphic JavaScript

- 서버와 클리언트 영역 모두에서 실행
- 백엔드와 프론트엔드가 같은 코드 공유

http://isomorphic.net/

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

# AngularJS

----------

# React

- JSX (JavaScript XML)
- 예전엔 html에 비즈니스 로직이 포함되는 것에 대한 비판
- 지금은 로직(자바스크립트)안에 html이 포함

----------

# Vue

----------

# Polymer

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
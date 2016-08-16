

Progressive Web Apps
https://developers.google.com/web/progressive-web-apps/

Service Worker related libraries, sw-precache and sw-toolbox
https://developers.google.com/web/tools/service-worker-libraries/

The offline cookbook
https://jakearchibald.com/2014/offline-cookbook/

Demo
https://www.washingtonpost.com/pwa/
https://pwa.rocks/
https://weather-pwa-sample.firebaseapp.com/


2번 이상 방문(최소 5분 이상의 간격)하는 경우, 홈스크린에 추가


----------

## Application Shell architecture

[Instant Loading Web Apps With An Application Shell Architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73)
![](https://cdn-images-2.medium.com/max/1200/1*6BUS9ahijjPrr4BfV0Oq8g.jpeg)

----------

For URL addressable resources, use the Cache API (part of Service Worker)
For all other data, use IndexedDB (with a Promises wrapper).

----------

## Quota

- per origin
[Quota Management API](https://www.w3.org/TR/quota-api/)

- Chrome Quota Size
https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit#slide=id.g1468a77557_0_15
navigator.storage.estimate()

- IDB
Firefox: no limits(prompt after 50MB)
Mobile Safari: 50MB max / Desktop Safari: unlimited (prompts after 5MB)
IE10+ maxes at 250MB and prompts at 10MB


- [Offline Storage for Progressive Web Apps](https://medium.com/@addyosmani/offline-storage-for-progressive-web-apps-70d52695513c)

----------

## 디버깅

Debug Progressive Web Apps
https://web-central.appspot.com/web/tools/chrome-devtools/debug/progressive-web-apps/?hl=en

----------

## The challenges of PWAs

- iOS 미지원
  - [Service Workers](https://webkit.org/status/#specification-service-workers): Under Consideration
  - Web App Manifest?
  - Push API?
  - Notification API?

----------

## Service Worker

[Service Workers 101](https://github.com/delapuente/service-workers-101/)
[The Service Worker Lifecycle](https://bitsofco.de/the-service-worker-lifecycle/)

----------

## Case Studies

Service Workers in Production
https://developers.google.com/web/showcase/2015/service-workers-iowa
https://developers.google.com/web/showcase/2016/iowa2016


----------

## Resources

[Awesome Progressive Web Apps](https://github.com/TalAter/awesome-progressive-web-apps)
[Progressive Web App Dev Summit 2016](https://events.withgoogle.com/progressive-web-app-dev-summit/)

<!-----


# 무엇을 다루나?

<p class="fragment" style="margin-top:40px;font-size:40px">1) 네이버 공통 통계 개발 <span style="text-decoration:line-through">  삽질기 </span> 경험기</p>
<p class="fragment" style="font-size:40px">2) 공통 차트 라이브러리 'C3+'</p>

----------

<!-- .slide: data-background="#e74c3c" -->
<div class="title-animate">
    <div><h1>Prologue</h1></div>
    <!-- <div><p>P0 project</p></div> -->
</div>

----------

<!-- .slide: data-background="#e74c3c" -->
<div class="title-animate">
    <div><h1>개발 시작</h1></div>
    <div><p>고난의 시작</p></div>
</div>

----------

# OMG! SVG Text

<svg xmlns="http://www.w3.org/2000/svg" height="100">
  <text x="10" y="50"
        style="font-family: Times New Roman;
               font-size: 50px;
               stroke: #00ff00;
               fill: #0000ff;">
    I'm SVG text
  </text>
</svg><br>

- 텍스트 스타일링은 가능 <!-- .element: class="fragment" -->
- 위치(via attributes) 여백 등의 조정은 어려움 <!-- .element: class="fragment" -->
- transform:translate 또는 &lt;tspan>으로 처리 필요 <!-- .element: class="fragment" -->

----------

# 1차 시도

x축 텍스트의 날짜 값 표현 ![tick-text](./img/x-tick-text.png)
```html
<text y="9" x="0" transform="" style="text-anchor: middle; display: block;">
	<tspan x="0" dy=".71em" dx="0">11월15년</tspan>
</text>

```

'월'을 기준으로 텍스트를 분리하고, &lt;tspan> 요소를 추가해 보자

<h1 class="fragment" style="color:red;">FAIL</h1>

- resize시 원래대로 복귀 (C3.js 내부처리) <!-- .element: class="fragment" -->

----------

# 2차 시도

tick multiline 옵션을 이용해 줄바꿈 해보자
```js
axis: {
    x: {
        tick: {
            width: 30,
            multiline: true
        }
    }
}
```
```html
<text y="9" x="0" transform="" style="text-anchor: middle; display: block;">
    <tspan x="0" dy=".71em" dx="0">11월</tspan>
    <tspan x="0" dy="11.5" dx="0">15년</tspan>
</text>
```

<h1 class="fragment" style="color:red;margin:0;position: absolute;top: 45%;left: 37%;">FAIL</h1>

- 텍스트에 따른 너비값이 고정적이지 않기 때문에 width 옵션 사용불가 <!-- .element: class="fragment" -->
- 세밀한 위치 조정 어려움 (속성값 변경 필요) <!-- .element: class="fragment" -->

----------

## x축 tick 레이블 처리

<iframe src="http://jsbin.com/lidove/8/embed?js,output" style="border:1px solid rgb(170, 170, 170);width:100%;min-height:500px;height:30px;"></iframe>

----------

<!-- .slide: data-background="#e74c3c" -->
<div class="title-animate">
    <div><h1>C3+</h1></div>
    <div><p>새로운 시작</p></div>
</div>

----------

# Some caveats

- jQuery로 SVG 요소의 manipulation은 불명확
- SVG 요소의 dimension을 구할땐 SVG의 .getBBox() 메서드를 사용
https://docs.webplatform.org/wiki/svg/methods/getBBox
  ```js
  d3.select(this).node().getBBox();
  ```

----------

# Demo #1

<iframe src="http://jsbin.com/lidove/1/embed?js,output" style="border:1px solid rgb(170, 170, 170);width:100%;min-height:500px;height:30px;"></iframe>

----------

# Demo #2

<iframe src="http://jsbin.com/lidove/2/embed?js,output" style="border:1px solid rgb(170, 170, 170);width:100%;min-height:500px;height:30px;"></iframe>

----------

<!-- .slide: data-background="#639ddc" -->

<div class="title-animate">
    <div><h1>What's Next?</h1></div>
</div>

----->

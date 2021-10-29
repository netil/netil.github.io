
# 오픈소스는
# OOO 다.

각자의 정의를 마음속에 한번 떠올려 보세요.

----------

### 여러분에게 오픈소스란 <!-- .element: class="m-0" -->
## 어떤 의미를 갖고 있나요?

- 프로젝트 개발에 도움되는 무료 SW
- 채용/이직에 도움될것 같아서
- 능력/역량을 보여주기 위해
- 개인 성장, 취미/재미/호기심을 위해

## 무엇이 되었던, <!-- .element: class="m-0" style="margin-top:50px" -->
### 오픈소스는 중요하다고 생각하시죠?

> 그러나, 실제 참여는 중요함에 비례해 보면 매우 제한적 <!-- .element: class="red" -->

----------

개발자라면 오픈소스를 남겨야(참여해야) 하는 이유는
# 무엇일까요?

----------

## 결론부터 말하자면,

오늘날 누구도 오픈소스를 사용하지 않고 개발할 수 없으며,<br>
미래에는 더더욱 가속화될 것이라는 사실

어떤식으로든 여러분들은 오픈소스를 통해 혜택을 보게 된다는 사실<br>
받았던 혜택들을 돌려주는 거의 유일한 방법은<br>

### 오픈소스 참여를 통해 그 비용을 <!-- .element: class="m-0" -->
<h1 style="color:cyan">지불<span style="font-size:0.5em">(기여)</span>하는 것!</h1>

----------

<!-- .slide: data-background-image="./img/bg00.png" -->

<h1 class="index"><span>1</span></h1>

### 잘 보이지 않는 <!-- .element: class="m-0" -->
## 문제들

----------

## 현재의 지속성 모델

오픈소스를 유지하기 위해선 비용이 필요

기업 주도적 또는 비즈니스 수행 모델을 통한 발전 이외,<br>
지속 가능한 비용을 얻을 수 있는 뚜렷한 방법은 없다.

<div style="width:85%;margin:0 auto;font-size:0.85em">

모델 | 설명 | 예시
--- | --- | ---
기업 주도적 | 기업 소속으로 기업 주도적 오픈소스 개발 | React(Facebook),<br>Angular(Google) 등
[Sponsors](https://github.com/sponsors) | 개인 또는 기업 등 외부의 기부, 펀딩 | Babel, Vue.js 등
[Open Core](https://en.wikipedia.org/wiki/Open-core_model) | 기능 제한적인 'core'를 무료/오픈소스로,<br>'상업용' 또는 애드온을 독점 SW로 제공 | Redis, Elastic,<br>MongoDB 등
[비즈니스](https://en.wikipedia.org/wiki/Business_models_for_open-source_software) | 유료 서비스(호스팅) 제공, SaaS,<br>기술지원, 컨설팅 등 | [npm](https://www.npmjs.com/products) 등

</div>

<p class="quote size18">
  지속 가능한 비용은 경제적인 것이 제일 중요하지만,<br>
  꼭 그것만을 의미하는 것이 아님
</p>

----------

## The Bad

Open Source has a <span class="bold red">"Begging Problem"</span>

<p class="quote" style="font-size:0.7em">
  OSS developers write the software that keeps the entire technical world<br>
  running, but OSS developers are supplicants.<br><br>
  <span class="red bold">They have to beg.</span>
</p>

> OSS 개발자는 전체 기술 세계를 구동시키는 SW를<br>
> 개발하지만 요청자 입장으로, 구걸해야 한다.<br>
> <span style="font-size:0.7em">&dash; [Bruce Perens](https://en.wikipedia.org/wiki/Bruce_Perens) ([Open Source Initiative](https://opensource.org/) 공동 설립자)</span>

<p class="reference">
  <a href="https://youtu.be/vTsc1m78BUk?list=WL&t=308">What Comes After Open Source</a>
</p>

----------

기업들의 오픈소스를 취해 자신들의 비즈니스에 활용<br>
그러나, 얻는 이익대비 기여는 매우 낮다.


<div class="grid" style="width:80%;grid-template-columns:60% 40%">

  <p>
    <img src="./img/the-ugly-oss.png" class="m-0"><br>
    <a href="https://www.slideshare.net/slidarko/mmadt-a-virtual-machinean-economic-machine#16" style="font-size:0.5em" class="reference">mm-ADT: A Virtual Machine/An Economic Machine</a>
  </p>

  클라우드 업체들은<br>비용 지불/기여 없이<br><br>
  `as a service` 로<br>제공해 이익을 취함

</div>

<p class="reference">
  <a href="https://www.oreilly.com/radar/the-business-of-open-source/">The Business of Open Source</a><br>
  <a href="https://www.elastic.co/kr/blog/why-license-change-AWS">Amazon: NOT OK - Elastic 라이선스를 변경해야 했던 이유</a><br>
</p>

----------

## <img src="./img/mapbox.svg" style="width:300px"> GL JS

웹에서 손쉽게 지도를 만들어 주는 라이브러리<br>
20/12월, [v2.0 릴리스]("https://github.com/mapbox/mapbox-gl-js/blob/main/CHANGELOG.md#200)하면서, 기존 [`3-Clause BSD`](https://opensource.org/licenses/BSD-3-Clause) 라이센스를 제거

2019년, MS는 Mapbox GL JS의 20여개 라이브러리를<br>
활용한 ['Azure Maps' 클라우드 서비스 공개](https://blog.mapbox.com/1azure-maps-adds-data-driven-styling-powered-by-mapbox-gl-f14d062b79f9)

한 클라우드 제공자가 서비스를 시작하면,<br>
뒤이어 다른 업체들도 따라할 것이므로<br>
클라우드 업체들의 사용을 제한하기 위한 조치

> <!-- .element: class="red fragment fade-right" -->
> 결국, 클라우드로 인해 Open core 모델,<br>오픈소스가 죽었다.

<p class="reference">
  <a href="https://joemorrison.medium.com/death-of-an-open-source-business-model-62bc227a7e9b">Death of an Open Source Business Model</a>
</p>

----------

<img src="./img/babel.svg" style="width:300px" class="m-0">

최신 문법 사용 코드를 더 낮은 버전(ES6+ &rarr; ES5)으로 변환해<br>
호환성 문제를 해결해 주는 트랜스파일러로, 월간 1.1억회 다운로드 발생

Front-end 기술 스택에서 기본으로 사용되지만,<br>
메인터넌스를 위한 비용 문제에 직면

<img src="./img/opencollective-babel.png" style="width:600px" class="m-0"><br>
<a href="https://opencollective.com/babel#category-BUDGET" style="font-size:0.5em" class="reference">open collective: Babel</a>

2018년 펀딩받기 시작했으나, 2020년 펀딩 감소로<br>
개발에 참여하는 풀타임 개발자들(현재 3명) 비용 등이 부족한 상황

<p class="reference">
  <a href="https://babeljs.io/blog/2021/05/10/funding-update.html">Babel is used by millions, so why are we running out of money?</a><br>
</p>

----------

## 2021년은

- [Free Software 등장](https://www.gnu.org/) (1985), <span class="green">38년</span>째
- [Open Source 용어 정의](https://opensource.com/article/18/2/coining-term-open-source-software) (1988), <span class="cyan">23년</span>째

> <!-- .element: class="red fragment fade-up" -->
> 그러나, 아직도 OSS 프로젝트 지속성에 대한<br>
> 문제를 해결하는 <span class="green  underline">명확한 모델</span>이 없는 상태

더 나은 사회, 누군가를 도울수 있다는
이타적인 생각의 접근이 필요하며, 

오픈소스를 바라보는 기본적 시각이 되었으면 함

[오픈소스는 어디에서 왔나?](https://netil.github.io/slides/oss-behind/#/4) <!-- .element: class="reference" -->

----------

<!-- .slide: data-background-image="./img/bg00.png" -->

<h1 class="index"><span>2</span></h1>

### 오픈소스를 통한 기회

----------

## How came to <img src="./img/babel.svg" class="logo">

<img src="./img/sebastian-mckenzie.jpg" class="person m-0">

[호주 Wodonga](https://en.wikipedia.org/wiki/Wodonga) 출신의 Sebastian McKenzie(당시 17세)가<br>
학교 시험 공부 도중, '6to5'(ES6 to ES5)라는 이름으로<br>
2014년 9월28일 [첫 커밋](https://github.com/babel/babel/commit/c97696c224d718d96848df9e1577f337b45464be)하며 시작

<p class="reference">
    <a href="https://medium.com/@sebmck/2015-in-review-51ac7035e272">2015-in-review</a>
</p>

----------

### <img src="./img/6to5.png" class="logo m-0">를 통한 기회  

<div class="grid" style="grid-template-columns:50% 50%">

  <img src="./img/sebastian-mckenzie-coldmail.png" style="margin:0;width:450px"><br>

  <p class="size18">
      Thinkmill &rarr; CloudFlare<br>
      &rarr; Facebook &rarr; <a href="https://rome.tools/blog/announcing-rome-tools-inc/">Rome Tools, Inc.</a> 창업<br><br>
	  <img src="./img/rome.png" style="width:200px"><br>
	  모던 웹 애플리케이션 개발에 필요한<br>
      툴 체인들을 단일 도구로 대체하기 위한 목적의 도구
  </p>
  
</div>

----------

<img src="./img/swc.png" style="width:200px"><br>
<img src="./img/github.svg" style="width:25px" class="m-0"> <a href="https://github.com/swc-project/swc">swc-project/swc</a><br>

[강동윤](https://kdy1.github.io/)님이 [2017년 첫 커밋](https://github.com/swc-project/swc/commit/0f9532dd5d379292cc2d67777a108d88803bad91)을 통해 시작

[Rust](https://www.rust-lang.org/)로 개발한 JavaScript 컴파일러(트랜스파일러)로<br>
GitHub 16K Stars 기록 중.

주요 Front-end 생태계 도구들이 채택하고 있는<br>
글로벌 인기 프로젝트로 성장

> [Deno &rarr; Vercel (Next.js) 이직](https://kdy1.github.io/post/jobs/vercel/deno-vercel/)



----------

<!-- .slide: data-background-image="./img/bg00.png" -->

<h1 class="index"><span>3</span></h1>

## 오픈소스 <!-- .element: class="m-0" -->
#### 메인테이너로의 여정

오픈소스와 생태계에 비용 지불(기여)하기

----------

## 첫 기여 경험

2015년, jQuery에 문서에서 중복 단어 제거 PR
<img src="./img/first-contribution.png" style="width:500px">

https://github.com/jquery/jquery/pull/2751 <!-- .element: class="reference" -->

----------

<img src="./img/billboard.js-white.svg" style="width:400px" class="m-0"><br>
<img src="./img/github.svg" style="width:25px" class="m-0"> <a href="https://github.com/naver/billboard.js">naver/billboard.js</a><br>

2017년, 내부 프로젝트를 위해 사용했던 프로젝트([C3.js](https://github.com/c3js/c3))의 불확실한<br>
지속성을 제거하기 위한 fork로 시작한 웹 시각화 라이브러리

<img src="./img/comment02-01.png" style="width:450px;margin:0">

[14일 만에 GitHub 스타 천 개 받은 차트 오픈소스 개발기](https://deview.kr/2017/schedule/191) <!-- .element: class="reference" -->

----------

오픈소스로 공개 한다고 해서 바로 사용자와 참여자들이 오진 않는다.

## 성장하기 위한 <!-- .element: class="m-0" -->
### 매력적인 프로젝트로 만들기

<span class="cyan">활발한 프로젝트 활동</span> 필요<br>
잠재적 사용자/기여자 들의 참여여부 결정에 영향

- 총 111번의 릴리스
  - 메이저/마이너 릴리스 마다 세심한 릴리스 노트 작성<br>
  <a href="https://netil.medium.com/billboard-js-3-2-release-sparkline-tableview-plugins-more-32217ddc869a" class="reference" style="font-size:0.6em">billboard.js 3.2 release: Sparkline, TableView Plugins & more!</a>
- 빠른 이슈 대응/응답 노력
  - 평균 2~3일내, 아니면 레이블링이라도 뻐르게
- 높은 코드 push 빈도수
  - 평균 2~3일내 1커밋 이상

----------

## 그 후, 4.5년 뒤

2021/10 기준, 공개 첫해보다 8,941 &rarr; 318,193 (<span style="font-size:1.6em" class="bold green">3,458%</span> 성장)<br>
4.5년 개발기간 동안 GitHub Stars <span style="font-size:1.6em" class="bold red">5K</span> 🎉 도달
<img src="./img/billboard.js-downloads-202110.png" style="width:600px;margin-top:20px" class="m-0">

처음 시작은 미약했지만, 꾸준하게 성장 중
<!-- 그러나 기업의 비즈니스(방향성) 필요성에 의해 유지되는 것은 사실 -->

[npm downloads](https://npm-stat.com/charts.html?package=billboard.js&from=2017-06-08) <!-- .element: class="reference" -->


----------

## 현재 fork 프로젝트는...

2020/8 마지막 릴리스 이후, 휴면(중단?) 상태<br>
billboard.js로 노력의 일원화를 제안했으나, 답은 얻지 못함

<img src="./img/open-letter-c3js.png" style="width:500px;margin:0">

현재 시점으로 보면, 결과적으로 fork가 옳았다는 생각

[Open Letter: Dear C3.js & the community from billboard.js](https://github.com/c3js/c3/issues/2831) <!-- .element: class="reference" -->

----------

<!-- .slide: data-background-image="./img/bg00.png" -->

<h1 class="index"><span>4</span></h1>

## 오픈소스 <!-- .element: class="m-0" -->
#### 참여하기

사용자/컨트리뷰터/커미터/메인테이너 등<br>
모두를 위해

----------

## 만약 OSS 프로젝트 시작하고 싶다면,

국내보다 글로벌을 타겟으로<br>
자신의 성장과 더 많은 사용자를 확보할 수 있는 가능성이 높음

그리고, 아주 단순한 진리
> <!-- .element: class="cyan fragment fade-right" -->
> 내가 만든것이 더 많은 사람에게 도움이 될수 있기 위해

----------

## 글로벌 사용자

지난 1년(20/10 ~ 21/10)간 billboard.js API 문서 방문자들
<img src="./img/billboard.js-users_2020-2021.png" style="width:500px">

API 문서는 실 사용자들이 주로 방문한다는 사실로 볼때,<br>
전세계 개발자들이 사용하고 있다는 사실은 큰 동기부여! 💪

----------

그러나, 처음의 열정은 시간이 지남에 따라 서서히 사라질 수 있으며,<br>
프로젝트가 아주 성공적인 경우라 해도, 그렇다.

<img src="./img/envoy.svg" style="width:300px;margin:0">

[Lyft](https://www.lyft.com/) 엔지니어인 Matt Klein이 개발한<br>
클라우드 네이티브 애플리케이션을 위한 엣지, 서비스 프록시

> <!-- .element: style="font-size:0.7em" -->
> Passion can fade with time...<br><br>
> [Envoy](https://github.com/envoyproxy/envoy) is the sort of thing that many engineers dream of building,<br>
> It's really a once in a lifetime sort of project.<br>
> &dash; [Matt Klein](https://github.com/mattklein123)

메인테이너는 때론 심리적, 감정적 측면에서의 도움도 필요하다.

<p class="reference">
  <a href="https://github.com/readme/featured/octoverse-balance">How open source maintainers can maintain balance in turbulent times</a><br>
</p>

----------

## say 'Thank You!' 👍👏

사용하고 있는 오픈소스가 있으신가요?<br>

메인테이너 및 참여자들에게 고마움을 표현하는 것도<br>
오픈소스 지속에 기여하는 방법 중 하나.

<div class="grid fragment fade-up" style="width:80%;grid-template-columns:25% 75%">

<img src="./img/gina-haeussge-thumbnail.webp" class="person">

 > A `thank you` tweet usually<br>
 > <span class="green">makes my whole day</span><br>
 > if not my week.<br>
 > &dash; Gina Häußge ([OctoPrint](https://github.com/OctoPrint/OctoPrint))

</div>

감사 트윗은 한주는 아니더라도 하루를 온전하게 만들어준다.


<p class="reference">
  <a href="https://github.com/readme/stories/gina-haeussge">It’s a 3D world, and we all belong</a><br>
  <a href="https://www.youtube.com/playlist?list=PL0lo9MOBetEEkOyAtPqiupGm91cu8QB0I">Global Maintainer Summit 2021</a>
</p>

----------

버그 해결에 비용을 걸고 요청하는<br>
[Bug Bounty](https://www.bountysource.com/issues/99929830-order-ignoring-data-order)도 프로젝트를 돕는 한가지 기여 방법

<img src="./img/thanks-comment.png" style="width:500px">

비용을 들일만큼 '필요성과 가치'가 있다는 의미로 느껴졌던 경험

https://github.com/naver/billboard.js/issues/2187#issuecomment-884236250 <!-- .element: class="reference" -->

----------

## 아마도, <!-- .element: class="m-0" -->
### 여러분의 OSS 참여는

당장은 결과가 보이지 않을 수도.<br>
그러나, 미래에 사회를 더 낫게 만들고 만드는 밑거름이 될것.

> <!-- .element: style="font-size:0.7em" -->
> 몽골 수도 울란바토르에서 서쪽으로 130km를 달리면 '룬솜' 지역...<br>
> 15년 전만 해도 이곳은 사막화가 급속히 진행...엄청난 양의 모래가 떠올라<br>
> 황사로 변해 한반도까지 날아오기도 했습니다.<br><br>
> 15년이 지난 지금 이 나무들은 10m가 넘는 키로 자라나<br>
> 사막이 확대하는 것을 막는 방어선이 됐습니다.<br>
> [한국이 몽골에 심은 나무...15년 지나자 '놀라운 변화'](https://news.naver.com/main/read.naver?mode=LSD&mid=sec&sid1=103&oid=052&aid=0001647656) <!-- .element: class="reference" -->

----------

오픈소스에 언젠가 참여를 생각해 보고 있었다면, 뒤로 미루지 말고

<div class="grid" style="width:85%;grid-template-columns:30% 70%">

  <p style="font-size:0.2em">
    <img src="./img/nike-campaing.jpg" style="width:250px"><br>
    <a href="https://www.flickr.com/photos/thenext28days/9574829995">https://www.flickr.com/photos/thenext28days/9574829995</a>
  </p>

  <h2 style="font-size:70px">지금, 당장<br>오픈소스 참여를<br>시작해 보세요.</h2>

</div>

그리고, 여러분의 흔적을 오픈소스에 남겨 주세요. <!-- .element: class="fragment cyan fade-right" -->

## <img src="img/billboard.js-white.svg" style=width:500px>?

- 2017/6 첫 공개된 웹 차트 라이브러리로 현재 GitHub 4.3K star를 기록 중.
- 부제: 14일 만에 GitHub 스타 천 개 받은 차트 오픈소스 개발기, 그 후 3년
- 코드 베이스: 13,700 LOC

<p class="reference">
    [14일 만에 GitHub 스타 천 개 받은 차트 오픈소스 개발기](https://deview.kr/2017/schedule/191)
</p>

----------

## 몇몇 지표들

- 20k npm downloads/month (누적 40만+)<br>
  8,941 (2017) &rarr; 82,147 &rarr; 144,749 &rarr; 20만+ 예상
- 200k CDN hits/month

<img src=img/npm-downloads.png style=width:700px>

공개 후, 지금까지 [40+ 컨트리뷰터들](https://github.com/naver/billboard.js/blob/master/AUTHORS.txt) 참여

<p class="reference">
    [npm donwloads](https://npm-stat.com/charts.html?package=billboard.js&from=2017-06-08)
</p>

----------

## 누가 사용하는지 알고 싶다.

사용자가 드러나지 않고, 파악도 어려워 지표 수집시도<br>
[feat(stats): Intent to ship stats](https://github.com/naver/billboard.js/pull/934)

그러나...

<img src=img/remove-tracking.png style="width:600px">

[User tracking should be removed or disabled by default](https://github.com/naver/billboard.js/issues/964)

<p class="reference">
    [Who's using billboard.js](https://github.com/naver/billboard.js/wiki/Who's-using-billboard.js)
</p>

----------

## 자동화를 통한 운영 부담 덜어내기

----------

## 다양한 릴리스 채널

-   nightly (커밋 기반 일간 릴리스) <!-- .element: style="width:500px" -->
-   latest (stable)
-   next (RC)

> 당연하지만, 채널이 많을수록<br>
> 관리 부담도 증가한다.

----------

### 한번의 릴리스를 진행하려면...

1. master 브랜치 에서 x.x.x-rc 브랜치를 생성하고 이동 <!-- .element: class="fragment" -->
2. Package.json에서 차기 버전 정보를 변경 <!-- .element: class="fragment" -->
3. Regression 테스트 & linting 수행 <!-- .element: class="fragment" -->
4. 빌드 및 API doc을 생성 <!-- .element: class="fragment" -->
5. 직전 step에서 생성된 폴더와 변경사항을 commit <!-- .element: class="fragment" -->
6. Changelog를 생성 (자동화됨) <!-- .element: class="fragment" -->
7. Tagging 및 upstream에 push <!-- .element: class="fragment" -->
8. GitHub "Draft a new release"를 통해 push된 tag를 새로운 릴리스로 등록 <!-- .element: class="fragment" -->
9. gh-pages에 빌드 파일과 API doc을 deploy (자동화됨)<!-- .element: class="fragment" -->
10. 패키징 후, npm publish 수행 <!-- .element: class="fragment" -->

----------

## 릴리스 워크플로우

<p class="size18">
  CI와 CD 사이 또는 CI/CD 직전에 사람의 작업(개입)을 필요
</p>

<img src=img/release-process.png>

그냥 커밋만 하면 알아서 릴리스 되게하고 싶다.

----------

## semantic-release

패키지 릴리스 워크플로 대부분을 자동화해 주는 도구

<img src=img/semantic-release.png style="width:200px">

- 커밋 로그 분석을 통해 자동으로 차기 버저닝 설정
- 커밋 로그 기반의 릴리스 노트 자동생성
- 패키지 레지스트리(npm)에 자동 배포

<p class="reference">
  https://github.com/semantic-release
</p>

----------

semantic-release는 커밋 로그에 기반해 릴리스 타입(버저닝)을 결정하므로
컨벤션에 따른 커밋 로그를 잘 작성하는게 관건

커밋 로그를 분석하고, 릴리스 타입을 설정
<img src=img/commit-analyzer.png>

<p class="reference">
  https://travis-ci.org/naver/billboard.js/jobs/568700732
</p>


----------

### Conventional Commits

<img src=img/conventional-commits.png style="width:550px">

```sh
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- 차기 버저닝을 위한 커밋 타입 분석에 사용
- Changelog/release note 생성에 사용

<p class="reference">
  https://www.conventionalcommits.org/
</p>

----------

## v2 릴리스 목표

----------

## v2.0의 기술적 과제들

- 하위 호환성을 그대로 유지 시키기
- 파일 구조와 아키텍처 개선
- JS 프로젝트의 TS 전환
- 더 나은 성능: 실행속도 개선 & 빌드 크기 감소

테스트, 테스트 그리고 테스트

----------

## 성능 개선 #1
#### 불필요 노드 생성을 제어

- [Look for possibility to decrease node generation](https://github.com/naver/billboard.js/issues/36)
- [Too bloated DOM with empty/hidden SVG elements](https://github.com/naver/billboard.js/issues/1288)

ex) Pie 유형 차트를 렌더링할 때, 사용되지 않는 축 관련 노드들도 생성되는 등

# [4 ~ 53%](https://github.com/naver/billboard.js/wiki/CHANGELOG-v2#reduced-node-generation) 감소

----------

## 성능 개선 #2
#### 모듈화를 통한 번들 크기 감소

- 모듈화에 대한 고민
  모든 차트 생성에 모든 타입의 유형을 사용하지 않기 때문
  https://github.com/naver/billboard.js/issues/756

  최신 번들러들은 Tree-shaking을 통해 사용하지 않는 코드들은 번들링에서 제외하는 기능을 제공한다.

사용 옵션에 따라 
# [10 ~ 43%](https://github.com/naver/billboard.js/wiki/CHANGELOG-v2#example-of-size-reduction-by-types) 감소

----------

## Benchmark

<img src=img/benchmark.gif>

<p class="reference">
    https://output.jsbin.com/pecafih
</p>

----------

## 모듈화 고민

기존 구조는 모든 모듈들이 prototype으로 확장되는 형태

```js
Chart.prototype.resize = function(size) { ... }
```

완전한 모듈화를 위해서는 prototype 확장 형태를 변경해야 하나,
하위 호환성 문제와 테스트 등 너무 많은 시간 소요의 문제


- 해결위해, 기능적/유형별 코드를 그룹핑하고 분리
- ESM와 UMD 빌드에서 모두 사용할 수 있도록 resolver를 만들어 해결

----------

## Resolver

ESM

```js
import shapeArea from "../../ChartInternal/shape/area";

// extend 수행시 Chart.prototype로 확장
let area = (): string => (
    extend(ChartInternal.prototype, shapeArea),(area = () => TYPE.AREA)()
);

export {area, ... }
```

UMD

```js
import * as shape from "./config/resolver/shape";

// extends shape modules
Object.keys(shape).forEach(v => shape[v]());
```

----------

## 빌드 제공

기존에는 webpack을 사용해 UMD 빌드를 제공했으나, ESM 빌드를 할수 없는 문제.<br>
2개의 번들러를 사용하는 전략 채택

- UMD: webpack
- ESM: Rollup.js

```js
"build:esm": "rollup -c ./config/rollup/esm.js",
"build:production": "cross-env NODE_ENV=production webpack --output-reporter",
```

<p class="reference">
    [Rollup 설정](https://github.com/naver/billboard.js/tree/master/config/rollup) / 
    [Webpack 설정](https://github.com/naver/billboard.js/tree/master/config/webpack)
</p>

----------

## 테스트, 테스트 그리고 테스트

총 226개의 옵션, 메서드 및 속성들이 존재<br>

이들 간의 조합에 따라, 차트 유형에 따라 다르게 동작될 수 있으며,
모두의 '하모니'와 올바른 동작을 유지하는 것은 매우 도전적인 일

----------

## 해결 방법?

모든 케이스들에 대한 테스트 코드를 추가하는 것만이 유일하다.

<img src=img/test-cases.png style="width:500px"><br>
<img src=img/test-coverage.png style="width:400px">

<p class="reference">
    https://travis-ci.org/github/naver/billboard.js/jobs/725432665<br>
    https://coveralls.io/github/naver/billboard.js
<p>

----------

#### 참여자 관점에 따라 다른
## '오픈소스'

- 사용자의 입장에서
- 내가 필요한 것을 얻기 위한 컨트리뷰터의 입장
- 커미터의 입장
- 프로젝트 메인터너의 입장

----------

## 메인터너의 입장에서


[[SOSCON 2018] 오픈소스 개발: Behind the Scenes](http://netil.github.io/slides/oss-behind/)

----------

It can be extremely lonely as an open source maintainer because at the end of the day, there’s only one person who’s got their neck on the line, and that’s me.

Alex Ellis [OpenFaaS](https://github.com/openfaas/faas) (쿠버네티스에 코드/함수 배포를 도와주는 도구)

----------

## TJ Holowaychuk

Node.js 버전 관리자인 [n](https://github.com/tj/n), [Express.js](https://github.com/expressjs/express/releases/tag/0.0.1)를 개발

In the end **open-source doesn’t pay the bills so it’s best to focus on other things if you can**.

<p class="reference">
    [Has TJ Holowaychuk been as prolific in the Golang community as he was in the Node.js community?](https://qr.ae/pNCP1m)
</p>

----------

## 오픈소스 참여를 통해 얻을 수 있는것

- 다른이의 코드를 통해 배울 수 있다.
- 다른 세계의 개발자와 협업을 경험할 수 있게된다.
- 더 나은 세상을 만들 수 있도록 다른 이들을 도울 수 있다.

----------

## 오픈소스로 부터 혜택을 받지 않은 이는 아무도 없다.

지금까지 여러분의 프로젝트에서 '오픈소스'를 사용하지 않고
개발할 수 있었던 경험이 있으신가요?

아마도, 이전에도 없었고 앞으로도 없을 것.

----------

## 오픈소스 참여의 의미

- 내가 받은 도움을 되돌려 주는 것
- 무언가를 기대하기 보다는 흥미있고 재미있다면 일단 시작

하지만, 너무 매몰되지 않게.

If you really enjoy the project(s) you’re working on then go for it but don’t neglect other areas of your life (or people).

TJ Holowaychuk

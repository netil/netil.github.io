

## 무엇을 다루나?


<span class="fragment">1) 네이버 공통 통계 개발 <span style="text-decoration:line-through">  삽질기 </span> 경험기</span><br>
<span class="fragment">2) 공통 차트 라이브러리 'C3+'</span>

----------

<!-- .slide: data-background="#e74c3c" -->
<div class="title-animate">
    <div><h1>Prologue</h1></div>
    <!-- <div><p>P0 project</p></div> -->
</div>

----------

## 차트 개발 작업이 assign 되었다면?

<div class="fragment" style="font-family:궁서체; background-color:#fff;color:#000; width:30%;height:200px;float:left">
    <div style="margin-top:2em">차트를 <span style="text-decoration:line-through">살려야</span><br>적용해야 한다.</div>
</div>

### Probably you might ... <!-- .element: class="fragment" style="color:#f9dc08" -->
- 직접 개발한다. <!-- .element: class="fragment" -->
- 외부 라이브러리를 사용한다. <!-- .element: class="fragment" -->
- 상용 or 오픈소스 <!-- .element: class="fragment" style="list-style: none;text-indent: 10px;" -->
- 어떤 기술을 사용할 것인가? <!-- .element: class="fragment" -->
- SVG or Canvas <!-- .element: class="fragment" style="list-style: none;text-indent: 10px;" -->

----------

## Styling SVG Text


<svg xmlns="http://www.w3.org/2000/svg" height="100">
  <text x="10" y="50"
        style="font-family: Times New Roman;
               font-size: 50px;
               stroke: #00ff00;
               fill: #0000ff;">
    I'm SVG text
  </text>
</svg>
// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    controlsTutorial: true,
    progress: true,
    slideNumber: true,
    history: true,
    center: true,
    transition: "slide", // none/fade/slide/convex/concave/zoom
    fragments: true,
    hideCursorTime: 2000,
    pdfMaxPagesPerSlide: 1,
    pdfSeparateFragments: false,

    // Optional reveal.js plugins
    plugins: [RevealMarkdown, RevealHighlight, RevealZoom],
    markdown: {
        // https://marked.js.org/using_advanced#options
        smartypants: true,
        smartLists: true
    }
});

Reveal.addEventListener('slidechanged', function(e) {
    // var indexh = e.indexh;
    // var cover = document.getElementById("cover-holder");
    // var bgLogo = document.querySelector(".bg-logo");

    // if (indexh === 0) {
    //     cover && (cover.style.display = "block");
    //     bgLogo && (bgLogo.style.display = "none");
    // } else {
    //     cover && (cover.style.display = "none");
    //     bgLogo && (bgLogo.style.display = "block");
    // }

    // animate("title-animate", e);
    animeTitle(e);
});

Reveal.addEventListener('fragmentshown', function(e) {
    // event.fragment = the fragment DOM element
    e.fragment.classList.add("fragment-text");
});
Reveal.addEventListener('fragmenthidden', function(e) {
    // event.fragment = the fragment DOM element
    e.fragment.classList.remove("fragment-text");
});

function animeTitle(e) {
    // Wrap every letter in a span
    var target = (e && e.currentSlide || document.querySelector("section")).querySelectorAll('.ml1 .letters');

    if (target.length) {
        target.forEach(function(v) {
          v.innerHTML = (v.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
        });

        anime.timeline({loop: false})
          .add({
            targets: '.ml1 .letter',
            scale: [0.3,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 400,
            delay: function(el, i) {
              return 70 * (i+1)
            }
          }).add({
            targets: '.ml1 .line',
            scaleX: [0,1],
            opacity: [0.5,1],
            easing: "easeOutExpo",
            duration: 500,
            offset: '-=875',
            delay: function(el, i, l) {
              return 80 * (l - i);
            }
          });
    }
}

animeTitle();

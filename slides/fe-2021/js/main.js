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

/*
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
*/


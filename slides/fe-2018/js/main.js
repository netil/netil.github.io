// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    slideNumber: true,
    history: true,
    center: true,
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    fragments: true,

    // Optional reveal.js plugins
    dependencies: [
        { src: '../reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: '../reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '../reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); },
            callback: function() {
                Array.prototype.forEach.call(document.querySelectorAll('section > p'), function(ele) {
                    var fragIndex = ele.innerHTML.indexOf("==")
                    if (fragIndex != -1){
                        ele.innerHTML = ele.innerHTML.replace("==", "");
                        ele.className = 'fragment';
                    }
                });
            }
        },
        { src: '../reveal.js/plugin/highlight/highlight.js', async: true, condition: function() { return true;/* !!document.querySelector( 'pre code' );*/ },
            callback: function() {
                hljs.initHighlightingOnLoad();
            }
        },
        { src: '../reveal.js/plugin/zoom-js/zoom.js', async: true },
        { src: '../reveal.js/plugin/notes/notes.js', async: true }
    ]
});

Reveal.addEventListener('slidechanged', function(e) {
    animate("title-animate", e);
    animeTitle(e);
});

Reveal.addEventListener('fragmentshown', function(e) {
    // event.fragment = the fragment DOM element
    event.fragment.classList.add("fragment-text");
});
Reveal.addEventListener('fragmenthidden', function(e) {
    // event.fragment = the fragment DOM element
    event.fragment.classList.remove("fragment-text");
});


function animate(type, e) {
    var selector = "."+ type +" h1, ."+ type +" p";
    var classList = [ "title", "sub-title" ];

    try {
        e.currentSlide.querySelectorAll(selector).forEach(function (v, i) {
            v.classList.add(classList[i]);
        });

        e.previousSlide.querySelectorAll(selector).forEach(function (v, i) {
            v.classList.remove(classList[i]);
        });
    } catch(e) {}
}

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
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

const path = "../assets/"

Reveal.addEventListener('slidechanged', function(e) {
    var indexh = e.indexh;
    var canvas = document.querySelector("#cover-holder > canvas");
    var bgLogo = document.querySelector(".bg-logo");

    if (indexh === 0) {
        if (canvas) {
            canvas.style.display = "block";
            canvas.play = true;

            document.getElementById("cover-holder").animate();
        }

        bgLogo && (bgLogo.style.display = "none");
    } else {
        if (canvas) {
            canvas.style.display = "none";
            canvas.play = false;
        }

        bgLogo && (bgLogo.style.display = "block");
    }

    //playAudio(indexh);
});

function playAudio(indexh) {
    var audio = document.querySelector("audio");

    if (audio) {
        if (indexh === 13) {
            audio.src = `${path}extreme-job.mp3`;
        } else if (indexh === 24) {
            //audio.src = `${path}pengsoo.mp3`;
        } else {
            audio.src = "";
        }

        audio[audio.src ? "play" : "pause"]();
    }
}

/**
 * Confetti effect
 */
const fireRun = (function() {
    const canvas = document.createElement("canvas");

    canvas.style.cssText = "width:100%;height:100%;position:fixed;top:0;left:0;z-index:9999;pointer-events:none;";
    document.body.appendChild(canvas);

    const getRandom = (min = 0, max = 10000) => Math.floor(Math.random() * (max - min) + min);

    const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    const count = getRandom(200, 400);
    const defaults = {
        origin: { y: 0.65 }
    };

    function fire(particleRatio, opts) {
        myConfetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    return function() {
        fire(0.25, {
            spread: getRandom(50, 100),
            startVelocity: getRandom(20, 60),
        });

        fire(0.2, {
            spread: 80,
        });

        fire(0.35, {
            spread: getRandom(200,400),
            decay: 0.91,
            scalar: 1
        });

        fire(0.1, {
            spread: getRandom(300, 500),
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.3
        });

        fire(0.2, {
            spread: getRandom(100, 200),
            startVelocity: 45,
            spread: 20
        });
    }
})();

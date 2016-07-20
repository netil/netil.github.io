/**
 * Simple bookmarklet timer
 * javascript:void(!function(d, s){s=d.createElement("script");s.src="http://netil.github.io/slides/timer.js";d.head.appendChild(s);Timer.init(prompt("Minutes?"))}(document));
 */
var Timer = {
    min: 10,
    wrapper: null,
    el: null,
    interval: null,
    init: function(min) {
        if (this.wrapper) {
            return;
        }

        var doc = document;
        var div = this.wrapper = doc.createElement("div");

        div.style.cssText = [
            "font-family:'Montserrat', 'Hanna', Impact, sans-serif",
            "width:110px",
            "padding:5px 0",
            "position:absolute",
            "color:#807E7E",
            "font-size:25px",
            "border:solid 2px",
            "text-align:center",
            "background-color:#fff",
            "border-radius: 20px",
            "left:calc(100vw - 130px)",
            "top:20px",
            "font-weight:bold",
            "z-index:1000",
            "cursor:pointer",
            "opacity:0.4"
        ].join(";");
        div.id = "timer";

        if (min && min > 0) {
            this.min = min;
        } else {
            min = this.min;
        }

        div.innerHTML = "<span>"+ (min < 10 ? "0":"") + min +":00</span>";
        this.el = div.querySelector("span");

        doc.body.insertBefore(div, doc.body.firstChild);

        var fp = function (e) {
            Timer.start();
            doc.body.removeEventListener("keydown", fp);
        }

        doc.body.addEventListener("keydown", fp, false);
    },

    start: function() {
        var wrapper = this.wrapper;
        var el = this.el || wrapper.querySelector("span");
        var duration = this.min*60, min, sec;

        this.interval = setInterval(function () {
            min = Math.abs(parseInt(duration / 60, 10));
            sec = Math.abs(parseInt(duration % 60, 10));

            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            el.innerHTML = min + ":" + sec;

            if (--duration < 0) {
                //clearInterval(interval);
                wrapper.style.color = "red";
            }
        }, 1000);
    }
};
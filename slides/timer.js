/**
 * Simple bookmarklet timer
 * javascript:void(!function(d, s){s=d.createElement("script");s.src="https://netil.github.io/slides/timer.js";d.head.appendChild(s);}(document));
 */
const Timer = {
    min: 10,
    wrapper: null,
    time: null,
    interval: null,
    init: function(min) {
        if (this.wrapper) {
            return;
        }

        const doc = document;
        const div = this.wrapper = doc.createElement("div");

        div.style.cssText = [
            "font-family:'DM Sans', sans-serif",
            "font-optical-sizing:auto",
            "font-weight:600",
            "font-size:33px",
            "font-style:normal",
            "font-optical-sizing:auto",
            "width:110px",
            "padding:3px",
            "position:absolute",
            "color:#807E7E",
            "border:solid 2px #727272",
            "text-align:center",
            "background-color:#fff",
            "border-radius:20px",
            "top:15px",
            "right:15px",
            "z-index:99999",
            "cursor:pointer",
            "position:fixed",
            "user-select:none"
        ].join(";");
        div.id = "timer";

        if (min && min > 0) {
            this.min = min;
        } else {
            min = this.min;
        }

        this.wrapper.innerHTML = "<span></span>";
        this.time = this.wrapper.querySelector("span");
        this.reset();

        doc.body.insertBefore(div, doc.body.firstChild);

        const fp = function (e) {
            Timer.start();
            div.style.opacity = .55;
            doc.body.removeEventListener("keydown", fp);
            div.removeEventListener("click", fp);
        }

        doc.body.addEventListener("keydown", fp, false);
        div.addEventListener("click", fp, false);
        div.addEventListener("dblclick", () => {
            this.reset();
            this.start();
        }, false);
    },

    start: function() {
        const wrapper = this.wrapper;
        const el = this.time || wrapper.querySelector("span");
        let duration = this.min*60;
        let min;
        let sec;

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
    },

    reset: function() {
        this.interval && clearInterval(this.interval);
        this.time.innerHTML = `${this.min < 10 ? "0":""} ${this.min}:00`;
        this.wrapper.style.color = "#000";
    }
};

const font = new FontFace("DM Sans", "url('https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZOIHTWEBlw.woff2')");

document.fonts.add(font);
font.load();

// Wait until the fonts are all loaded
document.fonts.ready.then(() => {
    console.log("initialized");
    // Timer.init(prompt("Minutes?"));
});
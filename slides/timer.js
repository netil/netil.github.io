var Timer = {
    min: 10,
    wrapper: null,
    el: null,
    interval: null,
    init: function(min) {
        if (this.wrapper) {
            return;
        }

        var div = this.wrapper = document.createElement("div");
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

        document.body.insertBefore(div, document.body.firstChild);

        var fp = function (e) {
            Timer.start();
            document.body.removeEventListener("keydown", fp);
        }

        document.body.addEventListener("keydown", fp, false);
    },

    start: function() {
        var  duration = this.min*60, min, sec;
        this.interval = setInterval(function () {
            min = Math.abs(parseInt(duration / 60, 10));
            sec = Math.abs(parseInt(duration % 60, 10));

            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            Timer.el.innerHTML = min + ":" + sec;

            if (--duration < 0) {
                //clearInterval(interval);
                Timer.wrapper.style.color = "red";
            }
        }, 1000);
    }
};
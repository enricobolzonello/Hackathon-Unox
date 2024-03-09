AFRAME.registerComponent('clock-text', {
    init: function () {
        this.ready = false;
        this.totalTimeRemaining = 0;
        this.markerFoundOnce = false; // Flag to track if marker has been found before
        this.TargetTime = 0;
        this.el.sceneEl.addEventListener('markerFound', () => {
            if (!this.markerFoundOnce) { // Check if marker found for the first time
                console.log('Marker found. Timer started.');
                this.ready = true;
                this.TargetTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes from now
                this.totalTimeRemaining = 10 * 60 * 1000; // 10 minutes in milliseconds
                this.markerFoundOnce = true; // Update flag
            }
        });
    },
    tick: function () {
        if (!this.ready) {
            return;
        }
        var timeRem;
        if (this.totalTimeRemaining > 0) {
            var hours = Math.floor(this.totalTimeRemaining / (1000 * 60 * 60));
            var mins = Math.floor((this.totalTimeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            var secs = Math.floor((this.totalTimeRemaining % (1000 * 60)) / 1000);
            timeRem = hours + " hrs " + mins + " mins " + secs + " secs ";
        } else {
            timeRem = "Finally! The day has come.";
        }
        this.el.setAttribute('value', timeRem);
        this.totalTimeRemaining = this.TargetTime - new Date().getTime(); // Update remaining time
    },
    pause: function () {
        this.ready = false;
    }
});
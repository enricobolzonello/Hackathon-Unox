AFRAME.registerComponent('clock-text', {

    schema:{
        TimeOutTime : {type:'int', default:10 }
    },
    init: function() {
        this.el.sceneEl.addEventListener('markerFound', () => {
            console.log('Timer init entered');
            el.addEventListener('textfontset', function() {
                this.ready = true;
            }.bind(this));
          })   
    },
    TimeLeft: function(){
        let currentDate = new Date();
        let time = currentDate.getTime(); // it is in millisecond
        console.log(`current time: ${time}`);
        this.totalTimeRemaining = this.TargetTime - time
        console.log(`time remaining: ${this.totalTimeRemaining}`);

        if(this.totalTimeRemaining >= 0){
                this.hours = Math.floor((this.totalTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.mins = Math.floor((this.totalTimeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                this.secs = Math.floor((this.totalTimeRemaining % (1000 * 60)) / 1000);
        }
    },
    TimeUp: function(){
        alert("TIME UP");
    },
    tick: function() {
        var el = this.el;
        if (!this.ready) {
            return;
        }

        this.TimeLeft();
        var timeRem;
        if(this.totalTimeRemaining > 0){
            timeRem = this.hours + " hrs " + this.mins + " mins " + this.secs + " secs ";
        }else{
            timeRem = "Finally! The day has come.";
        }

        el.setAttribute('value', timeRem);
    },
    pause: function () {
        this.ready=true;
    },
    play: function () {

        this.TargetTime=new Date(date.getTime() + this.data.TimeOutTime*1000); //calulate the target time
        this.ready = false;
        /*if(this.ready)
        {
            this.TargetTime = new Date(new Date().getTime() + this.totalTimeRemaining); //calcute the new target time 
        }
        this.ready=false;*/
    }
});
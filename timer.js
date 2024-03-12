
var recCommand = false;
var jsonData;

function setReceivedCommand(){
    /*console.log("command received");
    recCommand = true;*/

    const filePath = 'example.txt';

    // Fetch the file content using the fetch API
    fetch(filePath)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }
        return response.text();
    })
    .then(fileContent => {
        try {
        // Parse the JSON content
        jsonData = JSON.parse(fileContent);
        recCommand = true;

        // Access the parsed JSON data
        console.log('Parsed JSON data:', jsonData);

        if(jsonData.question != undefined){
            console.log(jsonData.minutes);
            document.getElementById('timer').setAttribute('clock-text', 'minutes: ' + parseInt(jsonData.minutes));
        }
        // Now you can work with the parsed JSON object
        // For example, access properties like jsonData.propertyName
        } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        }
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });
}

AFRAME.registerComponent('clock-text', {
    schema: 
    {   
        minutes : {type: 'number', default: 9}, 
        seconds: {type: 'number', default: 0},
        hours: {type: 'number', default: 0}
    },
    init: function () {

        this.ready = false;
        this.totalTimeRemaining = 0;
        this.markerFoundOnce = false; // Flag to track if marker has been found before
        this.TargetTime = 0;
        this.el.sceneEl.addEventListener('markerFound', () => {
            if (!this.markerFoundOnce && recCommand == true) { // Check if marker found for the first time
                console.log('Marker found. Timer started.');
                this.ready = true;
                this.TargetTime = new Date().getTime() + this.data.hours*3600*1000 + this.data.minutes * 60 * 1000 + this.data.seconds*1000; 
                this.totalTimeRemaining = this.data.hours*3600*1000 + this.data.minutes * 60 * 1000 + this.data.seconds*1000; // 10 minutes in milliseconds
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
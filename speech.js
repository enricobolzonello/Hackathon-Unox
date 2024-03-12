var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
   var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

  var commands = [ "set timer", "temperature"];
  
  var recognition = new SpeechRecognition();
  if (SpeechGrammarList) {
    // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
    // This code is provided as a demonstration of possible capability. You may choose not to use it.
    var speechRecognitionList = new SpeechGrammarList();
    var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
  }
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

function buttonclick(){


    recognition.start();
    console.log('Ready to receive a command.');

    recognition.onresult = function(event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        const command = event.results[0][0].transcript;
        //diagnostic.textContent = 'Result received: ' + color + '.';
        console.log("command: " + command);
        fetch("/faccioqualcosa", {
          method: "POST",
          body: JSON.stringify({
            data: command 
          }),
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(response => response.json()) // Assuming the server sends back JSON
          .then(data => {
            console.log('Success:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        //bg.style.backgroundColor = color;
        console.log('Confidence: ' + event.results[0][0].confidence);
      }
      
      recognition.onspeechend = function() {
        recognition.stop();
      }
      
      recognition.onnomatch = function(event) {
        alert("I didn't recognise that command.");
      }
      
      recognition.onerror = function(event) {
        alert('Error occurred in recognition: ' + event.error);
      }
}


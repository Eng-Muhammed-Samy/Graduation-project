/** @format */

const stt = document.getElementById('speech_to_text');
const TranscriptBar = document.getElementById('stt_container');
TranscriptBar.innerText = '';
var ccFlag = 0; // CounterFlag

try {
	var SpeechRecognition =
		window.SpeechRecognition ||
		window.mozSpeechRecognition ||
		window.msSpeechRecognition ||
		window.oSpeechRecognition ||
		window.webkitSpeechRecognition;
	var recognition = new SpeechRecognition();
	console.log('STT Activated');
} catch (e) {
	console.error(e);
}
// What is being said
var noteContent = '';

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = true;

// This block is called every time the Speech APi captures a line.
recognition.onresult = function (event) {
	// event is a SpeechRecognitionEvent object.
	// It holds all the lines we have captured so far.
	// We only need the current one.
	var current = event.resultIndex;

	// Get a transcript of what was said.
	var transcript = event.results[current][0].transcript;

	// Add the current transcript to the contents of our Note.
	// There is a weird bug on mobile, where everything is repeated twice.
	var mobileRepeatBug =
		current == 1 && transcript == event.results[0][0].transcript;

	if (!mobileRepeatBug) {
		noteContent += transcript;
		TranscriptBar.innerText = noteContent;
	}
};

recognition.start();

try {
	recognition.onspeechend = function () {
		recognition.stop();
	};
} catch (error) {}

try {
	recognition.onend = function () {
		recognition.start();
	};
} catch (error) {}

TranscriptBar.innerText = noteContent;

stt.addEventListener('click', () => {
	try {
		recognition.start();
	} catch (error) {}
	console.log(ccFlag);
	ccFlag += 1;
	if (ccFlag % 2 == 1) {
		// Starting TTS
		TranscriptBar.style.display = '';
		stt.innerHTML = `<i class="fas fa-closed-captioning"></i>`;
	} else {
		// Closing TTS
		TranscriptBar.style.display = 'none';
		stt.style.backgroundColor = '';
		stt.innerHTML = `<i class="far fa-closed-captioning"></i>`;
	}
});

try {
	recognition.onerror = function (event) {
		if (event.error == 'no-speech') {
			recognition.stop();
		}
	};
} catch (error) {}

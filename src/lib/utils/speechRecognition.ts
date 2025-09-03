
let _recognition: SpeechRecognition | undefined;
let _isActive = false

function startRecognition(onend: ((this: SpeechRecognition, ev: Event) => any) | null) {
    if (!isSupported) return

    if (!_recognition) {
        _recognition = recognition()
    }
    _recognition.continuous = true;
    _recognition.interimResults = true;

    // _recognition.onspeechstart = onspeechstart
    // _recognition.onspeechend = onspeechend

    _recognition.onresult = onresult

    _recognition.onend = onend

    try {
        _recognition.start()
        _isActive = true
    } catch (e) {
        console.error(e)
    }
}

function stopRecognition() {
    if (!_recognition) return

    _recognition.stop()
    _isActive = false
}

function speechRecognitionIsActive() {
    if (!_recognition) return false
}

// function onspeechstart() {
//     console.log(1, new Date())
// }

// function onspeechend() {
//     console.log(2, new Date())
// }

function onresult(this: SpeechRecognition, event: SpeechRecognitionEvent) {
    const recognizedText = event.results[0][0].transcript
    console.log('認識されたテキスト:', recognizedText)
}

function isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
}

function recognition(): SpeechRecognition {
    const recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : new SpeechRecognition()
    recognition.lang = 'ja-JP'
    return recognition
}

export { startRecognition, stopRecognition, speechRecognitionIsActive }

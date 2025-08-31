
let _recognition: SpeechRecognition | undefined;

function startRecognition(onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null) {
    if (!isSupported) return

    if (!_recognition) {
        _recognition = recognition()
    }
    _recognition.onspeechend = onspeechend

    try {
        _recognition.start()
    } catch (e) {
        console.error(e)
    }
}

function stopRecognition() {
    if (!_recognition) return

    _recognition.stop()
}

function isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
}

function recognition(): SpeechRecognition {
    const recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : new SpeechRecognition()
    recognition.lang = 'ja-JP'
    return recognition
}

export { startRecognition, stopRecognition }

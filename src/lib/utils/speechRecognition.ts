import { SPEECH_SYNTHESIS_PARAMS_LANG, TRANSLATION_DEFAULT_LANG_CODE, TRANSLATION_LANGS } from "$lib/constants";
import type { SpeechSynthesisParamsType } from "$lib/types/practice";

let _recognition: SpeechRecognition | undefined;
let _isActive = false

function defaultSpeechSynthesisParams(): SpeechSynthesisParamsType {
    return <SpeechSynthesisParamsType>{
        rate: 0.8,
        pitch: 1.0,
        volume: 1.0,
        lang: SPEECH_SYNTHESIS_PARAMS_LANG,
        gender: "female",
    }
}

function defaultTranslationLangCode(): string {
    const browserDefaultLangCode = TRANSLATION_LANGS.find((x) => navigator.language.startsWith(x.code))
    if (browserDefaultLangCode) return browserDefaultLangCode.code

    const defaultLangCode = TRANSLATION_LANGS.find((x) => x.code === TRANSLATION_DEFAULT_LANG_CODE)
    if (defaultLangCode) return defaultLangCode.code

    return TRANSLATION_LANGS[0].code
}

function startRecognition(onresult: ((recognizedText: string) => any) | null) {
    if (!isSupported) return

    if (!_recognition) {
        _recognition = recognition()
    }
    _recognition.continuous = true;
    _recognition.interimResults = false;

    // _recognition.onspeechstart = onspeechstart
    // _recognition.onspeechend = onspeechend

    _recognition.onresult = (e: SpeechRecognitionEvent) => {
        if (!onresult) return

        const recognizedText = e.results[0][0].transcript
        // console.log('認識されたテキスト:', recognizedText)
        onresult(recognizedText)
    }

    // _recognition.onend = onend

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

function isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
}

function recognition(): SpeechRecognition {
    const recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : new SpeechRecognition()
    recognition.lang = 'ja-JP'
    return recognition
}

export { defaultSpeechSynthesisParams, defaultTranslationLangCode, startRecognition, stopRecognition, speechRecognitionIsActive }

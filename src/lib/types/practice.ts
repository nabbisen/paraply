
export interface PracticeItemParams {
    text: string,
    speechSynthesisParams: SpeechSynthesisParams,
}

type Gender = "female" | "mail"

export interface SpeechSynthesisParams {
    rate: number,
    pitch: number,
    volume: number,
    lang: string,
    gender: Gender,
}

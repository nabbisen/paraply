import type { TranslationLangType } from "./i18n"

export interface PracticeItemParamsType {
    text: string,
    practiceSettings: PracticeSettingsType,
}

type Gender = "female" | "mail"

export interface SpeechSynthesisParamsType {
    rate: number,
    pitch: number,
    volume: number,
    lang: string,
    gender: Gender,
}

export interface PracticeSettingsType {
    speechSynthesisParams: SpeechSynthesisParamsType,
    translationLangCode: string,
}
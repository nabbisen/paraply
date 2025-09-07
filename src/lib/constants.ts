import type { TranslationLangType } from "./types/i18n"

export const SPEECH_SYNTHESIS_PARAMS_LANG = 'ja-JP'

export const FEMALE_VOICE_NAMES: string[] = [
    'Kyoko',
    'O-ren',
    'Ayumi',
    'Haruka',
    'ja-JP-Standard-A',
    'ja-JP-Standard-B'
]
export const MALE_VOICE_NAMES: string[] = ['Hattori', 'Ichiro', 'ja-JP-Standard-C', 'ja-JP-Standard-D']

export const TRANSLATION_SOURCE_LANG_CODE = 'ja'
export const TRANSLATION_DEFAULT_LANG_CODE = 'zh-CN'

export const TRANSLATION_LANGS: TranslationLangType[] = [
    {
        code: "ar",
        label: "🕌 العربية"
    },
    {
        code: "en",
        label: "🔤 English"
    },
    {
        code: "ne",
        label: "🇳🇵 नेपाली"
    },
    {
        code: "tl",
        label: "🇵🇭 Filipino"
    },
    {
        code: "tr",
        label: "🇹🇷 Türkçe"
    },
    {
        code: "zh-CN",
        label: "🇨🇳 简体中文"
    },
]
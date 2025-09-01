import selfIntroductionAudioSrc from '$lib/sounds/interview/self-introduction.mp3'
import reasonOnSelectionAudioSrc from '$lib/sounds/interview/reason-on-selection.mp3'
import selfPromotionAudioSrc from '$lib/sounds/interview/self-promotion.mp3'
import whatWantToDoAudioSrc from '$lib/sounds/interview/what-want-to-do.mp3'
import anyQuestionAudioSrc from '$lib/sounds/interview/any-question.mp3'
import closingAudioSrc from '$lib/sounds/interview/closing.mp3'

import { type InterviewRouteParam } from "$lib/types"

export const data = [
    {
        section: 'self-introduction',
        params: <InterviewRouteParam>{
            title: '自己紹介',
            audioSrc: selfIntroductionAudioSrc,
            speechSeconds: 30,
            nextRoute: '/interview/reason-on-selection'
        }
    },
    {
        section: 'reason-on-selection',
        params: <InterviewRouteParam>{
            title: '志望動機',
            audioSrc: reasonOnSelectionAudioSrc,
            speechSeconds: 30,
            nextRoute: '/interview/self-promotion'
        }
    },
    {
        section: 'self-promotion',
        params: <InterviewRouteParam>{
            title: '自己アピール',
            audioSrc: selfPromotionAudioSrc,
            speechSeconds: 30,
            nextRoute: '/interview/what-want-to-do'
        }
    },
    {
        section: 'what-want-to-do',
        params: <InterviewRouteParam>{
            title: '入学後にしたいこと',
            audioSrc: whatWantToDoAudioSrc,
            speechSeconds: 30,
            nextRoute: '/interview/any-question'
        }
    },
    {
        section: 'any-question',
        params: <InterviewRouteParam>{
            title: '質疑応答',
            audioSrc: anyQuestionAudioSrc,
            speechSeconds: 30,
            nextRoute: '/interview/closing'
        }
    },
    {
        section: 'closing',
        params: <InterviewRouteParam>{
            title: 'おつかれさまでした',
            audioSrc: closingAudioSrc,
            speechSeconds: 30,
            nextRoute: '/insights'
        }
    },
]

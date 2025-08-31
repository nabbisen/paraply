<script lang="ts">
	import { startRecognition } from '$lib/utils/speechRecognition'
	import { onDestroy, onMount } from 'svelte'
	import selfIntroductionAudioSrc from '$lib/sounds/interview/self-introduction.mp3'
	import reasonOnSelectionAudioSrc from '$lib/sounds/interview/reason-on-selection.mp3'
	import selfPromotionAudioSrc from '$lib/sounds/interview/self-promotion.mp3'
	import whatWantToDoAudioSrc from '$lib/sounds/interview/what-want-to-do.mp3'
	import anyQuestionAudioSrc from '$lib/sounds/interview/any-question.mp3'
	import closingAudioSrc from '$lib/sounds/interview/closing.mp3'
	import { goto } from '$app/navigation'

	let selfIntroductionAudio: HTMLAudioElement | null = $state(null)
	let reasonOnSelectionAudio: HTMLAudioElement | null = $state(null)
	let selfPromotionAudio: HTMLAudioElement | null = $state(null)
	let whatWantToDoAudio: HTMLAudioElement | null = $state(null)
	let anyQuestionAudio: HTMLAudioElement | null = $state(null)
	let closingAudio: HTMLAudioElement | null = $state(null)

	let theme = $state('')

	onMount(() => {
		selfIntroductionAudio = new Audio(selfIntroductionAudioSrc)
		reasonOnSelectionAudio = new Audio(reasonOnSelectionAudioSrc)
		selfPromotionAudio = new Audio(selfPromotionAudioSrc)
		whatWantToDoAudio = new Audio(whatWantToDoAudioSrc)
		anyQuestionAudio = new Audio(anyQuestionAudioSrc)
		closingAudio = new Audio(closingAudioSrc)

		setTimeout(() => {
			selfIntroductionAudio!.onended = () => {
				theme = '自己紹介'
				startRecognition(() => {
					reasonOnSelectionAudio!.onended = () => {
						theme = '志望動機'
						startRecognition(() => {
							selfPromotionAudio!.onended = () => {
								theme = '自己アピール'
								startRecognition(() => {
									whatWantToDoAudio!.onended = () => {
										theme = '入学後にしたいこと'
										startRecognition(() => {
											anyQuestionAudio!.onended = () => {
												theme = '質疑応答'
												startRecognition(() => {
													theme = 'おつかれさまでした'
													closingAudio!.onended = () => {
														goto('insights')
													}
													closingAudio!.play()
												})
											}
											anyQuestionAudio!.play()
										})
									}
									whatWantToDoAudio!.play()
								})
							}
							selfPromotionAudio!.play()
						})
					}
					reasonOnSelectionAudio!.play()
				})
			}
			selfIntroductionAudio!.play()
		}, 1000)
	})

	onDestroy(() => {
		selfIntroductionAudio?.pause()
		reasonOnSelectionAudio?.pause()
		selfPromotionAudio?.pause()
		whatWantToDoAudio?.pause()
		anyQuestionAudio?.pause()
		closingAudio?.pause()
	})
</script>

<h2>{theme}</h2>

<style>
	h2 {
		position: fixed;
		top: 1rem;
	}
</style>

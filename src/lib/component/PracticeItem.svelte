<script lang="ts">
	import type { PracticeItemParams } from '$lib/types/practice'
	import { startRecognition, stopRecognition } from '$lib/utils/speechRecognition'
	import { onMount } from 'svelte'

	const FEMALE_VOICE_NAMES: string[] = [
		'Kyoko',
		'O-ren',
		'Ayumi',
		'Haruka',
		'ja-JP-Standard-A',
		'ja-JP-Standard-B'
	]
	const MALE_VOICE_NAMES: string[] = ['Hattori', 'Ichiro', 'ja-JP-Standard-C', 'ja-JP-Standard-D']

	const props: { params: PracticeItemParams; onTextChanged: (text: string) => void } = $props()
	const params = props.params

	let text = $state(params.text)

	let isSpeaking = $state(false)
	let spoken = $state('')

	let errtext = $state('')

	let voices: SpeechSynthesisVoice[] = []

	function listen() {
		const utterance = new SpeechSynthesisUtterance(text)
		utterance.rate = params.speechSynthesisParams.rate
		utterance.pitch = params.speechSynthesisParams.pitch
		utterance.volume = params.speechSynthesisParams.volume
		utterance.lang = params.speechSynthesisParams.lang

		const voice = getVoice()
		if (!voice) {
			errtext = 'にほんごを さいせいするための おんせいデータが みつかりません'
			return
		}
		utterance.voice = voice

		utterance.onerror = (e) => {
			errtext = `さいせいちゅうにエラーがはっせいしました:\n${e.error}`
		}

		window.speechSynthesis.speak(utterance)
	}

	function startSpeech() {
		isSpeaking = true
		spoken = ''
		startRecognition((s: string) => {
			spoken = s
		})
	}

	function endSpeech() {
		stopRecognition()
		isSpeaking = false
	}

	onMount(() => {
		const filter = (x: SpeechSynthesisVoice) => x.lang === params.speechSynthesisParams.lang
		voices = window.speechSynthesis.getVoices().filter(filter)
		window.speechSynthesis.onvoiceschanged = function () {
			voices = window.speechSynthesis.getVoices().filter(filter)
		}
	})

	function getVoice(): SpeechSynthesisVoice | null {
		if (voices.length === 0) {
			return null
		}

		let voice = voices[0]

		const voiceNames =
			params.speechSynthesisParams.gender === 'female' ? FEMALE_VOICE_NAMES : MALE_VOICE_NAMES
		const genderVoice = voices.find((x) => voiceNames.includes(x.name))
		if (genderVoice) {
			voice = genderVoice
		}

		return voice
	}
</script>

{#if errtext}
	<p>{errtext}</p>
{/if}

<textarea bind:value={text}></textarea>

<div class="d-flex">
	<button onclick={listen} disabled={params.speechSynthesisParams.volume === 0}>きいてみる</button>
	{#if isSpeaking}
		<button onclick={endSpeech}>おして、しゅうりょう</button>
	{:else}
		<button onclick={startSpeech}>はなしてみよう</button>
	{/if}
</div>

{#if spoken}
	<p>{spoken}</p>
{/if}

<style>
	.d-flex {
		gap: 0.7rem;
	}

	textarea {
		min-width: 24em;
		max-width: 80vw;
		min-height: 5em;
		margin-bottom: 1.8rem;
		font-size: 120%;
	}

	button {
		width: 14em;
	}
</style>

<script lang="ts">
	import {
		speechRecognitionIsActive,
		startRecognition,
		stopRecognition
	} from '$lib/utils/speechRecognition'
	import { onDestroy } from 'svelte'
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation'
	import { page } from '$app/state'
	import type { InterviewRouteParam } from '$lib/types/index.js'
	import { data } from '../data.js'

	let params: InterviewRouteParam | null = $state(null)

	let audio: HTMLAudioElement | null = $state(null)
	let _title = $state('')
	let finishedRecording = $state(false)

	$effect(() => {
		params = data.find((x) => x.section === page.params.section)!.params
	})

	$effect(() => {
		if (finishedRecording) {
			goto(params!.nextRoute!)
		}
	})

	function speechRecognitionOnEnd() {
		finishedRecording = true
		if (speechRecognitionIsActive()) {
			stopRecognition()
		}
	}

	afterNavigate(() => {
		audio = new Audio(params!.audioSrc!)

		setTimeout(() => {
			audio!.onended = () => {
				_title = params!.title!

				startRecognition(speechRecognitionOnEnd)
				setTimeout(speechRecognitionOnEnd, params!.speechSeconds! * 1000)
			}
			audio!.play()
		}, 1000)
	})

	beforeNavigate(() => {
		finishedRecording = false
		_title = ''
		audio?.pause()
		stopRecognition()
	})

	onDestroy(() => {
		audio?.pause()
	})
</script>

<h2>{_title}</h2>
<label class="button">次へ進む<input type="checkbox" bind:checked={finishedRecording} /></label>

<style>
	h2 {
		position: fixed;
		top: 1rem;
	}

	label {
		position: fixed;
		bottom: 4rem;
		width: 12em;
		text-align: center;
	}

	label input {
		display: none;
	}
</style>

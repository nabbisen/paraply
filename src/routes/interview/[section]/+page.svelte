<script lang="ts">
	import { startRecognition } from '$lib/utils/speechRecognition'
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

	afterNavigate(() => {
		audio = new Audio(params!.audioSrc!)

		setTimeout(() => {
			audio!.onended = () => {
				_title = params!.title!
				startRecognition(() => {
					finishedRecording = true
				})

				setTimeout(() => {
					finishedRecording = true
				}, params!.speechSeconds! * 1000)
			}
			audio!.play()
		}, 1000)
	})

	beforeNavigate(() => {
		finishedRecording = false
		_title = ''
		audio?.pause()
	})

	onDestroy(() => {
		audio?.pause()
	})
</script>

<h2>{_title}</h2>

<style>
	h2 {
		position: fixed;
		top: 1rem;
	}
</style>

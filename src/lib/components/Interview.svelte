<script lang="ts">
	import { startRecognition } from '$lib/utils/speechRecognition'
	import { onDestroy, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import type { InterviewRouteParam } from '$lib/types'

	let { title, audioSrc, speechSeconds, nextRoute }: InterviewRouteParam = $props()

	let audio: HTMLAudioElement | null = null
	let _title = $state('')
	let finishedRecording = $state(false)

	onMount(() => {
		audio = new Audio(audioSrc)

		setTimeout(() => {
			audio!.onended = () => {
				_title = title
				startRecognition(() => {
					finishedRecording = true
				})

				setTimeout(() => {
					finishedRecording = true
				}, speechSeconds * 1000)
			}
			audio!.play()
		}, 1000)
	})

	onDestroy(() => {
		audio?.pause()
	})

	$effect(() => {
		if (finishedRecording) {
			console.log(nextRoute)
			goto(nextRoute)
		}
	})
</script>

<h2>{_title}</h2>

<style>
	h2 {
		position: fixed;
		top: 1rem;
	}
</style>

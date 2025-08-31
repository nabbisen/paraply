<script lang="ts">
	import { goto } from '$app/navigation'
	import knockAudioSrc from '$lib/sounds/knock.mp3'
	import successAudioSrc from '$lib/sounds/success.mp3'
	import failureAudioSrc from '$lib/sounds/failure.mp3'
	import comeInAudioSrc from '$lib/sounds/interview/come-in.mp3'
	import comeInQuicklyAudioSrc from '$lib/sounds/interview/come-in.mp3'
	import { onMount } from 'svelte'

	let knockAudio: HTMLAudioElement | null = $state(null)
	let successAudio: HTMLAudioElement | null = $state(null)
	let failureAudio: HTMLAudioElement | null = $state(null)
	let comeInAudio: HTMLAudioElement | null = $state(null)
	let comeInQuicklyAudio: HTMLAudioElement | null = $state(null)

	const KNOCKED_FILLED_COUNT = 3

	let knocked = $state(0)
	let entering = $state(false)
	let ready = $state(false)
	const tooManyKnocked = $derived(KNOCKED_FILLED_COUNT < knocked)

	onMount(() => {
		knockAudio = new Audio(knockAudioSrc)
		successAudio = new Audio(successAudioSrc)
		failureAudio = new Audio(failureAudioSrc)
		comeInAudio = new Audio(comeInAudioSrc)
		comeInAudio.onended = () => {
			ready = true
		}
		comeInQuicklyAudio = new Audio(comeInQuicklyAudioSrc)
	})

	function enter() {
		entering = true
		if (knocked === KNOCKED_FILLED_COUNT) {
			successAudio!.play()
		} else {
			failureAudio!.play()
		}
		setTimeout(() => {
			goto('interview')
		}, 1800)
	}

	function knock() {
		knocked += 1
		knockAudio!.play()

		if (knocked === KNOCKED_FILLED_COUNT) {
			setTimeout(() => {
				comeInAudio!.play()
			}, 700)
		} else if (knocked % KNOCKED_FILLED_COUNT === 0) {
			setTimeout(() => {
				comeInQuicklyAudio!.play()
			}, 300)
		}
	}
</script>

<div>
	<button class="enter" onclick={enter} class:ready disabled={entering}>入室</button>
	<button class:too-many-knocked={tooManyKnocked} onclick={knock}>Knock {knocked}</button>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		position: absolute;
		right: 0;
		top: 10vh;
		width: 60vw;
		max-width: 40rem;
		height: 80vh;
	}
	button {
		width: 20vw;
		height: 80vh;
	}
	button.too-many-knocked {
		background-color: #dd4411;
	}
	button.enter {
		width: 6rem;
		height: 5rem;
	}
	button.enter.ready {
		background-color: #00b356;
	}
	button.enter.ready:hover {
		background-color: #00994a;
	}
</style>

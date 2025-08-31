<script lang="ts">
	import { goto } from '$app/navigation'
	import { startRecognition, stopRecognition } from '$lib/utils/speechRecognition'
	import walkingAudioSrc from '$lib/sounds/walking.mp3'
	import { onMount } from 'svelte'

	let walkingAudio: HTMLAudioElement | null = $state(null)
	onMount(() => {
		walkingAudio = new Audio(walkingAudioSrc)
	})

	async function start() {
		if (!(await getMicrophoneAccess())) {
			return
		}

		walkingAudio!.play()

		setTimeout(() => {
			goto('entrance')
		}, 2000)
	}

	async function getMicrophoneAccess(): Promise<boolean> {
		let ret = false
		try {
			startRecognition(null)
			setTimeout(stopRecognition, 2000)
			ret = true
		} catch (err) {
			console.error('マイクへのアクセスが拒否されました', err)
		}
		return ret
	}
</script>

<button onclick={start}> 開始する (マイクが必要) </button>

<style>
	button {
		font-size: 2em;
	}
</style>

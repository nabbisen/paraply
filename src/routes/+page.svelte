<script lang="ts">
	import { goto } from '$app/navigation'
	import { startRecognition, stopRecognition } from '$lib/utils/speechRecognition'
	import walkingAudioSrc from '$lib/sounds/walking.mp3'
	import { onMount } from 'svelte'

	let walkingAudio: HTMLAudioElement | null = $state(null)
	onMount(() => {
		walkingAudio = new Audio(walkingAudioSrc)
	})

	async function interview() {
		if (!(await getMicrophoneAccess())) {
			return
		}

		walkingAudio!.play()

		setTimeout(() => {
			goto('/entrance')
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

<div class="d-flex" style="flex-direction: column;">
	<div class="d-flex">
		<a class="button" href="/practice">はなす れんしゅう</a>
		<button onclick={interview}>めんせつ</button>
	</div>
	<p>※ マイクがひつよう</p>
</div>

<style>
	.d-flex {
		gap: 2rem;
		justify-content: center;
	}

	button,
	.button {
		width: 12em;
		height: 4em;
		padding: 0;
		font-size: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p {
		width: 100%;
		text-align: center;
	}
</style>

<script lang="ts">
	import PracticeItem from '$lib/component/PracticeItem.svelte'
	import type { PracticeItemParams, SpeechSynthesisParams } from '$lib/types/practice'

	let text = $state('わたしのなまえは、ダレソレです')

	const LANG = 'ja-JP'

	let rate = $state(0.8)
	let pitch = $state(1.0)
	let volume = $state(1.0)
	let gender = $state('female')

	let params = $derived(<PracticeItemParams>{
		text,
		speechSynthesisParams: <SpeechSynthesisParams>{
			rate,
			pitch,
			volume,
			lang: LANG,
			gender
		}
	})
</script>

<h2>れんしゅう</h2>

<h3>せってい</h3>

<div class="d-flex" style="flex-direction: column;">
	<label
		><span>はなすはやさ</span>
		<input type="range" min="0" max="1.2" step="0.1" bind:value={rate} />
	</label>
	<label
		><span>こえのたかさ</span>
		<input type="range" min="0" max="1.2" step="0.1" bind:value={pitch} />
	</label>
	<label
		><span>おんりょう</span>
		<input type="range" min="0" max="1" step="0.1" bind:value={volume} />
	</label>
	<div class="d-flex" style="width: 100%; justify-content: center;">
		<label><input type="radio" bind:group={gender} value="female" />じょせい</label>
		<label><input type="radio" bind:group={gender} value="male" />だんせい</label>
	</div>
</div>

<h3>おんせい</h3>

{#key [rate, pitch, volume, gender]}
	<PracticeItem {params} onTextChanged={(x) => (text = x)} />
{/key}

<style>
	.d-flex {
		gap: 1.1rem;
	}

	label span {
		display: inline-block;
		width: 7em;
	}
</style>

<script lang="ts">
	import type { SpeechSynthesisParams } from '$lib/types/practice'

	let props: { params: SpeechSynthesisParams; onchange: (updated: SpeechSynthesisParams) => any } =
		$props()

	let rate = $state(props.params.rate)
	let pitch = $state(props.params.pitch)
	let volume = $state(props.params.volume)
	let lang = $state(props.params.lang)
	let gender = $state(props.params.gender)

	let updated = $derived(<SpeechSynthesisParams>{
		rate,
		pitch,
		volume,
		lang,
		gender
	})
</script>

<h3>設定 (せってい) | Settings</h3>

<div class="d-flex" style="flex-direction: column;">
	<label>
		<span>速さ (はやさ) | Speed</span>
		<input
			type="range"
			min="0"
			max="1.2"
			step="0.1"
			bind:value={rate}
			onchange={() => props.onchange(updated)}
		/>
	</label>
	<label>
		<span>声の高さ (こえのたかさ) | Pitch</span>
		<input
			type="range"
			min="0"
			max="1.2"
			step="0.1"
			bind:value={pitch}
			onchange={() => props.onchange(updated)}
		/>
	</label>
	<label>
		<span>音量 (おんりょう) | Volume</span>
		<input
			type="range"
			min="0"
			max="1"
			step="0.1"
			bind:value={volume}
			onchange={() => props.onchange(updated)}
		/>
	</label>
	<div class="d-flex" style="width: 100%; justify-content: center;">
		<label
			><input
				type="radio"
				bind:group={gender}
				value="female"
				onchange={(e) => e.currentTarget.checked && props.onchange(updated)}
			/>女性 (じょせい) | Female</label
		>
		<label
			><input
				type="radio"
				bind:group={gender}
				value="male"
				onchange={(e) => e.currentTarget.checked && props.onchange(updated)}
			/>男性 (だんせい) | Male</label
		>
	</div>
</div>

<style>
	.d-flex {
		gap: 1.1rem;
	}

	label span {
		display: inline-block;
		width: 12em;
	}
</style>

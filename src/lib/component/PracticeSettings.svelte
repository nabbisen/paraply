<script lang="ts">
	import { TRANSLATION_LANGS } from '$lib/constants'
	import type { PracticeSettingsType, SpeechSynthesisParamsType } from '$lib/types/practice'

	let props: { params: PracticeSettingsType; onchange: (updated: PracticeSettingsType) => any } =
		$props()

	let rate = $state(props.params.speechSynthesisParams.rate)
	let pitch = $state(props.params.speechSynthesisParams.pitch)
	let volume = $state(props.params.speechSynthesisParams.volume)
	let lang = $state(props.params.speechSynthesisParams.lang)
	let gender = $state(props.params.speechSynthesisParams.gender)

	let translationLangCode = $state(props.params.translationLangCode)

	let speechSynthesisParams = $derived(<SpeechSynthesisParamsType>{
		rate,
		pitch,
		volume,
		lang,
		gender
	})

	let updated = $derived(<PracticeSettingsType>{
		speechSynthesisParams,
		translationLangCode
	})
</script>

<h3>⚙ 設定 (せってい) | Settings</h3>

<div class="content">
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
	<select bind:value={translationLangCode} onchange={() => props.onchange(updated)}>
		{#each TRANSLATION_LANGS as lang}
			<option value={lang.code} selected={lang.code === translationLangCode}>{lang.label}</option>
		{/each}
	</select>
</div>

<style>
	.content {
		margin-top: 1.2rem;
		margin-bottom: 1.6rem;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	label span {
		display: inline-block;
		width: 12em;
	}
</style>

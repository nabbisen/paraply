<script lang="ts">
	import PracticeItem from '$lib/component/PracticeItem.svelte'
	import type { PracticeItemParamsType, PracticeSettingsType } from '$lib/types/practice'

	let props: { practiceSettings: PracticeSettingsType } = $props()

	let texts = $state([
		'わたしのなまえは、ダレソレです',
		'もう一度お願いします',
		'わかりません',
		'本日はどうもありがとうございました'
	])

	let practiceItems = $derived(
		texts.map(
			(text) =>
				<PracticeItemParamsType>{
					text,
					practiceSettings: props.practiceSettings
				}
		)
	)
</script>

<h3>🗣️ 発声 (はっせい) | Speeches</h3>

{#key props.practiceSettings}
	{#each practiceItems as practiceItem}
		<PracticeItem
			params={<PracticeItemParamsType>{
				text: practiceItem.text,
				practiceSettings: props.practiceSettings
			}}
			onTextChanged={(x) => (practiceItem.text = x)}
		/>
	{/each}
{/key}

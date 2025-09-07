<script lang="ts">
	import PracticeItem from '$lib/component/PracticeItem.svelte'
	import PracticeSettings from '$lib/component/PracticeSettings.svelte'
	import type { PracticeItemParams, SpeechSynthesisParams } from '$lib/types/practice'
	import { defaultSpeechSynthesisParams } from '$lib/utils/speechRecognition'

	let text = $state('わたしのなまえは、ダレソレです')

	let speechSynthesisParams = $state(defaultSpeechSynthesisParams())

	let params = $derived(<PracticeItemParams>{
		text,
		speechSynthesisParams
	})

	function settingsOnchange(updated: SpeechSynthesisParams) {
		speechSynthesisParams = updated
	}
</script>

<h2>練習 (れんしゅう) | Practice</h2>

<PracticeSettings params={speechSynthesisParams} onchange={settingsOnchange} />

<h3>発声 (はっせい) | Speeches</h3>

{#key speechSynthesisParams}
	<PracticeItem {params} onTextChanged={(x) => (text = x)} />
{/key}

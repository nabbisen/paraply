<script lang="ts">
	import PracticeItem from '$lib/component/PracticeItem.svelte'
	import PracticeSettings from '$lib/component/PracticeSettings.svelte'
	import { TRANSLATION_DEFAULT_LANG, TRANSLATION_LANGS } from '$lib/constants'
	import type { PracticeItemParamsType, PracticeSettingsType } from '$lib/types/practice'
	import { defaultSpeechSynthesisParams } from '$lib/utils/speechRecognition'

	let text = $state('わたしのなまえは、ダレソレです')

	let practiceSettings = $state(<PracticeSettingsType>{
		speechSynthesisParams: defaultSpeechSynthesisParams(),
		translationLangCode: TRANSLATION_LANGS.find((x) => x.code === TRANSLATION_DEFAULT_LANG)!.code
	})

	let params = $derived(<PracticeItemParamsType>{
		text,
		practiceSettings
	})

	function settingsOnchange(updated: PracticeSettingsType) {
		practiceSettings = updated
	}
</script>

<h2>練習 (れんしゅう) | Practice</h2>

<PracticeSettings params={practiceSettings} onchange={settingsOnchange} />

<h3>発声 (はっせい) | Speeches</h3>

{#key practiceSettings}
	<PracticeItem {params} onTextChanged={(x) => (text = x)} />
{/key}

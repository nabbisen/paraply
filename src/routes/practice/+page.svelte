<script lang="ts">
	import PracticeContent from '$lib/component/PracticeContent.svelte'
	import PracticeSettings from '$lib/component/PracticeSettings.svelte'
	import { TRANSLATION_DEFAULT_LANG, TRANSLATION_LANGS } from '$lib/constants'
	import type { PracticeSettingsType } from '$lib/types/practice'
	import { defaultSpeechSynthesisParams } from '$lib/utils/speechRecognition'

	let practiceSettings: PracticeSettingsType = $state({
		speechSynthesisParams: defaultSpeechSynthesisParams(),
		translationLangCode: TRANSLATION_LANGS.find((x) => x.code === TRANSLATION_DEFAULT_LANG)!.code
	})

	function settingsOnchange(updated: PracticeSettingsType) {
		practiceSettings = updated
	}
</script>

<h2>練習 (れんしゅう) | Practice</h2>

<PracticeSettings params={practiceSettings} onchange={settingsOnchange} />
<PracticeContent {practiceSettings} />

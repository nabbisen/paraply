<script lang="ts">
	import PracticeContent from '$lib/component/PracticeContent.svelte'
	import PracticeSettings from '$lib/component/PracticeSettings.svelte'
	import type { PracticeSettingsType } from '$lib/types/practice'
	import {
		defaultSpeechSynthesisParams,
		defaultTranslationLangCode
	} from '$lib/utils/speechRecognition'

	let practiceSettings: PracticeSettingsType = $state({
		speechSynthesisParams: defaultSpeechSynthesisParams(),
		translationLangCode: defaultTranslationLangCode()
	})

	function settingsOnchange(updated: PracticeSettingsType) {
		practiceSettings = updated
	}
</script>

<h2>練習 (れんしゅう) | Practice</h2>

<PracticeSettings params={practiceSettings} onchange={settingsOnchange} />
<PracticeContent {practiceSettings} />

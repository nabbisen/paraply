<script lang="ts">
    import { onMount } from "svelte";

    // Declare variable types
    let recognizedText: string = "Please speak into the microphone...";
    let isListening: boolean = false;
    let recognition: SpeechRecognition | undefined;

    // Extend type definition to accurately handle the onresult event type
    interface CustomSpeechRecognitionEvent extends Event {
        readonly resultIndex: number;
        readonly results: SpeechRecognitionResultList;
    }

    onMount(() => {
        // Check if Web Speech API is available
        if ("webkitSpeechRecognition" in window) {
            // Create a SpeechRecognition instance
            recognition = new webkitSpeechRecognition();
            // Do not continuously get voice input until recognition is complete
            recognition.continuous = false;
            // Get recognition results in real-time
            recognition.interimResults = true;
            // Set language to English
            recognition.lang = "en-US";

            // Event handler for when speech is recognized
            recognition.onresult = (event: CustomSpeechRecognitionEvent) => {
                let interimTranscript = "";
                let finalTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const result = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += result;
                    } else {
                        interimTranscript += result;
                    }
                }
                recognizedText = finalTranscript || interimTranscript;
            };

            // Event handler for when recognition ends
            recognition.onend = () => {
                console.log("Recognition ended.");
                isListening = false;
                if (
                    !recognizedText ||
                    recognizedText === "Please speak into the microphone..."
                ) {
                    recognizedText =
                        "Could not recognize speech. Please try again.";
                }
            };

            // Event handler for when an error occurs
            recognition.onerror = (event: Event) => {
                console.error("Recognition error:", (event as any).error);
                isListening = false;
                recognizedText = `An error occurred: ${(event as any).error}`;
            };
        } else {
            recognizedText =
                "Your browser does not support the Web Speech API.";
        }
    });

    // Function to start recognition
    function startListening(): void {
        if (!recognition) {
            recognizedText = "Web Speech API is not available.";
            return;
        }
        isListening = true;
        recognizedText = "Listening...";
        recognition.start();
    }

    // Function to stop recognition
    function stopListening(): void {
        if (recognition && isListening) {
            recognition.stop();
            isListening = false;
            recognizedText = "Recognition stopped.";
        }
    }
</script>

<div class="container">
    <h2>🎤 Speech Recognition Test</h2>

    <div class="text-display">
        {recognizedText}
    </div>

    <div class="buttons">
        <button
            class="start-button"
            on:click={startListening}
            disabled={isListening}
        >
            Start Microphone Input
        </button>
        <button
            class="stop-button"
            on:click={stopListening}
            disabled={!isListening}
        >
            Stop Microphone Input
        </button>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        max-width: 600px;
        margin: 2rem auto;
        font-family: Arial, sans-serif;
    }
    .text-display {
        background-color: #f0f0f0;
        color: #252525;
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 4px;
        width: 100%;
        min-height: 100px;
        word-wrap: break-word;
        text-align: left;
    }
    .buttons {
        display: flex;
        gap: 1rem;
    }
    button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .start-button {
        background-color: #4caf50;
        color: white;
    }
    .start-button:hover {
        background-color: #45a049;
    }
    .stop-button {
        background-color: #f44336;
        color: white;
    }
    .stop-button:not(:disabled):hover {
        background-color: #d32f2f;
    }
    button:disabled {
        background-color: #ccc;
        color: #727272;
        cursor: not-allowed;
    }
</style>

<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import type { Content } from '$lib/types/content';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		selectedContent: Content;
        contentCategory: string;
	};
	const { selectedContent, contentCategory }: Props = $props();

	let selectedAnswer: string = $state('');
    let showResult: boolean = $state(false);
    let isCorrectAnswer: boolean = $state(false);
    let answerIsSelected: boolean = $state(false);

    function handleSubmit() {
        if (selectedAnswer) {
            const idCorrectAnswer = selectedContent.question?.respuestas.find((response) => response.correcta)?.id;
            if (idCorrectAnswer === selectedAnswer) {
                showResult = true;
                isCorrectAnswer = true;
                answerIsSelected = true;
            } else {
                showResult = true;
                isCorrectAnswer = false;
                answerIsSelected = true;
            }
        } else {
            showResult = true;
            isCorrectAnswer = false;
            answerIsSelected = false;
        }
    }
</script>

<Card class="h-full p-4">
	{#if contentCategory === 'seleccion'}
		{#if selectedContent.question}
			<p class="font-medium mb-4">{selectedContent.question.enunciado}</p>

			<div class="space-y-2">
				{#each selectedContent.question.respuestas as response}
					<label class="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100">
						<input
						type="radio"
						bind:group={selectedAnswer}
						value={response.id}
						class="hidden"
                        onclick={() => showResult = false}
						/>
						<span class="w-4 h-4 border rounded-full flex items-center justify-center">
							{#if selectedAnswer === response.id}
								<span class="w-2 h-2 bg-purple-600 rounded-full"></span>
							{/if}
						</span>
						{response.texto}

                        {#if showResult}
                            {#if isCorrectAnswer && answerIsSelected}
                                {#if response.correcta}
                                    <i class="bi bi-check-circle-fill text-green-500"></i>
                                {/if}
                            {:else if !isCorrectAnswer && answerIsSelected}
                                {#if response.id === selectedAnswer}
                                    <i class="bi bi-x-circle-fill text-red-500"></i>
                                {/if}
                            {/if}
                        {/if}
					</label>
				{/each}
			</div>

			{#if selectedAnswer}
				<p class="mt-4 text-sm text-purple-600">Opción seleccionada: {selectedAnswer}</p>
			{/if}

            {#if showResult && !answerIsSelected}
                <p class="mt-4 text-sm text-red-500">Debes seleccionar una respuesta</p>
            {/if}

			<div class="flex justify-end mt-4">
				<Button onclick={handleSubmit}>Enviar respuesta</Button>
			</div>
			
		{:else}
            <p class="text-center text-slate-700">Cargando contenido...</p>
		{/if}
	{:else}
		<p class="text-center text-slate-700">Cargando contenido...</p>
	{/if}
</Card>

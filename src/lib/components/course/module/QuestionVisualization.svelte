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
						/>
						<span class="w-4 h-4 border rounded-full flex items-center justify-center">
							{#if selectedAnswer === response.id}
								<span class="w-2 h-2 bg-purple-600 rounded-full"></span>
							{/if}
						</span>
						{response.texto}
					</label>
				{/each}
			</div>

			{#if selectedAnswer}
				<p class="mt-4 text-sm text-purple-600">Opción seleccionada: {selectedAnswer}</p>
			{/if}

			<div class="flex justify-end mt-4">
				<Button>Enviar respuesta</Button>
			</div>
			
		{:else}
            <p class="text-center text-slate-700">Cargando contenido...</p>
		{/if}
	{:else}
		<p class="text-center text-slate-700">Cargando contenido...</p>
	{/if}
</Card>

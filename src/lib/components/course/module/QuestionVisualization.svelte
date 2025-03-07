<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Content, QuestionContent } from '$lib/types/content';
	import { Button } from '$lib/components/ui/button';
	import { ContentStore } from '$lib/stores/content';
	import { LoaderCircle, MessageCircleQuestion } from 'lucide-svelte';

	type Props = {
		selectedContent: Content;
		contentCategory: string;
	};
	const { selectedContent, contentCategory }: Props = $props();

	let selectedAnswer: string = $state('');
	let showResult: boolean = $state(false);
	let isCorrectAnswer: boolean = $state(false);
	let answerIsSelected: boolean = $state(false);

	let questionVisualization: QuestionContent | null = $state(null);

	const contentStore = new ContentStore();

	async function getQuestionVisualization() {
		const visualization: QuestionContent | null =
			await contentStore.getQuestionContentVisualization(selectedContent.id);
		questionVisualization = visualization;
	}

	async function handleSubmit(selectedAnswer: string) {
		if (!selectedAnswer) {
			showResult = true;
			isCorrectAnswer = false;
			answerIsSelected = false;
			return;
		} else {
			const isCorrect = await contentStore.checkAnswer(selectedContent.id);
			console.log(isCorrect);
		}
	}

	$effect(() => {
        selectedAnswer = '';
		if (selectedContent) {
			getQuestionVisualization();
		}
	});
</script>

<Card.Root class="h-full">
	<Card.Header class="w-full">
		<Card.Title class="flex gap-2">
			{#if contentCategory === 'seleccion'}
				<MessageCircleQuestion />
			{:else}
				<LoaderCircle class="animate-spin" />
			{/if}
			<span>{selectedContent.name}</span>
		</Card.Title>
	</Card.Header>
	<Card.Content class="h-full">
		{#if questionVisualization}
			<p class="mb-4 font-medium">{questionVisualization.enunciado}</p>

			<div class="space-y-2">
				{#each questionVisualization.respuestas as response}
					<label
						class="flex cursor-pointer items-center gap-2 rounded-md border p-2 hover:bg-gray-100"
					>
						<input
							type="radio"
							bind:group={selectedAnswer}
							value={response[0]}
							class="hidden"
							onclick={() => (showResult = false)}
						/>
						<span class="flex h-4 w-4 items-center justify-center rounded-full border">
							{#if selectedAnswer === response[0]}
								<span class="h-2 w-2 rounded-full bg-purple-600"></span>
							{/if}
						</span>
						{response[1]}

						{#if showResult}
							{#if isCorrectAnswer && answerIsSelected}
								{#if response.correcta}
									<i class="bi bi-check-circle-fill text-green-500"></i>
								{/if}
							{:else if !isCorrectAnswer && answerIsSelected}
								{#if response[0] === selectedAnswer}
									<i class="bi bi-x-circle-fill text-red-500"></i>
								{/if}
							{/if}
						{/if}
					</label>
				{/each}
			</div>

			{#if showResult && !answerIsSelected}
				<p class="mt-4 text-sm text-red-500">Debes seleccionar una respuesta</p>
			{/if}

			<div class="mt-4 flex justify-end">
				<Button onclick={() => handleSubmit(selectedAnswer)}>Enviar respuesta</Button>
			</div>
		{:else}
			<p class="text-center text-slate-700">Cargando pregunta...</p>
		{/if}
	</Card.Content>
</Card.Root>

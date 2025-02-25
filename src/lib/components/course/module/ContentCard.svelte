<script lang="ts">
	import type { Content, ContentInteraction } from '$types/content';
	import { CategoryStore } from '$lib/stores/category';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount } from 'svelte';
	import RateTooltip from '$lib/components/kit/RateTooltip.svelte';
	import { ContentStore } from '$lib/stores/content';
	import { storeAuth } from '$lib/stores/auth';

	type Props = {
		content: Content;
		handleSelectContent: (content: Content, content_type: string) => void;
	};
	const { content, handleSelectContent }: Props = $props();
	let contentCategory: string = $state('');
	let userInteraction: ContentInteraction | null = $state(null);
	let userRating: number | undefined = $state(undefined);

	const storeContent = new ContentStore();

	async function fetchContentCategory() {
		try {
			const categoryStore = new CategoryStore();
			const category = await categoryStore.getContentCategory(content.content_type);
			contentCategory = category?.name || '';
		} catch (error) {
			console.error(error);
		}
	}

	async function handleRateChange(rate: number) {
		if (userInteraction !== null) {
			const interaction = await storeContent.updateRate(
				userInteraction.id as string,
				rate,
				userInteraction.completed
			);
			userInteraction = interaction;
		} else {
			const interaction = await storeContent.rateContent(rate, false, content.id);
			userInteraction = interaction;
		}
	}

	async function handleRateDelete() {
		if (userInteraction) {
			storeContent.deleteRate(userInteraction.id as string);
			userInteraction = null;
			userRating = undefined;
		}
	}

	onMount(async () => {
		fetchContentCategory();
		
		const interactions = await storeContent.getContentInteractions(content.id);
		console.log("User: ", storeAuth.getUser()?.id);
		
		const interaction = interactions.find((interaction) => interaction.user === storeAuth.getUser()?.id);
		if (interaction) {
			userInteraction = interaction;
			userRating = interaction.rating;
		}
	});
</script>

<div
	role="button"
	tabindex="0"
	onclick={() => handleSelectContent(content, contentCategory)}
	onkeydown={() => handleSelectContent(content, contentCategory)}
	class="flex max-h-[300px] min-h-[100px] cursor-pointer flex-row items-center gap-4 rounded-lg bg-white p-4 shadow-md transition-transform hover:shadow-xl"
>
	<div class="flex h-[80px] w-[80px] items-center justify-center">
		{#if contentCategory === 'video'}
			<i class="bi bi-play-circle-fill" style="font-size:80px; color:mediumpurple;"></i>
		{:else if contentCategory === 'pdf'}
			<i class="bi bi-file-pdf-fill" style="font-size:80px; color:mediumpurple;"></i>
		{:else if contentCategory === 'seleccion'}
			<i class="bi bi-question-circle-fill" style="font-size:80px; color:mediumpurple;"></i>
		{:else if contentCategory === 'codigo'}
			<i class="bi bi-file-code-fill" style="font-size:80px; color:mediumpurple;"></i>
		{:else}
			<Skeleton class="h-20 w-20 rounded-full bg-gray-300" />
		{/if}
	</div>

	<div class="flex w-full flex-col gap-3 overflow-hidden">
		<div class="flex items-center gap-2">
			<h5 class="text-lg font-semibold">{content.name}</h5>
		</div>

		<p class="overflow-hidden text-ellipsis text-slate-700">{content.description}</p>

		<div class="flex items-center justify-start gap-3 text-zinc-500">
			<span class="flex items-center gap-1">
				<i class="bi bi-award"></i>
				<span>{content.reviews}</span>
			</span>

			<span class="flex items-center gap-1">
				<i class="bi bi-chat-left"></i>
				<span>{content.comments}</span>
			</span>

			<RateTooltip bind:rate={userRating} onRateChange={handleRateChange} onRateDelete={handleRateDelete}>
				<span class="flex items-center gap-1">
					<i class={`bi ${userRating ? 'bi-star-fill text-yellow-500' : 'bi-star'}`}></i>
					<span>{content.rating}</span>
				</span>
			</RateTooltip>
		</div>
	</div>
</div>

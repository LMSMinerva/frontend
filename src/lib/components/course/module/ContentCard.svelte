<script lang="ts">
	import type { Content, ContentInteraction } from '$types/content';
	import { CategoryStore } from '$lib/stores/category';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount } from 'svelte';
	import RateTooltip from '$lib/components/kit/RateTooltip.svelte';
	import { ContentStore } from '$lib/stores/content';
	import { storeAuth } from '$lib/stores/auth';
	import { CirclePlay, FileText, LoaderCircle, MessageCircleQuestion, Code } from 'lucide-svelte';

	type Props = {
		content: Content;
		active: boolean;
		handleSelectContent: (content: Content, content_type: string) => void;
	};

	const { content, handleSelectContent, active }: Props = $props();
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
		console.log('User: ', storeAuth.getUser()?.id);

		const interaction = interactions.find(
			(interaction) => interaction.user === storeAuth.getUser()?.id
		);
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
	class="flex gap-4 max-h-[300px] min-h-[100px] cursor-pointer rounded-lg border bg-white p-4 shadow-md transition-all duration-300"
	class:border-indigo-500={active}
	class:border-neutral-200={!active}
>
	<div class="flex gap-2">
		<div
			class="flex size-10 items-center justify-center rounded-full bg-indigo-50 transition-all duration-300"
			class:bg-indigo-500={active}
			class:text-white={active}
		>
			{#if contentCategory === 'video'}
				<CirclePlay />
			{:else if contentCategory === 'pdf'}
				<FileText />
			{:else if contentCategory === 'seleccion'}
				<MessageCircleQuestion />
			{:else if contentCategory === 'codigo'}
				<Code />
			{:else}
				<LoaderCircle class="animate-spin" />
			{/if}
		</div>
	</div>

	<div class="flex flex-col w-full gap-1">
		<h5 class="text-lg font-semibold">{content.name}</h5>

		<p class="overflow-hidden text-ellipsis text-muted-foreground">{content.description}</p>

		<div class="flex items-center justify-start gap-3 text-zinc-500 mt-4">
			<span class="flex items-center gap-1">
				<i class="bi bi-award"></i>
				<span>{content.reviews}</span>
			</span>

			<span class="flex items-center gap-1">
				<i class="bi bi-chat-left"></i>
				<span>{content.comments}</span>
			</span>

			<RateTooltip
				bind:rate={userRating}
				onRateChange={handleRateChange}
				onRateDelete={handleRateDelete}
			>
				<span class="flex items-center gap-1">
					<i class={`bi ${userRating ? 'bi-star-fill text-yellow-500' : 'bi-star'}`}></i>
					<span>{content?.rating || "..."} (30)</span>
				</span>
			</RateTooltip>
		</div>
	</div>
</div>

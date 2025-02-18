<script lang="ts">
	import type { Content } from '$types/content';
	import { CategoryStore } from '$lib/stores/category';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount } from 'svelte';

	type Props = {
		content: Content;
		handleSelectContent: (content: Content, content_type: string) => void;
	};
	const { content, handleSelectContent }: Props = $props();

	let contentCategory: string = $state('');
	let contentIcon: string = $state('');

	const contentIcons: Record<string, string> = {
		pdf: '/pdf.png',
		video: '/play.png',
		codigo: '/code.png',
		seleccion: '/qa.png'
	};

	async function fetchContentCategory() {
		try {
			const categoryStore = new CategoryStore();
			const category = await categoryStore.getContentCategory(content.content_type);
			contentCategory = category?.name || '';
			contentIcon = contentIcons[contentCategory];
		} catch (error) {
			console.error(error);
		}
	}

	onMount(fetchContentCategory);
</script>

<div
	role="button"
	tabindex="0"
	onclick={() => handleSelectContent(content, contentCategory)}
	onkeydown={() => handleSelectContent(content, contentCategory)}
	class="flex max-h-[300px] min-h-[100px] cursor-pointer flex-row items-center gap-4 rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:shadow-xl"
>
	<div class="flex h-[80px] w-[80px] items-center justify-center">
		{#if contentIcon}
			<img src={contentIcon} alt={contentCategory} />
		{:else}
			<Skeleton class="h-[80px] w-[80px] rounded-full bg-gray-200" />
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

			<span class="flex items-center gap-1">
				<i class="bi bi-star"></i>
				<span>{content.rating}</span>
			</span>
		</div>
	</div>
</div>

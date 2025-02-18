<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from '$lib/components/ui/card';
	import { CategoryStore } from '$lib/stores/category';
	import type { Content } from '$lib/types/content';

	type Props = {
		selectedContent: Content;
	};
	const { selectedContent }: Props = $props();

	let contentCategory: string = $state('');

	async function fetchContentCategory() {
		try {
			const categoryStore = new CategoryStore();
			const category = await categoryStore.getContentCategory(selectedContent.content_type);
			contentCategory = category?.name || '';
		} catch (error) {
			console.error(error);
		}
	}

	onMount(fetchContentCategory);
</script>

<Card class="h-full p-4">
	{#if contentCategory === 'pdf'}
		<iframe
			title={selectedContent.name}
			src={selectedContent.body}
			class="h-[500px] w-full rounded-lg border"
		></iframe>
	{:else if contentCategory === 'video'}
		<iframe
			class="h-[500px] w-full rounded-lg"
			src={selectedContent.body}
			title={selectedContent.name}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	{:else}
		<p class="text-center text-slate-700">Cargando contenido...</p>
	{/if}
</Card>

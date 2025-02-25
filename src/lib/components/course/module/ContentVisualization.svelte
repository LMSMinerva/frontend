<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from '$lib/components/ui/card';
	import { CategoryStore } from '$lib/stores/category';
	import type { Content } from '$lib/types/content';

	type Props = {
		selectedContent: Content;
		contentCategory: string;
	};
	const { selectedContent, contentCategory }: Props = $props();

	// let contentCategory: string = $state('');

	/*async function fetchContentCategory() {
		try {
			const categoryStore = new CategoryStore();
			const category = await categoryStore.getContentCategory(selectedContent.content_type);
			contentCategory = category?.name || '';
		} catch (error) {
			console.error(error);
		}
	}

	onMount(fetchContentCategory); */
</script>

<Card class="h-full p-4">
    {#if (contentCategory === 'pdf' || contentCategory === 'video') && selectedContent.body}
        <iframe
            title={selectedContent.name}
            src={selectedContent.body}
            class="h-[500px] w-full rounded-lg {contentCategory === 'pdf' ? 'border' : ''}"
            frameborder={contentCategory === 'video' ? '0' : undefined}
            allow={contentCategory === 'video' ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' : undefined}
            referrerpolicy={contentCategory === 'video' ? 'strict-origin-when-cross-origin' : undefined}
            allowfullscreen={contentCategory === 'video' ? true : undefined}
        ></iframe>
    {:else}
        <p class="text-center text-slate-700">Cargando contenido...</p>
    {/if}
</Card>

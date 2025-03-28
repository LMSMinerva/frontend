<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import ContentCard from '$lib/components/course/module/ContentCard.svelte';
	import ContentVisualization from '$lib/components/course/module/ContentVisualization.svelte';
	import type { PageData } from './$types';
	import type { CourseModule } from '$lib/types/module';
	import type { Content } from '$lib/types/content';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import CommentsComponent from '$lib/components/kit/comments/Comments.svelte';
	import type { Comment } from '$lib/types/comment';
	import { CommentStore } from '$lib/stores/comments';
	import { CategoryStore } from '$lib/stores/category';
	import QuestionVisualization from '$lib/components/course/module/QuestionVisualization.svelte';

	let { data }: { data: PageData } = $props();

	const instructionalItemsCompleted = 80;
	const assessmentItemsCompleted = 20;

	let modulo: CourseModule | null = $state(null);
	let contents: Promise<Content[]> = $derived(data.contents);
	let selectedContent: Content | null = $state(null);
	let contentComments: Comment[] = $state([]);
	let loadingComments = $state(false);

	let contentCategory: string = $state('');

	const storeComments = new CommentStore();
	const categoryStore = new CategoryStore();
	async function selectContent(content: Content) {
		selectedContent = content;
		loadingComments = true;
		contentComments = await storeComments.fetchComments(content.id);
		loadingComments = false;

		contentCategory = "";
		const category = await categoryStore.getContentCategory(content.content_type);
		contentCategory = category?.name || '';
	}

	$effect(() => {
		modulo = null;
		selectedContent = null
		contentComments = [];
		loadingComments = false;

		data.module.then((m) => {
			modulo = m;
		});
	});
</script>

<div class="space-y-4">
	<h1 class="text-xl font-bold">
		{#if modulo}
			Módulo {modulo.order}: {modulo.name}
		{:else}
			<span class="flex items-center gap-2">
				<span>Módulo</span>
				<Skeleton class="h-4 w-[200px] bg-gray-200" />
			</span>
		{/if}
	</h1>
	<p class="text-slate-700">
		{#if modulo}
			{modulo.description}
		{:else}
			<Skeleton class="h-4 w-[300px] bg-gray-200" />
		{/if}
	</p>

	<hr />

	<div class="space-y-4 text-slate-700">
		<p>
			Materiales de estudio completados: {instructionalItemsCompleted}%
		</p>
		<p>
			Actividades evaluativas completados: {assessmentItemsCompleted}%
		</p>
	</div>

	<hr />

	<div class="space-y-4">
		<h2 class="text-lg font-semibold">Contenidos del módulo</h2>
		<div class="grid grid-cols-12 gap-4">
			<div class="col-span-5 flex flex-col gap-4">
				{#await contents}
					<Skeleton class="h-full w-full bg-gray-200" />
				{:then contents}
					{#each contents || [] as content}
						<ContentCard
							active={selectedContent?.id === content.id}
							{content}
							handleSelectContent={selectContent}
						/>
					{/each}
				{/await}
			</div>
			<div class="col-span-7 flex flex-col gap-4">
				{#if selectedContent}
					{#if contentCategory === 'seleccion'}
						<QuestionVisualization {selectedContent} {contentCategory} />
					{:else}
						<ContentVisualization {selectedContent} />
					{/if}
					<CommentsComponent
						comments={contentComments}
						content={selectedContent}
						isLoading={loadingComments}
					/>
				{:else}
					<Card class="h-full p-4 text-center text-gray-500"
						>Selecciona un contenido para ver más detalles.</Card
					>
				{/if}
			</div>
		</div>
	</div>
</div>

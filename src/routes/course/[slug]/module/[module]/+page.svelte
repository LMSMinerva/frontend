<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import ContentCard from '$lib/components/course/module/ContentCard.svelte';
	import type { PageData } from './$types';
	import type { CourseModule } from '$lib/types/module';
	import type { Content } from '$lib/types/content';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	let { data }: { data: PageData } = $props();

	const instructionalItemsCompleted = 80;
	const assessmentItemsCompleted = 20;

	let modulo: CourseModule | null = $state(null);
	const contents: Promise<Content[]> = $state(data.contents);

	data.module.then((moduleData) => {
		modulo = moduleData;
	});
</script>

<div class="space-y-4">
	<h1 class="text-xl font-bold">
		{#if modulo}
			Módulo {modulo.order}: {modulo.name}
		{:else}
			<span class="flex gap-2 items-center">
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
						<ContentCard {content} />
					{/each}
				{/await}
			</div>
			<div class="col-span-7 flex flex-col gap-4">
				<Card class="h-full">
					<div class="m-4">
						<p class="text-center text-slate-700">Próximamente: apertura de contenido</p>
					</div></Card
				>
			</div>
		</div>
	</div>
</div>

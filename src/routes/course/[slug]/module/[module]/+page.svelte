<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import ContentCard from '$lib/components/course/module/ContentCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const instructionalItemsCompleted = 80;
	const assessmentItemsCompleted = 20;
</script>

<div class="space-y-4">
	{#await Promise.all([data.module, data.contents])}
		<p class="text-xl font-semibold">Cargando módulo...</p>
	{:then [module, contents]}
		{#if module}
			<h1 class="text-xl font-bold">Módulo {module.order}: {module.name}</h1>
			<p class="text-slate-700">
				{module.description}
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
						{#each contents as content}
							<ContentCard {content} />
						{/each}
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
		{:else}
			<div class="flex w-full flex-col items-center justify-start">
				<p class="text-xl font-semibold text-purple-500">404</p>
				<p class="text-xl font-semibold">Este módulo no existe</p>
			</div>
		{/if}
	{:catch _}
		<p class="text-xl font-semibold">
			Ocurrió un error al cargar el curso, por favor intenta de nuevo más tarde
		</p>
	{/await}
</div>

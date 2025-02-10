<script lang="ts">
    import Card from '$lib/components/ui/card/card.svelte';
    import ContentCard from '$lib/components/course/module/ContentCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const instructionalItemsCompleted = 80;
	const assessmentItemsCompleted = 20;
</script>

<div class="space-y-4">
	<h1 class="text-xl font-bold">Módulo {data.module.order}: {data.module.name}</h1>
	<p class="text-slate-700">
		{data.module.description}
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
            <div class="flex flex-col gap-4 col-span-5">
                {#each data.contents as content}
                    <ContentCard {content} />
                {/each}
            </div>
            <div class="flex flex-col gap-4 col-span-7">
                <Card class="h-full">
                    <div class="m-4">
                        <p class="text-slate-700 text-center">
                            Próximamente: apertura de módulo
                        </p>
                </Card>
            </div>
        </div>
		
	</div>
</div>

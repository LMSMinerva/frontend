<script lang="ts">
	import { ModuleStore } from '$lib/stores/module';
	import type { Course } from '$lib/types/course';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	let { data, children }: Props = $props();

	import CourseSidebar from '$lib/components/course/sidebar/CourseSidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

<div class="flex w-full">
	<Sidebar.Provider>
		{#await data.course}
			<div class="flex w-full items-start justify-center">
				<p class="text-xl font-semibold">Buscando curso...</p>
			</div>
		{:then course}
			{#if course}
				{#await new ModuleStore().getModulesByCourseId(course.id)}
					<div class="flex w-full items-start justify-center">
						<p class="text-xl font-semibold">Cargando módulos...</p>
					</div>
				{:then modules}
					<CourseSidebar data={{ ...data, course, modules }} />
					<main class="w-full space-y-4 px-12">
						<Sidebar.Trigger />
						<div>
							{@render children()}
						</div>
					</main>
				{/await}
			{:else}
				<div class="flex w-full flex-col items-center justify-start">
					<p class="text-xl font-semibold text-purple-500">404</p>
					<p class="text-xl font-semibold">Este curso no existe</p>
				</div>
			{/if}
		{:catch _}
			<div class="flex w-full items-start justify-center">
				<p class="text-xl font-semibold">
					Ocurrió un error al cargar el curso, por favor intenta de nuevo más tarde
				</p>
			</div>
		{/await}
	</Sidebar.Provider>
</div>

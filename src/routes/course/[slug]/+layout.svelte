<script lang="ts">
	import type { Course } from '$lib/types/course';
	import type { LayoutData } from './$types';
	import { onMount, type Snippet } from 'svelte';
	import type { CourseModule } from '$lib/types/module';
	import { ModuleStore } from '$lib/stores/module';

	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	let { data, children }: Props = $props();

	let course: Course = $state(data.course as Course);
	let modules: CourseModule[] = $state([]);

	onMount(async () => {
		const moduleStore = new ModuleStore();
		modules = await moduleStore.getModulesByCourseId((data.course as Course).id);
	});

	import CourseSidebar from '$lib/components/course/sidebar/CourseSidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

<div class="flex w-full">
	<Sidebar.Provider>
		{#if course}
			<CourseSidebar data={{ ...data }} {course} {modules} />
			<main class="w-full space-y-4 px-12">
				<Sidebar.Trigger />
				<div>
					{@render children()}
				</div>
			</main>
		{:else}
			<div class="flex w-full flex-col items-center justify-start">
				<p class="text-xl font-semibold text-purple-500">404</p>
				<p class="text-xl font-semibold">Este curso no existe</p>
			</div>
		{/if}
	</Sidebar.Provider>
</div>

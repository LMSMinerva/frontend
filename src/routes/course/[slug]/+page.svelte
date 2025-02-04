<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import CourseSidebar from '$lib/components/course/sidebar/CourseSidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Home from '$lib/components/course/Home.svelte';
</script>

<div class="flex h-full w-full">
	<Sidebar.Provider>
		<CourseSidebar collapsible="none" />
		<main class="px-12 space-y-4">
			<Sidebar.Trigger />
			<div>
				<Home />
			</div>
		</main>
	</Sidebar.Provider>
</div>

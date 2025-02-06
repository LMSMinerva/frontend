<script lang="ts">
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

<div class="flex h-full w-full">
	<Sidebar.Provider>
		<CourseSidebar />
		<main class="space-y-4 px-12">
			<Sidebar.Trigger />
			<div>
				{@render children()}
			</div>
		</main>
	</Sidebar.Provider>
</div>
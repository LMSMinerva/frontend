<script lang="ts">
	import type { UserCourse } from '$types/course';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import CourseCard from '$components/dashboard/CourseCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';

	type Props = {
		title: string;
		userCourses: UserCourse[];
	};

	const { title, userCourses }: Props = $props();
	let visibleCourses: UserCourse[] = $state(userCourses.slice(0, 3));
	let showAll = $state(false);

	function toggleShowAll() {
		showAll = !showAll;
		visibleCourses = showAll ? userCourses : userCourses.slice(0, 3);
	}
</script>

<Collapsible.Root open={true}>
	<Collapsible.Trigger
		class="flex w-full items-center justify-between rounded-md px-4 py-1 hover:bg-indigo-100"
	>
		<h3 class="text-xl font-bold">{title}</h3>
		<Button variant="ghost">
			<i class="bi bi-chevron-down"></i>
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="mb-12 mt-8">
		<div class="grid grid-cols-3 gap-8">
			{#each visibleCourses as course}
				<CourseCard userCourse={course} />
			{/each}
		</div>

		{#if userCourses.length > 3}
			<div class="mt-8 flex justify-center">
				<Button onclick={toggleShowAll}>
					{showAll ? 'Mostrar menos' : 'Mostrar más'}
				</Button>
			</div>
		{/if}
	</Collapsible.Content>
</Collapsible.Root>

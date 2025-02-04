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
	let orderedCourses = [...userCourses];
	let visibleCourses: UserCourse[] = $state(orderedCourses.slice(0, 3));
	let showAll = $state(false);
    let ascending = $state(true);
    
    function toggleShowAll() {
        showAll = !showAll;
        visibleCourses = showAll ? orderedCourses : orderedCourses.slice(0, 3);
    }

    function sortCourses() {
        orderedCourses = [...orderedCourses].sort((a, b) => {
            return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
        visibleCourses = showAll ? orderedCourses : orderedCourses.slice(0, 3);
        ascending = !ascending;
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

		<Button class="rounded-full bg-white shadow-sm text-zinc-500 font-semibold hover:bg-indigo-100 hover:shadow-md mb-3" onclick={sortCourses}>
			<span class="flex items-center gap-2">
				Nombre
				<i class={ascending ? 'bi bi-arrow-down' : 'bi bi-arrow-up'}></i>
			</span>
		</Button>

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

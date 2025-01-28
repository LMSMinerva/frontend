<script lang="ts">
	import type { UserCourse } from '$types/course';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import CourseCard from '$components/dashboard/CourseCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		title: string;
		userCourses: UserCourse[];
	};

	const { title, userCourses }: Props = $props();
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
			{#each userCourses as course}
				<CourseCard userCourse={course} />
			{/each}
		</div>
	</Collapsible.Content>
</Collapsible.Root>

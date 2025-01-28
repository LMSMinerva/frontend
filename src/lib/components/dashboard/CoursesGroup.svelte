<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import CourseCard from '$components/dashboard/CourseCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	type UserCourse = {
		name: string;
		image: string;
		institution: string;
		institutionImage?: string;
		progress: number;
		finished: boolean;
	};

	type Props = {
		title: string;
		courses: UserCourse[];
		
	};

	const { title, courses }: Props = $props();
</script>

<Collapsible.Root>
	<Collapsible.Trigger
		class="flex w-full items-center justify-between rounded-md px-4 py-1 hover:bg-indigo-100"
	>
		<h3 class="text-xl font-bold">{title}</h3>
		<Button>
			<i class="bi bi-chevron-down"></i>
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="mt-8 mb-12">
		<div class="grid grid-cols-3 gap-8">
			{#each courses as course}
				<CourseCard {...course} />
			{/each}
		</div>
	</Collapsible.Content>
</Collapsible.Root>

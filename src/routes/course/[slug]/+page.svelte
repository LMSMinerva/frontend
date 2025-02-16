<script lang="ts">
	import type { PageData } from './$types';
	import { CourseStore } from '$lib/stores/course';
	import type { Course } from '$lib/types/course';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const course = $state(data.course);
	let institution: Promise<Institution> = $state(data.institution);

	import Home from '$lib/components/course/Home.svelte';
	import type { Institution } from '$lib/types/institution';
</script>

<Home course={course as Course} {institution} />

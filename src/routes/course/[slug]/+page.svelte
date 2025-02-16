<script lang="ts">
	import type { PageData } from './$types';
	import { CourseStore } from '$lib/stores/course';
	import type { Course } from '$lib/types/course';
	import { InstitutionStore } from '$lib/stores/institution';
	const institutionStore = new InstitutionStore();

	

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const course = $state(data.course);
	let institution: Institution | null = $state(null);

	onMount(async () => {
		institution = await institutionStore.getInstitution((data.course as Course).institution);
	});

	import Home from '$lib/components/course/Home.svelte';
	import type { Institution } from '$lib/types/institution';
	import { onMount } from 'svelte';
</script>

<Home course={course as Course} {institution} />

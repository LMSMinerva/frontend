<script lang="ts">
	import type { PageData } from './$types';
	import { CourseStore } from '$lib/stores/course';
	import { InstitutionStore } from '$lib/stores/institution';
	import type { Course } from '$lib/types/course';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const course = $state(data.course);
	let institution: Institution | null = $state(null);
	
	const institutionStore = new InstitutionStore();
	institutionStore.getInstitution(course?.institution as string).then((res) => {
		institution = res;
	});

	import Home from '$lib/components/course/Home.svelte';
	import type { Institution } from '$lib/types/institution';
</script>
	
<Home course={course as Course} institution={institution} />
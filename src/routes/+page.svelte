<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import CoursesGroup from '$lib/components/dashboard/CoursesGroup.svelte';
	import type { UserCourse } from '$types/course';
	import type { Institution } from '$types/institution';
	import { getUserCourses } from '$lib/utils/mock';

	const { inProgress, completed, availiable } = getUserCourses();
</script>

<main class="flex flex-col gap-8 px-12">
	<h2>Bienvenida, Maria</h2>

	<div class="grid grid-cols-12 gap-x-12">
		<div class="col-span-8 flex flex-col gap-2">
			<CoursesGroup title="En progreso" userCourses={inProgress} />
			<CoursesGroup title="Completados" userCourses={completed} />
			<CoursesGroup title="Disponibles" userCourses={availiable} />
		</div>

		<aside class="col-span-4 flex flex-col gap-8">
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
		</aside>
	</div>
</main>

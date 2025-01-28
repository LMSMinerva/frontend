<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import CoursesGroup from '$lib/components/dashboard/CoursesGroup.svelte';
	import type { UserCourse } from '$types/course';
	import type { Institution } from '$types/institution';
	import { getUserCourses } from '$lib/utils/mock';

	const { inProgress, completed, availiable } = getUserCourses();
	const { user } = data;
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

	const pendindActivities = [
		{
			curso: 'Fundamentos de programación',
			actividad: 'Quiz 2: Ciclos for y while'
		},
		{
			curso: 'Fundamentos de programación',
			actividad: 'Quiz 2: Ciclos for y while'
		},
		{
			curso: 'Fundamentos de programación',
			actividad: 'Quiz 2: Ciclos for y while'
		}
	];
</script>

<svelte:head>
	<title>Mis cursos</title>
</svelte:head>

<main class="flex flex-col gap-8 px-12">
	<h2 class="text-2xl font-semibold">Bienvenid@, {user.fullname}</h2>

	<div class="grid grid-cols-12 gap-x-12">
		<div class="col-span-8 flex flex-col gap-2">
			<CoursesGroup title="En progreso" userCourses={inProgress} />
			<CoursesGroup title="Completados" userCourses={completed} />
			<CoursesGroup title="Disponibles" userCourses={availiable} />
		</div>

		<aside class="col-span-4 flex flex-col gap-8">
			<div class="flex flex-col gap-4 rounded-lg bg-white px-8 py-8">
				<h3 class="text-xl font-semibold">Actividades Pendientes</h3>

				{#each pendindActivities as pendingActivity}
					<div class="flex items-top gap-2 rounded-md border-2 border-gray-200 p-4 py-4">
						<Checkbox class="rounded-full" />
						<div>
							<p class="text-sm font-semibold">{pendingActivity.curso}</p>
							<p class="text-xs text-gray-500">{pendingActivity.actividad}</p>
						</div>
					</div>
				{/each}
			</div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
		</aside>
	</div>
</main>

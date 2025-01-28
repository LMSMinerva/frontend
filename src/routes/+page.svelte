<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import CourseCard from '$components/dashboard/CourseCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	import CoursesGroup from '$lib/components/dashboard/CoursesGroup.svelte';

	type UserCourse = {
		name: string;
		image: string;
		institution: string;
		institutionImage?: string;
		progress: number;
		finished: boolean;
	};

	const userCourses1: UserCourse[] = [
		{
			name: 'Fundamentos de programacion',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 80,
			finished: false
		},
		{
			name: 'Algoritmos y Estructuras de Datos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 60,
			finished: false
		},
		{
			name: 'Bases de Datos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 45,
			finished: false
		},
		{
			name: 'Ingeniería de Software',
			image: '',
			institutionImage: 'https://github.com/shadcn.png',
			institution: 'Universidad Nacional de Colombia',
			progress: 30,
			finished: false
		},
		{
			name: 'Redes de Computadores',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 90,
			finished: false
		},
		{
			name: 'Sistemas Operativos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 70,
			finished: false
		}
	];

	const userCourses2: UserCourse[] = [
		{
			name: 'Fundamentos de programacion',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 80,
			finished: true
		},
		{
			name: 'Algoritmos y Estructuras de Datos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 60,
			finished: true
		},
		{
			name: 'Bases de Datos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 45,
			finished: true
		}
	];

	const userCourses3: UserCourse[] = [
		{
			name: 'Fundamentos de programacion',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 80,
			finished: false
		},
		{
			name: 'Algoritmos y Estructuras de Datos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 60,
			finished: false
		},
		{
			name: 'Bases de Datos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 45,
			finished: false
		},
		{
			name: 'Ingeniería de Software',
			image: '',
			institutionImage: 'https://github.com/shadcn.png',
			institution: 'Universidad Nacional de Colombia',
			progress: 30,
			finished: false
		},
		{
			name: 'Redes de Computadores',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 90,
			finished: false
		},
		{
			name: 'Sistemas Operativos',
			image: '',
			institution: 'Universidad Nacional de Colombia',
			progress: 70,
			finished: false
		}
	];
</script>

<main class="flex flex-col gap-8 px-12">
	<h2>Bienvenida, Maria</h2>

	<div class="grid grid-cols-12 gap-x-12">
		<div class="col-span-8 flex flex-col gap-2">
			<CoursesGroup title="En progreso" courses={userCourses1} />
			<CoursesGroup title="Completados" courses={userCourses2} />
			<CoursesGroup title="Disponibles" courses={userCourses3} />
		</div>

		<aside class="col-span-4 flex flex-col gap-8">
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
		</aside>
	</div>
</main>

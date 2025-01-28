<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
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

	const userCourses: UserCourse[] = [
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
			finished: true
		}
	];
</script>

<main class="flex flex-col gap-8 px-12">
	<h2>Bienvenida, Maria</h2>

	<div class="grid grid-cols-12 gap-x-12">
		<div class="col-span-8">
			<Collapsible.Root>
				<Collapsible.Trigger
					class="flex w-full items-center justify-between rounded-md px-4 py-1 hover:bg-indigo-100"
				>
					<h3 class="text-xl font-bold">En progreso</h3>
					<Button>
						<i class="bi bi-chevron-down"></i>
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Content class="mt-8">
					<div class="grid grid-cols-3 gap-8">
						{#each userCourses as course}
							<CourseCard {...course} />
						{/each}
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>

		<aside class="col-span-4 flex flex-col gap-8">
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
			<div class="rounded-lg bg-white px-12 py-24"></div>
		</aside>
	</div>
</main>

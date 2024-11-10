<script lang="ts">
	import type { Curso } from '$lib/types';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
	const courses: Array<Curso> = data.courses;

	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
</script>

<main class="space-y-4 px-6">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">Cursos</h2>
		<Button>
			<span>Nuevo Curso</span>
			<i class="bi bi-plus-lg"></i>
		</Button>
	</div>
	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Nombre</Table.Head>
					<Table.Head>Nombre Corto</Table.Head>
					<Table.Head>Categoría</Table.Head>
					<Table.Head>Visibilidad</Table.Head>
					<Table.Head>Fecha de Inicio</Table.Head>
					<Table.Head>Fecha de Fin</Table.Head>
					<Table.Head>Acciones</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each courses as course (course.id)}
					<Table.Row>
						<Table.Cell>{course.name}</Table.Cell>
						<Table.Cell>{course.shortName}</Table.Cell>
						<Table.Cell>{course.category}</Table.Cell>
						<Table.Cell>{course.visibility}</Table.Cell>
						<Table.Cell>{course.startDate}</Table.Cell>
						<Table.Cell>{course.endDate}</Table.Cell>
						<Table.Cell>
							<div class="flex gap-x-4">
								<Button variant="ghost">
									<i class="bi bi-pencil-square text-base"></i>
								</Button>
								<Button variant="destructive">
									<i class="bi bi-trash text-base"></i>
								</Button>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</main>

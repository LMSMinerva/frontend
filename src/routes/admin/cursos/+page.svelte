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
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<main class="space-y-4 px-6">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">Cursos</h2>
		<Button href="/admin/cursos/curso">
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
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Button variant="ghost" class="h-8 w-8 p-0">
										<i class="bi bi-three-dots"></i>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Item>
										<i class="bi bi-pencil-square text-base"></i>
										<span>Editar</span>
									</DropdownMenu.Item>
									<DropdownMenu.Item class="bg-destructive/80 text-white hover:bg-destructive">
										<i class="bi bi-trash text-base"></i>
										<span>Eliminar</span>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</main>

<script lang="ts">
	import type { Course } from '$types/course';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
	const courses: Array<Course> = data.courses;

	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
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
					<Table.Head>Descripción</Table.Head>
					<Table.Head>Categoría</Table.Head>
					<Table.Head>Visibilidad</Table.Head>
					<Table.Head>Fecha de creacion</Table.Head>
					<Table.Head>Acciones</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each courses as course (course.id)}
					<Table.Row>
						<Table.Cell>{course.name}</Table.Cell>
						<Table.Cell>{course.alias}</Table.Cell>
						<Table.Cell>{course.description}</Table.Cell>
						<Table.Cell>{course.category}</Table.Cell>
						<Table.Cell>{course.visibility}</Table.Cell>
						<Table.Cell>{course.creation_date}</Table.Cell>
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
										<Dialog.Root>
											<Dialog.Trigger>
												<i class="bi bi-trash text-base"></i>
												<span>Eliminar</span>
											</Dialog.Trigger>
											<Dialog.Content>
												<Dialog.Header>
													<Dialog.Title>Eliminar curso</Dialog.Title>
													<Dialog.Description>
														Esta acción no se puede deshacer. Esto eliminará permanentemente el
														curso y removerá todos sus datos.
													</Dialog.Description>
												</Dialog.Header>
												<div>
													<p>
														¿Estás seguro de que deseas eliminar el curso: <strong
															>{course.alias}</strong
														>?
													</p>
												</div>
												<Dialog.Footer>
													<Button type="submit" variant="secondary">Cancelar</Button>
													<Button type="submit" variant="destructive">Eliminar</Button>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Root>
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

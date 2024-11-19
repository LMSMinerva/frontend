<script lang="ts">
	import type { PageData } from './$types';
	import type { Curso } from '$lib/types';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();

	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import * as Card from '$lib/components/ui/card';
	import * as Popover from '$lib/components/ui/popover';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	const curso: Curso = $state({
		id: 0,
		name: '',
		alias: '',
		category: '',
		visibility: true,
		description: '',
		format: '',
		id_instructor: '',
		total_students_enrolled: 0,
		creation_date: ''
	});

	import { goto } from '$app/navigation';
	import { getCurrentLocaleDate } from '$lib/utils/tools';
	import { toast } from 'svelte-sonner';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		curso.creation_date = getCurrentLocaleDate();

		try {
			const response = await fetch(`${PUBLIC_API_BASE_URL}/courses/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(curso)
			});

			if (response.ok) {
				const result: Curso = await response.json();
				toast.success(`Curso guardado exitosamente. ID: ${result.id}, Nombre: ${result.alias}`);
				await goto('/admin/cursos');
			} else {
				const error = await response.json();
				toast.error(`Error: ${error.message}`);
			}
		} catch (error) {
			toast.error(`Error: ${(error as Error).message}`);
		}
	}
</script>

<main class="space-y-6 px-36">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">Nuevo Curso</h2>
		<Button variant="link" href="/admin/cursos">
			<i class="bi bi-arrow-left"></i>
			<span>Volver a la lista de cursos</span>
		</Button>
	</div>

	<section>
		<form onsubmit={handleSubmit} class="space-y-8">
			<Card.Root>
				<Card.Header>
					<Card.Title>Información General</Card.Title>
					<Card.Description>Ingrese la información básica del curso</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div class="space-y-2">
							<Label for="name">Nombre completo</Label>
							<Input id="name" name="name" bind:value={curso.name} />
						</div>
						<div class="space-y-2">
							<Label for="alias">Nombre corto</Label>
							<Input id="alias" name="alias" bind:value={curso.alias} />
						</div>
					</div>
					<div class="space-y-2">
						<Label for="category">Categoría</Label>
						<Select.Root type="single" bind:value={curso.category}>
							<Select.Trigger>
								{curso.category || 'Seleccione una categoría'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Tecnología">Tecnología</Select.Item>
								<Select.Item value="Negocios">Negocios</Select.Item>
								<Select.Item value="Diseño">Diseño</Select.Item>
								<Select.Item value="Marketing">Marketing</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Detalles del Curso</Card.Title>
					<Card.Description>Configure los detalles específicos del curso</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="space-y-2">
						<Label for="visibility">Visibilidad</Label>
						<Select.Root type="single" bind:value={curso.visibility}>
							<Select.Trigger>
								{curso.visibility ? 'Público' : 'Privado'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value={true}>Público</Select.Item>
								<Select.Item value={false}>Privado</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-2">
						<Label for="description">Descripción</Label>
						<Textarea id="description" name="description" bind:value={curso.description} />
					</div>
					<div class="space-y-2">
						<Label for="format">Formato/Tipo de curso</Label>
						<Select.Root type="single" bind:value={curso.format}>
							<Select.Trigger>
								{curso.format || 'Seleccione el formato del curso'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="En línea">En línea</Select.Item>
								<Select.Item value="Semipresencial">Semipresencial</Select.Item>
								<Select.Item value="Presencial">Presencial</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
				</Card.Content>
			</Card.Root>

			<div class="flex justify-end">
				<Button type="submit">Guardar Curso</Button>
			</div>
		</form>
	</section>
</main>

<Toaster />

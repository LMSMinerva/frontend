<script lang="ts">
	import type { PageData } from './$types';
	import type { Curso } from '$lib/types';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();

	function handleSubmit() {}

	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import * as Card from '$lib/components/ui/card';
	import * as Popover from '$lib/components/ui/popover';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	const curso: Curso = $state({
		id: 123,
		name: '',
		shortName: '',
		category: '',
		visibility: '',
		startDate: '',
		endDate: ''
	});

	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	const df = new DateFormatter('en-US', { dateStyle: 'long' });
</script>

<main class="space-y-6 px-6">
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
							<Input id="name" name="name" value={curso.name} />
						</div>
						<div class="space-y-2">
							<Label for="shortName">Nombre corto</Label>
							<Input id="shortName" name="shortName" value={curso.shortName} />
						</div>
					</div>
					<div class="space-y-2">
						<Label for="category">Categoría</Label>
						<Select.Root type="single">
							<Select.Trigger>
								{'Seleccione una categoría'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="technology">Tecnología</Select.Item>
								<Select.Item value="business">Negocios</Select.Item>
								<Select.Item value="design">Diseño</Select.Item>
								<Select.Item value="marketing">Marketing</Select.Item>
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
						<Select.Root type="single">
							<Select.Trigger>
								{'Seleccione la visibilidad'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="public">Público</Select.Item>
								<Select.Item value="private">Privado</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-2">
						<Label for="description">Descripción</Label>
						<Textarea id="description" name="description" />
					</div>
					<div class="space-y-2">
						<Label for="format">Formato/Tipo de curso</Label>
						<Select.Root type="single">
							<Select.Trigger>
								{'Seleccione el formato del curso'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="online">En línea</Select.Item>
								<Select.Item value="blended">Semipresencial</Select.Item>
								<Select.Item value="face-to-face">Presencial</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Programación</Card.Title>
					<Card.Description>Establezca las fechas de inicio y fin del curso</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div class="flex flex-col space-y-2">
							<Label for="startDate">Fecha de inicio</Label>
							<Popover.Root>
								<Popover.Trigger>
									<Button
										variant={'outline'}
										class={`w-full justify-start text-left font-normal ${
											!curso.startDate && 'text-muted-foreground'
										}`}
									>
										<i class="bi bi-calendar-event"></i>
										<span>
											{curso.startDate
												? df.format(curso.startDate as unknown as Date)
												: 'Seleccione una fecha'}
										</span>
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0">
									<Calendar type="single" />
								</Popover.Content>
							</Popover.Root>
						</div>
						<div class="flex flex-col space-y-2">
							<Label class="block" for="endDate">Fecha de fin</Label>
							<Popover.Root>
								<Popover.Trigger>
									<Button
										variant={'outline'}
										class={`w-full justify-start text-left font-normal ${
											!curso.endDate && 'text-muted-foreground'
										}`}
									>
										<i class="bi bi-calendar-event"></i>
										<span>
											{curso.endDate
												? df.format(curso.endDate as unknown as Date)
												: 'Seleccione una fecha'}
										</span>
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0">
									<Calendar type="single" />
								</Popover.Content>
							</Popover.Root>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<div class="flex justify-end">
				<Button type="submit">Guardar Curso</Button>
			</div>
		</form>
	</section>
</main>

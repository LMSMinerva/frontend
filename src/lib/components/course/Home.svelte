<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { Course } from '$lib/types/course';
	import type { Institution } from '$lib/types/institution';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	type Props = {
		course: Course;
		institution: Promise<Institution> | null;
	};

	const { course, institution }: Props = $props();

	const instructores = [
		{
			nombre: 'Julian Moreno',
			avatar: 'https://github.com/shadcn.png'
		},
		{
			nombre: 'Juan Claro',
			avatar: 'https://github.com/shadcn.png'
		}
	];
	const getInitials = (name: string) => {
		const words = name.split(' ');
		if (words.length === 1) {
			return words[0][0].toUpperCase();
		}
		return words
			.slice(0, 2)
			.map((w) => w[0].toUpperCase())
			.join('');
	};

	const numberReviews = 5200;
	const progress = 80;
</script>

<div class="space-y-8">
	<div class="flex items-center gap-4">
		{#await institution}
			<Skeleton class="h-10 w-[250px] rounded-full bg-gray-200" />
		{:then institution}
			<Avatar.Root class="h-10 w-10">
				<Avatar.Image src={institution?.icon} alt={institution?.name} />
				<Avatar.Fallback>{getInitials(institution?.name || 'NN')}</Avatar.Fallback>
			</Avatar.Root>
			<h3 class="text-xl font-bold">{institution?.name}</h3>
		{:catch error}
			<p>Something went wrong: {error.message}</p>
		{/await}
	</div>

	<div class="grid grid-cols-12 gap-x-12">
		<div class="col-span-8 space-y-6">
			<h2 class="text-lg font-semibold">Instructores</h2>
			<div class="flex flex-col gap-3">
				{#each instructores as instructor}
					<div class="flex items-center gap-4">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src={instructor.avatar} alt={instructor.nombre} />
							<Avatar.Fallback>{getInitials(instructor.nombre)}</Avatar.Fallback>
						</Avatar.Root>
						<h3 class="text-slate-700">{instructor.nombre}</h3>
					</div>
				{/each}
			</div>

			<div class="aspect-w-16 aspect-h-9 h-64 w-full rounded-md bg-indigo-100"></div>

			<hr />

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Acerca de este curso</h2>
				<p class="text-slate-700">{course.description}</p>
			</div>

			<div class="flex items-center gap-10 text-zinc-500">
				{#if course.rating}
					<span class="flex items-center gap-1">
						<i class="bi bi-award"></i>
						<span>{course.rating}</span>
					</span>
				{/if}

				<span class="flex items-center gap-1">
					<i class="bi bi-chat-left"></i>
					<span>{course.comments}</span>
				</span>

				<span class="flex items-center gap-1">
					<i class="bi bi-star"></i>
					<span>{course.reviews}</span>
				</span>
			</div>

			<hr />

			<div class="space-y-2">
				<p class="text-slate-700">Este curso ha sido calificado por {numberReviews} personas</p>
				<span class="flex items-center gap-1 text-zinc-500">
					<i class="bi bi-star"></i>
					<i class="bi bi-star"></i>
					<i class="bi bi-star"></i>
					<i class="bi bi-star"></i>
					<i class="bi bi-star"></i>
					<span class="ml-2 text-sm">Califica este curso</span>
				</span>
			</div>
		</div>

		<div class="col-span-4 space-y-4">
			<span class="text-slate-700">Tu progreso en el curso es de {progress}%</span>

			<h2 class="text-lg font-semibold">Comentarios</h2>
			<div class="space-y-4 text-slate-700">
				<div class="space-y-2 rounded border p-4">
					<div class="space-x-2">Carolina</div>
					<p>20/01/2025</p>
					<p>Lorem ispum dolor sil amet.</p>
				</div>
				<div class="space-y-2 rounded border p-4">
					<div class="space-x-2">Carolina</div>
					<p>20/01/2025</p>
					<p>Lorem ispum dolor sil amet.</p>
				</div>
				<div class="space-y-2 rounded border p-4">
					<div class="space-x-2">Carolina</div>
					<p>20/01/2025</p>
					<p>Lorem ispum dolor sil amet.</p>
				</div>
			</div>
		</div>
	</div>
</div>

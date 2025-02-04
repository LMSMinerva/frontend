<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

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
		return words
			.slice(0, 2)
			.map((w) => w[0].toUpperCase())
			.join('');
	};
</script>

<div class="space-y-8">
	<div class="flex items-center gap-4">
		<Avatar.Root class="size-8">
			<Avatar.Image src="" alt="@shadcn" />
			<Avatar.Fallback>UN</Avatar.Fallback>
		</Avatar.Root>

		<h2>Universidad Nacional de Colombia</h2>
	</div>

	<div class="grid grid-cols-12 gap-x-12">
		<div class="col-span-8 space-y-6">
			<h2 class="text-lg font-semibold">Instructores</h2>
			<div class="flex flex-wrap items-center gap-6">
				{#each instructores as instructor}
					<div class="flex items-center gap-4">
						<Avatar.Root>
							<Avatar.Image src={instructor.avatar} alt={instructor.nombre} />
							<Avatar.Fallback>{getInitials(instructor.nombre)}</Avatar.Fallback>
						</Avatar.Root>
						<h3>{instructor.nombre}</h3>
					</div>
				{/each}
			</div>

			<div class="aspect-w-16 aspect-h-9 h-64 w-full rounded-md bg-indigo-100"></div>

			<hr />

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Acerca de este curso</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet odio quis mollis
					venenatis. Suspendisse ut est sed augue bibendum imperdiet id vitae dui. Etiam ullamcorper
					porta diam, ultrices tempor ipsum ornare vitae. Donec nec justo a diam luctus faucibus.
					Proin eu eleifend nisi. Cras iaculis eu felis sed dictum. Nullam dictum metus nec
					malesuada interdum. Aliquam volutpat, lectus et iaculis tincidunt, nunc mi mattis magna,
					vitae faucibus elit est quis dui. In hac habitasse platea dictumst. Donec in metus massa.
					Etiam at bibendum orci. Morbi laoreet nulla nibh, id bibendum erat hendrerit sed.
				</p>
			</div>

			<div class="flex items-center gap-12 text-zinc-500">
				<span class="flex items-center gap-1">
					<i class="bi bi-award"></i>
					<span>10</span>
				</span>

				<span class="flex items-center gap-1">
					<i class="bi bi-chat-left"></i>
					<span>25</span>
				</span>

				<span class="flex items-center gap-1">
					<i class="bi bi-star"></i>
					<span>4.5</span>
				</span>
			</div>
		</div>

		<div class="col-span-4 space-y-4">
			<span class="text-zinc-600">Tu progreso en el curso es de 80%</span>

			<h2 class="text-lg font-semibold">Comentarios</h2>
			<div class="space-y-4">
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

<script lang="ts">
	import type { Course } from '$lib/types/course';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		name: string;
		image: string;
		institutionImage: string;
		institution: string;
		progress: number;
		finished: boolean;
	};

	const { name, image, institution, progress, finished, institutionImage }: Props = $props();

	function getInstitutionAvatarFallback(institution: string) {
		const words = institution.split(" ");
		return words.slice(0, 2).map(w => w[0].toUpperCase()).join("");
	}
</script>

<div class="w-max-content flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
	<div class="flex items-center justify-center h-[153px] w-full object-cover rounded-md bg-indigo-100">
		{#if image !== ''}
			<img src={image} alt={name} class="h-full w-full" />
		{:else}
			<img src="/course-card-img-placeholder.svg" alt={name} class="size-24" />
		{/if}
	</div>

	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<Avatar.Root class="size-8 border border-zinc-800">
				<Avatar.Image src={institutionImage} alt="@shadcn" />
				<Avatar.Fallback class="text-xs font-semibold text-zinc-500">{getInstitutionAvatarFallback(institution)}</Avatar.Fallback>
			</Avatar.Root>
			<span>{institution}</span>
		</div>

		<h5>{name}</h5>

		<div class="flex items-center justify-end"></div>
	</div>

	{#if finished}
		<Button class="w-full">Descargar certificado</Button>
	{:else}
		<Progress value={progress} />
	{/if}
</div>

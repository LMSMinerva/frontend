<script lang="ts">
	import type { UserCourse } from '$types/course';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		userCourse: UserCourse;
	};
	const { userCourse }: Props = $props();

	function getInstitutionAvatarFallback(institution: string) {
		const words = institution.split(' ');
		return words
			.slice(0, 2)
			.map((w) => w[0].toUpperCase())
			.join('');
	}
</script>

<div class="w-max-content flex cursor-pointer flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
	<div
		class="flex h-[153px] w-full items-center justify-center rounded-md bg-indigo-100 object-cover"
	>
		{#if userCourse.image !== ''}
			<img src={userCourse.image} alt={userCourse.name} class="h-full w-full" />
		{:else}
			<img src="/course-card-img-placeholder.svg" alt={userCourse.name} class="size-24" />
		{/if}
	</div>

	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<Avatar.Root class="size-8 border border-zinc-800">
				<Avatar.Image src={userCourse.institution.image} alt="@shadcn" />
				<Avatar.Fallback class="text-xs font-semibold text-zinc-500"
					>{getInstitutionAvatarFallback(userCourse.institution.name)}</Avatar.Fallback
				>
			</Avatar.Root>
			<span class="font-semibold text-zinc-500">{userCourse.institution.name}</span>
		</div>

		<h5 class="text-lg font-semibold">{userCourse.name}</h5>

		<div class="flex items-center justify-end gap-3 text-zinc-500">
			<span class="flex items-center gap-1">
				<i class="bi bi-award"></i>
				<span>{userCourse.reviews}</span>
			</span>

			<span class="flex items-center gap-1">
				<i class="bi bi-chat-left"></i>
				<span>{userCourse.comments}</span>
			</span>

			<span class="flex items-center gap-1">
				<i class="bi bi-star"></i>
				<span>{userCourse.rating}</span>
			</span>
		</div>
	</div>

	{#if userCourse.progress === 100}
		<Button class="w-full">Descargar certificado</Button>
	{:else if userCourse.progress === 0}
		<Button class="w-full">Matricularme en el curso</Button>
	{:else}
		<Progress class="bg-indigo-50" value={userCourse.progress} />
	{/if}
</div>

<script lang="ts">
	import type { Content } from '$types/content';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		content: Content;
	};
	const { content }: Props = $props();

	function getInstitutionAvatarFallback(institution: string) {
		const words = institution.split(' ');
		return words
			.slice(0, 2)
			.map((w) => w[0].toUpperCase())
			.join('');
	}
</script>

<div
	class="flex flex-row gap-4 rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:shadow-xl"
>
	<div
		class="h-[110px] w-2/5 rounded-lg bg-gradient-to-b from-[#DB4E66] via-[#A24688] to-[#4E3ABA]"
	></div>

	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<h5 class="text-lg font-semibold">{content.name}</h5>
			<i class="bi bi-check2-square text-green-500"></i>
		</div>

		<p class="text-slate-700">{content.description}</p>

		<div class="flex items-center justify-start gap-3 text-zinc-500">
			<span class="flex items-center gap-1">
				<i class="bi bi-award"></i>
				<span>{content.reviews}</span>
			</span>

			<span class="flex items-center gap-1">
				<i class="bi bi-chat-left"></i>
				<span>{content.comments}</span>
			</span>

			<span class="flex items-center gap-1">
				<i class="bi bi-star"></i>
				<span>{content.rating}</span>
			</span>
		</div>
	</div>
</div>

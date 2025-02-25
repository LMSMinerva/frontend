<script lang="ts">
	import type { Comment } from '$lib/types/comment';

	type Props = {
		comment: Comment;
	};

	const { comment }: Props = $props();

	const formatDate = (date: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		};

		return new Date(date).toLocaleDateString('es-ES', options);
	};
</script>

<div class="flex w-full">
	<div>
		<div class="flex items-center gap-2">
			<span class="font-semibold">Usuario #{comment.user}</span>
			<span class="text-xs text-muted-foreground">
				<time datetime={comment.comment_date}>{formatDate(comment.comment_date)}</time>
			</span>
		</div>
		<p class="text-sm text-muted-foreground">{comment.comment}</p>
	</div>
</div>

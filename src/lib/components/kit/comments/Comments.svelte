<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Comment } from '$lib/types/comment';
	import { Input } from '$lib/components/ui/input/index.js';
	import CommentComponent from './Comment.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { storeAuth } from '$lib/stores/auth';
	import { onMount, type SvelteComponent } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { CommentStore } from '$lib/stores/comments';
	import { toast } from 'svelte-sonner';
	import type { Content } from '$lib/types/content';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	type Props = {
		comments: Comment[];
		content: Content;
		isLoading?: boolean;
	};

	let { comments, content, isLoading = false }: Props = $props();

	let isSending = $state(false);
	let commentInput = $state('');
	let internalComments = $state(comments);
	let sortedComments = $derived(internalComments.toReversed());

	const storeComments = new CommentStore();
	let scrollArea: HTMLDivElement | null = $state(null);

	async function submitComment() {
		if (!commentInput.trim()) return;

		isSending = true;
		try {
			const newComment: Partial<Comment> = {
				user: storeAuth.getUser()?.id as number,
				content: content.id,
				comment: commentInput,
				is_reply: false
			};

			toast.loading('Enviando comentario...');
			const response = await storeComments.createComment(newComment as Comment);
			if (response === null) {
				toast.error('Error al enviar el comentario');
				return;
			}

			toast.success('Comentario guardado');
			internalComments.push(response as Comment);
			commentInput = '';
			scrollToTop();
		} catch (err) {
			console.error('Error al enviar el comentario:', err);
		} finally {
			isSending = false;
		}
	}

	const scrollToTop = () => {
		if (scrollArea !== null) {
			scrollArea.scrollTop = 0;
		}
	};

	$effect(() => {
		if (comments.length > 0) {
			internalComments = comments;
			scrollToTop();
		}
	});
</script>

<Card.Root>
	<Card.Header class="flex w-full flex-row items-center justify-between">
		<Card.Title class="flex items-center gap-2">
			<i class="bi bi-chat"></i>
			<span>Comentarios</span>
		</Card.Title>
		<span class="text-sm text-muted-foreground">{internalComments.length}</span>
	</Card.Header>

	<Card.Content>
		<div class="items-top mb-4 flex gap-2">
			<Textarea placeholder="Añade un comentario..." bind:value={commentInput} />
			<Button onclick={submitComment} disabled={!commentInput.trim() || isSending}>
				{#if isSending}
					<span>Enviando</span>
					<i class="bi bi-arrow-clockwise animate-spin"></i>
				{:else}
					<span>Comentar</span>
					<i class="bi bi-send"></i>
				{/if}
			</Button>
		</div>
		<ScrollArea bind:ref={scrollArea} class="h-[300px]">
			{#if isLoading}
				<Skeleton class="h-[300px] w-full" />
			{:else}
				<div class="space-y-4">
					{#each sortedComments as comment (comment.id)}
						<CommentComponent {comment} />
					{/each}
				</div>
			{/if}
		</ScrollArea>
	</Card.Content>
</Card.Root>

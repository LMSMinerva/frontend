<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	}

	let { data }: Props = $props();

	import Home from '$lib/components/course/Home.svelte';
</script>

<Home />
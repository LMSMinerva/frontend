<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	import Home from '$lib/components/course/Home.svelte';
</script>

{#await Promise.all([data.course, data.institution])}
	<p class="text-xl font-semibold">Cargando información...</p>
{:then [course, institution]}
	<Home course={course} institution={institution} />
{/await}

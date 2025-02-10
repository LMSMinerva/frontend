<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	let course = data.course;

	import Home from '$lib/components/course/Home.svelte';
</script>

{#await data.institution}
	<p class="text-xl font-semibold">Cargando información...</p>
{:then data}
	<Home {course} institution={data} />
{/await}

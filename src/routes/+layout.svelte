<script lang="ts">
	import type { LayoutData } from './$types';
	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	import '$styles/app.scss';
	import Nav from '$components/layout/Nav.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	let { children, data } = $props();
</script>

<Nav user={data.user} page="Admin" />

<main class="py-12">
	{@render children()}
</main>

<Footer />

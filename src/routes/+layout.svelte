<script lang="ts">
	import type { LayoutData } from './$types';
	import { storeAuth } from '$lib/stores/auth';
	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	import '$styles/app.scss';
	import Nav from '$lib/components/layout/Nav.svelte';
	import type { Snippet } from 'svelte';
	let { children, data } = $props();

	const accessToken = data.authToken;
	storeAuth.setAccessToken(accessToken || '');
</script>

<Nav user={data.user} page="Admin" />

<main class="py-12">
	{@render children()}
</main>

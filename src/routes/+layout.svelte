<script lang="ts">
	import type { LayoutData } from './$types';
	import { storeAuth } from '$lib/stores/auth';
	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	import '$styles/app.scss';
	import Nav from '$components/layout/Nav.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	let { children, data } = $props();

	storeAuth.setAccessToken(data.accessToken || '');
	storeAuth.setRefreshToken(data.refreshToken || '');
</script>

<Nav user={data.user} page="" />

<main class="py-12">
	{@render children()}
</main>

<Footer />

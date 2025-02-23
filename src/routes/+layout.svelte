<script lang="ts">
	import '$styles/app.scss';
	import type { LayoutData } from './$types';
	import Nav from '$components/layout/Nav.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';

	import { storeAuth } from '$lib/stores/auth';
	
	type Props = {
		children: Snippet;
		data: LayoutData;
	};
	
	let { children, data }: Props = $props();

	storeAuth.setAccessToken(data.accessToken || '');
	storeAuth.setRefreshToken(data.refreshToken || '');
	if (data.user !== null) storeAuth.setUser(data.user);
</script>

<Nav user={data.user} page="" />

<main class="py-12">
	{@render children()}
</main>

<Footer />

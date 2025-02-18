<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
	import { browser } from '$app/environment';

    let { data }: { data: PageData } = $props();

    onMount(() => {
        if (browser) {
            window.location.pathname = "/";
        }
    });
</script>

<span>
    Autorizando...
</span>
<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div>
    <h2>Modulo: #{data.module}</h2>
</div>
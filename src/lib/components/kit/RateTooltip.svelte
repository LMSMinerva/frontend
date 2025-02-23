<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
    import StarRate from './StarRate.svelte';

	type Props = {
		rate?: number;
        onRate: (rate: number) => void;
		onDeleteRate: () => void;
		children: Snippet;
    };

	const { rate, onRate, onDeleteRate, children  }: Props = $props();

	let internalRate = $state(rate);
</script>

<Tooltip.Provider delayDuration={100}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{@render children()}
		</Tooltip.Trigger>
		<Tooltip.Content>
		    <StarRate 
                bind:rate={internalRate}
                onRate={(rate) => onRate(rate)} 
                onDeleteRate={() => onDeleteRate()} 
            />
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
    import StarRate from './StarRate.svelte';

	type Props = {
		rate?: number;
        onRateChange: (rate: number) => void;
		onRateDelete: () => void;
		children: Snippet;
    };

	let { rate = $bindable(), onRateChange, onRateDelete, children  }: Props = $props();
</script>

<Tooltip.Provider delayDuration={100}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{@render children()}
		</Tooltip.Trigger>
		<Tooltip.Content>
		    <StarRate 
                bind:rate={rate}
                onRate={(rate) => onRateChange(rate)} 
                onDeleteRate={() => onRateDelete()} 
            />
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

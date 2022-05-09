<script>
  import { getContext } from 'svelte';
  import { STEPS } from './Steps.svelte';

  export let item = {};
  const { addStep, current } = getContext(STEPS);
  addStep(item);
</script>

{#if item === $current}
  <slot />
{/if}

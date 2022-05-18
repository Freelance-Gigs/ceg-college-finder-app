<script context="module">
  export const STEPS = Symbol('steps');
</script>

<script>
  import { setContext, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let steps = writable([]);
  let current = writable(null);

  setContext(STEPS, {
    addStep: (step) => {
      $steps = $steps.concat(step);

      onDestroy(() => {
        $steps = $steps.filter((_step) => _step !== step);
      });
    },
    nextStep: () => {
      const index = $steps.indexOf($current);
      const nextIndex = Math.min(index + 1, $steps.length - 1);
      const { id } = $steps[nextIndex];

      goto(id);
    },
    prevStep: () => {
      const index = $steps.indexOf($current);
      const nextIndex = Math.max(index - 1, 0);
      const { id } = $steps[nextIndex];

      goto(id);
    },
    current,
    steps,
  });

  $: {
    if ($steps.length > 0) {
      const { params } = $page;
      const step = $steps.findIndex(({ id: _id }) => _id === params.id);
      $current = $steps[step];
    }
  }
</script>

<section>
  <slot />
</section>

<script>
  import { STEPS } from './Steps.svelte';
  import { getContext } from 'svelte';

  const { steps, current } = getContext(STEPS) || {};
  $: activeIndex = $steps.indexOf($current);

</script>

{#if $current !== null}
  <section>
    <ul class='space-y-4 md:flex md:space-y-0 md:space-x-8 m-10'>
      {#each $steps as { title, number }, index}
        <li class='md:flex-1'>
          <div
            class={`group pl-4 py-2 flex flex-col border-l-4 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 ${index <= activeIndex ? 'border-primary hover:border-tertiary' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <span
              class={`text-md font-semibold tracking-wide uppercase ${index <= activeIndex ? 'text-primary group-hover:text-tertiary' : 'text-gray-500 group-hover:text-gray-700'}`}
            > Step {number}</span>
            <span class='text-lg font-medium'>{title}</span>
          </div>
        </li>
      {/each}
    </ul>
  </section>
{/if}

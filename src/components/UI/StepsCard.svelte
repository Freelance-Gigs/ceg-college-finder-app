<script>
  import StepsBar from './StepsBar.svelte';
  import Steps from './Steps.svelte';
  import Step from './Step.svelte';

  export let content = [];
</script>

<Steps>
  <StepsBar />
  {#each content as item (item.id)}
    <Step {item}>
      <svelte:component this={item.component} />
    </Step>
  {/each}
</Steps>

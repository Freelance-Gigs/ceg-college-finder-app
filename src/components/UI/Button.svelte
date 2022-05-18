<script lang='ts'>
  export let secondary = false
</script>

<button
  on:click
  class={`inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-tertiary ${secondary ? "bg-secondary" : "bg-primary"}`}
  {...$$restProps}
>
  <slot />
</button>

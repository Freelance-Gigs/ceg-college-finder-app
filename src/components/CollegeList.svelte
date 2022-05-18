<script>
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import {onMount} from 'svelte';
  import {orderBy} from 'lodash';
  import {frequencies} from 'underscore-contrib';
  import SvelteTable from "svelte-table";
  import Button from './UI/Button.svelte';
  import {goto} from '$app/navigation';
  import {collegesMatchingState, loadCollegesMatchingState, state} from "../stores/state";
  import {loadCollegesMatchingInterests, interests, collegesMatchingInterests} from "../stores/interests";

  let loading = true;
  let colleges = [];

  onMount(async () => {
    await loadCollegesMatchingState($state)
    await loadCollegesMatchingInterests($interests)

    colleges = [...$collegesMatchingState, ...$collegesMatchingInterests];
    console.log(colleges)
    loading = false;
  });

  const columns = [
    {
      key: "index",
      title: "#",
      value: v => v.index,
      sortable: true,
    },
    {
      key: "colleges",
      title: "Colleges",
      value: v => v.colleges,
      sortable: true,
    },
    {
      key: "num_of_lists",
      title: "# of lists",
      value: v => v.num_of_lists,
      sortable: true,
      headerClass: "text-left",
    }
  ];

  $: collegesMap = frequencies(colleges);
  $: data = Object.keys(collegesMap).map((key) => ({
    colleges: key,
    num_of_lists: collegesMap[key],
  }));
  $: rows = orderBy(data, ['num_of_lists'], ['desc']).map((row, index) => ({
    index: index + 1,
    ...row
  }))
</script>

<main>
  <h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
    Learn which colleges rate highly based on your interests
  </h2>

  {#if loading}
    <LoadingSpinner />
  {:else}
    <section class="w-1/2 overflow-auto m-6 mx-auto p-0 bg-white shadow-2xl rounded-md">
      <SvelteTable sortBy="num_of_lists" sortOrder="-1" {columns} {rows} />
    </section>
    <div class='flex mx-6'>
      <Button on:click={() => goto('/')}>
        Start again
      </Button>
    </div>
  {/if}
</main>


<style>
  section {
    max-height: 36rem;
  }

  :global(th){
    padding: 0.75rem;
    background-color: #000;
    color: #ffffff;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-color: #ffffff;
    text-transform: capitalize;
    z-index: 30;
    top: 0;
    position: sticky;
  }

  :global(td){
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    border-top-width: 1px;
    border-right-width: 1px;
    border-color: #000000;
    font-size: 1em;
  }

  :global(table) {
    border-collapse: separate;
    border-spacing: 0;
  }

  :global(tr:nth-of-type(2n)){
    background-color: rgb(243, 244, 246);
  }

</style>

<script>
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import { collegesMatchingInterests, collegesMatchingState } from '../stores/collegeList';
  import { onMount } from 'svelte';
  import { flatten } from 'lodash';
  import { frequencies } from 'underscore-contrib';
  import { Datatable } from 'svelte-simple-datatables';
  import Button from './UI/Button.svelte';
  import { goto } from '$app/navigation';

  let loading = true;
  let colleges = [];
  let rows;

  onMount(async () => {
    const interests = await $collegesMatchingInterests;
    const states = await $collegesMatchingState;
    colleges = flatten([states, ...interests]);
    loading = false;
  });

  const settings = {
    sortable: true,
    pagination: true,
    rowsPerPage: 20,
    columnFilter: true,
    blocks: {
      paginationButtons: true,
      paginationRowCount: true,
    },
  };

  $: collegesMap = frequencies(colleges);
  $: data = Object.keys(collegesMap).map((key) => ({
    colleges: key,
    num_of_lists: collegesMap[key],
  }));

</script>

<main>
  <h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
    Learn which colleges rate highly based on your interests
  </h2>


  {#if loading}
    <LoadingSpinner />
  {:else}
    <div class='w-1/2 h-12 text-left m-auto bg-gray-300 shadow-2xl border-amber-200 mb-6'>
      <Datatable {settings} {data} bind:dataRows={rows}>
        <thead>
        <th data-key='colleges'>Colleges</th>
        <th data-key='num_of_lists'># of lists</th>
        </thead>
        <tbody>
        {#if rows}
          {#each $rows as { colleges, num_of_lists }}
            <tr class='first:shadow-lg even:bg-gray-100'>
              <td>{colleges}</td>
              <td>{num_of_lists}</td>
            </tr>
          {/each}
        {/if}
        </tbody>
      </Datatable>
    </div>

    <div class='flex mx-6'>
      <Button on:click={() => goto('/')}>
        Start again
      </Button>
    </div>

  {/if}
</main>


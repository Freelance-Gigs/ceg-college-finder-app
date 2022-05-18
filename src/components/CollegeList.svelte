<script lang='ts'>
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import {onMount} from 'svelte';
  import {orderBy} from 'lodash';
  // @ts-ignore
  import SvelteTable from "svelte-table";
  import Button from './UI/Button.svelte';
  import {goto} from '$app/navigation';
  import {collegesMap, combinedList, isPending, loadAllColleges} from "../stores/collegeList";


  onMount(loadAllColleges)

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
      value: v => {
        const name = v.colleges
        const collegeObject = $collegesMap[name]

        if(!collegeObject){
          return name
        }
        const src = collegeObject['collegeExpressUrl'] || "#"
       return `<a href='${src}' target="_blank">${name}</a>`
      },
      sortable: true,
    },
    {
      key: "num_of_lists",
      title: "# of lists",
      value: v => {
        const name = v.colleges
        const color = $collegesMap[name]['color']
        return `<span class="${color}">${v.num_of_lists}</span>`
      },
      sortable: true,
      headerClass: "text-left",
    }
  ];

  $: rows = orderBy($combinedList, ['num_of_lists'], ['desc']).map((row, index) => ({
    index: index + 1,
    ...row
  }))
</script>

<main>
  <h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
    Learn which colleges rate highly based on your interests
  </h2>

  {#if $isPending}
    <LoadingSpinner />
  {:else}
    <article
            class="text-center text-secondary w-2/4 mb-4
     m-auto font-normal border border-black border-dashed p-6 text-lg"
    >
      <p class="mb-6">
        This portion of the tool exists to help you filter which colleges
        are most likely to be affordable for your family using a simple
        Red/Yellow/Green color coding. (“Green” = good, btw.) However,
        we absolutely know there are exceptions. Lots of them. Some are <a
              class="text-primary font-semibold hover:text-tertiary"
              href="https://www.collegeessayguy.com/paying-for-college/financial-fit/public-out-of-state"
              target="_blank"
              rel="noreferrer"
      >
        weird
      </a>.
        And some typically unaffordable colleges can be made affordable with really,
        REALLY good grades and/or test scores and/or extra-curricular activities.
        (We see you D-I sports.) So after you use the tool, we implore you to check
        out your top overlap colleges’ financial aid websites for yourself to find out
        what scholarship and grant options exist.
      </p>
    </article>
    <section class="w-1/2 overflow-auto m-6 mx-auto p-0 bg-white shadow-xl rounded-md">
      <SvelteTable sortBy="index" sortOrder="1" {columns} {rows} />
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
    background-color: #6b7280;
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
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    text-align: center;
    border-top-width: 1px;
    border-right-width: 1px;
    border-color: #000000;
    font-size: 0.9em;
  }

  :global(td a){
    color: #ff8f38;
    font-weight: 600;
  }

  :global(td a:hover){
    color: #000;
  }

  :global(td span){
    color: rgb(0 0 0 / 0.9);
    border-radius: 9999px;
    font-weight: 500;
    padding: 0.3rem 1.5rem;
  }

  :global(td span.yellow){
    background-color: rgb(252, 211, 77);
  }

  :global(td span.red){
    background-color: rgb(239, 68, 68);
  }

  :global(td span.green){
    background-color: rgb(52, 211, 153);
  }

  :global(table) {
    border-collapse: separate;
    border-spacing: 0;
  }

  :global(tr:nth-of-type(2n)){
    background-color: rgb(243, 244, 246);
  }

</style>

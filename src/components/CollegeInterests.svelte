<script lang='ts'>
  import { COLLEGE_INTERESTS_TABLE } from '../api/airtable';
  import { Records } from 'airtable';
  import { SyncLoader } from 'svelte-loading-spinners';
  import Checkbox from 'svelte-checkbox';
  import Button from './UI/Button.svelte';
  import { getContext } from 'svelte';
  import { STEPS } from './UI/Steps.svelte';
  import { interests } from '../stores/interests.js';
  import LoadingSpinner from './UI/LoadingSpinner.svelte';

  const { nextStep } = getContext(STEPS);
  const fetchInterests: Promise<Records<any>> = COLLEGE_INTERESTS_TABLE.select({
    fields: ['List Name'],
    sort: [{ field: 'List Name', direction: 'asc' }],
  }).firstPage();

</script>

<main>
  <h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
    Select your college interests.
  </h2>
  {#await fetchInterests}
    <LoadingSpinner />
  {:then records}
    <div class='grid grid-cols-3 mx-40 gap-4 pt-8 mb-16 text-md'>
      {#each records.map((record) => record.get('List Name')) as interest}
        <div class='flex align-middle gap-2'>
          <Checkbox
            size='1.3rem'
            primaryColor='#ff8f38'
            secondaryColor='hsl(0, 0%, 12%)'
            on:change='{({detail}) => {
              if(detail){
                $interests.push(interest)
              }else{
                $interests = $interests.filter((value) => value !== interest)
              }
            }}'
          />
          <span>
            {interest}
          </span>
        </div>
      {/each}
    </div>
    <div class='flex flex-row-reverse mx-6 mb-6'>
      <Button on:click={() => nextStep()}>
        Next step
      </Button>
    </div>
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</main>


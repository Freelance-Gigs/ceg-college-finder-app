<script lang='ts'>
  import { COLLEGE_INTERESTS_TABLE } from '../api/airtable';
  import { Records } from 'airtable';
  // @ts-ignore
  import Checkbox from 'svelte-checkbox';
  import Button from './UI/Button.svelte';
  import { getContext } from 'svelte';
  // @ts-ignore
  import { STEPS } from './UI/Steps.svelte';
  import { interests, loadCollegesMatchingInterests } from '../stores/interests';
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import {goto} from "$app/navigation";

  const { nextStep, prevStep } = getContext(STEPS);
  // @ts-ignore
  const fetchInterests: Promise<Records<TFields>> = COLLEGE_INTERESTS_TABLE.select({
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

    <div class='flex justify-between gap-2 mx-6 mb-6'>
      <Button secondary on:click={() => goto('/')}>
        Prev step
      </Button>
      <Button on:click={async () => {
        await loadCollegesMatchingInterests($interests)
        nextStep()
      }}>
        Next step
      </Button>
    </div>
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</main>


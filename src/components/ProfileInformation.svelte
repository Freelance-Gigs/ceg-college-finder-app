<script lang='ts'>
    import states from 'states-us';
    import Select from 'svelte-select';
    import { v4 } from 'uuid';
    import Button from './UI/Button.svelte';
    import { getContext } from 'svelte';
    import { STEPS } from './UI/Steps.svelte';
    import { state } from '../stores/state';

    const { nextStep } = getContext(STEPS);

    const STATES = states.map(({ abbreviation, name }) => ({
        id: v4(),
        value: abbreviation,
        label: `${abbreviation} - ${name}`,
    }));

    const GPA = [
        {
            id: v4(),
            value: '0.0-2.0',
            label: '0.0-2.0',
        },
        {
            id: v4(),
            value: '2.0-2.5',
            label: '2.0-2.5',
        },
        {
            id: v4(),
            value: '2.6-3.0',
            label: '2.6-3.0',
        },
        {
            id: v4(),
            value: '3.5-4.0',
            label: '3.5-4.0',
        },
        {
            id: v4(),
            value: '4.0+',
            label: '4.0+',
        },
    ];

    const FAMILY_AFFORDABILITY = [
        {
            value: '$0-$10k',
            label: '$0-$10k',
        },
        {
            value: '$10k-20K',
            label: '$10k-20K',
        },
        {
            value: '$20K-$40',
            label: '$20K-$40',
        },
        {
            value: '$40+',
            label: '$40+',
        },
    ];

    const INPUTS = [
        {
            id: v4(),
            name: 'state',
            items: STATES,
            text: 'Which state do you live in?',
            placeholder: 'Select state',
            value: $state,
        },
        {
            id: v4(),
            name: 'GPA',
            items: GPA,
            text: 'What’s your GPA?',
            placeholder: 'Select GPA',
            value: '',
        },
        {
            id: v4(),
            name: 'affordability',
            items: FAMILY_AFFORDABILITY,
            text: 'How much can your family afford for college?',
            placeholder: 'Select amount',
            value: '',

        },
    ];

</script>


<main>
    <h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
        Pick your GPA range and location
    </h2>
    <section class='mx-60 mb-6 px-12 py-6 themed'>
        {#each INPUTS as { items, placeholder, text, value, name }, id}
            <div class='mb-6'>
                <p class='font-semibold text-gray-600 mb-2'>{text}</p>
                <Select
                        {id}
                        {value}
                        {items}
                        {placeholder}
                        on:select={({detail}) => {
            if (name === 'state'){
              $state = detail.value
            }
          }}
                />
            </div>
        {/each}
    </section>

    <div class='flex flex-row-reverse mx-6 mb-6'>
        <Button on:click={nextStep}>
            Next step
        </Button>
    </div>

</main>


<style>
    .themed {
        --border: 2px solid gray;
        --borderRadius: 10px;
        --placeholderColor: gray;
        --borderFocusColor: #ff8f38;
    }
</style>

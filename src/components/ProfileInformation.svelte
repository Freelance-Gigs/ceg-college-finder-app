<script lang='ts'>
    import Select from 'svelte-select';
    import { v4 } from 'uuid';
    import Button from './UI/Button.svelte';
    import { getContext } from 'svelte';
    // @ts-ignore
    import { STEPS } from './UI/Steps.svelte';
    import {state, loadCollegesMatchingState, STATES} from '../stores/state';
    import {GPA, gpa} from "../stores/gpa";
    import {affordability, FAMILY_AFFORDABILITY} from "../stores/affordability";

    const { nextStep, prevStep } = getContext(STEPS);

    const INPUTS = [
        {
            id: v4(),
            name: 'state',
            items: STATES,
            text: 'Which state do you live in?',
            placeholder: 'Select state',
            value: '',
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
                                            $state = detail
                                        } else if(name === 'GPA'){
                                            $gpa = detail
                                        }  else {
                                            $affordability = detail
                                        }
                                      }}
                />
            </div>
        {/each}
        <div class='flex gap-2  mx-auto mb-6 text-center '>
            <Button secondary :click={prevStep}>
                Prev step
            </Button>
            <Button on:click={async () => {
            await loadCollegesMatchingState($state.value)
            nextStep()
        }}>
                Next step
            </Button>
        </div>
    </section>

</main>


<style>
    .themed {
        --border: 2px solid gray;
        --borderRadius: 10px;
        --placeholderColor: gray;
        --borderFocusColor: #ff8f38;
    }
</style>

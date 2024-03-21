<script lang='ts'>
	import Select from 'svelte-select';
	import { v4 } from 'uuid';
	import Button from './UI/Button.svelte';
	import { getContext } from 'svelte';
	// @ts-ignore
	import { STEPS } from './UI/Steps.svelte';
	import { state, STATES } from '../stores/state';
	import { GPA, gpa } from '../stores/gpa';
	import { affordability, FAMILY_AFFORDABILITY } from '../stores/affordability';

	const { nextStep, prevStep } = getContext(STEPS) as any;

	const INPUTS = [
		{
			id: v4(),
			name: 'state',
			items: STATES,
			text: 'Which state do you live in?',
			description: 'This will help us find colleges near you and also for in-state tuition. International students can skip this question.',
			placeholder: 'Select state',
			value: ''
		},
		{
			id: v4(),
			name: 'GPA',
			items: GPA,
			text: 'What’s your GPA?',
			placeholder: 'Select GPA',
			description: `If you don't know how to calculate your GPA you can use an online GPA calculator such as the one on <a class="text-primary" target="_blank" href="https://bigfuture.collegeboard.org/plan-for-college/get-started/how-to-convert-gpa-4.0-scale">College Board</a>`,
			value: ''
		},
		{
			id: v4(),
			name: 'affordability',
			items: FAMILY_AFFORDABILITY,
			text: 'How much can your family afford for college?',
			placeholder: 'Select amount',
			description: `This will help us find colleges that are affordable for you. If you don't know how much your family can afford, you can use the <a class="text-primary" target="_blank" href="https://bigfuture.collegeboard.org/pay-for-college/college-costs/college-costs-calculator">College Board's College Cost Calculator</a> to estimate your family's contribution or a tool like <a class="text-primary" target="_blank" href="https://myintuition.org/">MyinTuition</a> to get a quick estimate`,
			value: ''

		}
	];
</script>


<main>
	<h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
		Pick your GPA range and location
	</h2>
	<section class='mx-60 mb-6 px-12 py-6 themed'>
		{#each INPUTS as { items, placeholder, text, value, name, description }, id}
			<div class='mb-6'>
				<p class='font-semibold text-gray-600 mb-2'>{text}</p>
				<p class='text-gray-500 text-sm mb-2'>{
					@html description
				}</p>
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

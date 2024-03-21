<script lang='ts'>
	import Button from './UI/Button.svelte';
	import { getContext } from 'svelte';
	import { STEPS } from './UI/Steps.svelte';
	import { interests } from '../stores/interests';

	// @ts-ignore
	import Checkbox from 'svelte-checkbox';

	const { nextStep } = getContext(STEPS) as any;
	const categories = ['Super Important', 'Want it', 'Don’t Care', 'No way!'];
</script>

<main>
	<h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
		Select your college interests.
	</h2>
	<p class='text-center text-gray-600 mb-8 max-w-[80%] mx-auto'>
		Select the category that best describes your interest in each item. Selecting multiple categories will only save the
		last one selected. First deselect the previous category before selecting a new one.
	</p>
	<div class='flex justify-end gap-2 mx-auto mb-6 max-w-[80%]'>
		<Button on:click={async () => nextStep()}>
			Next step
		</Button>
	</div>


	<div class="table-container">

		<table>
			<thead>
			<tr>
				<th>Category</th>
				<th>Super Important</th>
				<th>Want it</th>
				<th>Don’t Care</th>
				<th>No way!</th>
			</tr>
			</thead>
			<tbody>
			{#each $interests as { label, preference }, index }
				<tr>
					<td>{label}</td>
					{#each categories as category}
						<td>
							<Checkbox
								size='1.3rem'
								primaryColor='#ff8f38'
								secondaryColor='hsl(0, 0%, 12%)'
								checked={preference === category}
								on:change={() => {
                                        $interests[index].preference = category;
                                        $interests = $interests;
                                    }}
							/>
						</td>
					{/each}
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</main>

<style>
    .table-container {
        width: 80%;
        margin: 0 auto;
        overflow-y: auto;
        max-height: 600px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    thead th {
        background-color: #f4f4f4;
        position: sticky;
        top: 0;
        z-index: 10;
				color: black !important;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    tbody tr:last-child td {
        border-bottom: 0;
    }
</style>

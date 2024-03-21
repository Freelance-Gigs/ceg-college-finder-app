<script lang='ts'>
	import LoadingSpinner from './UI/LoadingSpinner.svelte';
	import { onMount } from 'svelte';
	// @ts-ignore
	import SvelteTable from 'svelte-table';
	import Button from './UI/Button.svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { gpa } from '../stores/gpa';
	import { affordability } from '../stores/affordability';
	import { state } from '../stores/state';
	import { readableInterests } from '../stores/interests';

	type College = {
		name: string;
		url: string;
	};

	let isPending: boolean;
	let isErrored: boolean;
	let collegeList: College[] = [];

	onMount(async () => {
		isPending = true;
		await axios.post('https://api.autorecommender.tech/functions/v1/generate-college-list', {
			gpa: $gpa.value,
			affordability: $affordability.value,
			state: $state.value,
			interests: $readableInterests
		})
			.then((response) => {
				collegeList = response?.data || [];
			})
			.catch((error) => {
				console.log(error);
				isErrored = true;
			});
		isPending = false;
	});


	const columns = [
		{
			key: 'index',
			title: '#',
			value: v => v.index,
			sortable: true
		},
		{
			key: 'colleges',
			title: 'Name',
			sortable: true,
			value: v => v.colleges
		},
		{
			key: 'url',
			title: 'Website',
			value: v => `<a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.url}</a>`
		}
	];

	$: rows = collegeList.map((college, index) => ({
		index: index + 1,
		colleges: college.name,
		url: college.url
	}));
</script>

<main>
	<h2 class='text-3xl text-center font-extrabold tracking-tight text-gray-900 my-8'>
		{#if isPending}
			Generating college list. This may take a few seconds...
		{:else if isErrored}
			Something went wrong. Please try again later.
		{:else if collegeList?.length === 0}
			No colleges found. Please try again with different preferences.
		{:else}
			Here are some colleges you might be interested in
		{/if}
	</h2>

	{#if isPending}
		<LoadingSpinner />
	{:else if !isErrored && collegeList?.length > 0}
		<section class="w-1/2 overflow-auto m-6 mx-auto p-0 bg-white shadow-xl rounded-md">
			<SvelteTable sortBy="index" sortOrder="1" {columns} {rows} />
		</section>
	{/if}
	<div class='flex mx-6'>
		<Button on:click={() => {
			$gpa = {}
			$affordability = {}
			$state = {}
			goto('/');

		}}>
			Start again
		</Button>
	</div>
</main>


<style>
    section {
        max-height: 36rem;
    }

    :global(th) {
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

    :global(td) {
        padding-top: 0.7rem;
        padding-bottom: 0.7rem;
        text-align: center;
        border-top-width: 1px;
        border-right-width: 1px;
        border-color: #000000;
        font-size: 0.9em;
    }

    :global(td a) {
        color: #ff8f38;
        font-weight: 600;
    }

    :global(td a:hover) {
        color: #000;
    }

    :global(td span) {
        color: rgb(0 0 0 / 0.9);
        border-radius: 9999px;
        font-weight: 500;
        padding: 0.3rem 1.5rem;
    }


    :global(tr:nth-of-type(2n)) {
        background-color: rgb(243, 244, 246);
    }

</style>

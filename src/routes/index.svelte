<script lang='ts'>
  import Sparkles from '../icons/Sparkles.svelte';
  import Button from '../components/UI/Button.svelte';
  import Check from '../icons/Check.svelte';
  import Line from '../components/UI/Line.svelte';
  import { goto } from '$app/navigation';
  import {onMount} from "svelte";
  import {collegesMap, loadAllColleges} from "../stores/collegeList";

  onMount(loadAllColleges)

</script>

<section class='my-24'>
  <div
    class='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'
  >
    <div
      class='px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2'
    >
      <span
        class='h-12 w-12 rounded-md block flex items-center justify-center bg-primary mb-6'
      >
        <Sparkles />
      </span>
      <h2 class='text-3xl font-extrabold tracking-tight text-gray-900 mb-6'>
        How it works
      </h2>

      <ol class='overflow-hidden'>
        <li class='relative pb-10'>
          <Line />
          <p class='relative flex items-start group'>
            <span class='h-9 flex items-center'>
              <span
                class='relative z-10 w-8 h-8 flex items-center justify-center bg-secondary rounded-full'
              >
                <Check />
              </span>
            </span>
            <span class='ml-4 min-w-0 flex flex-col'>
              <span class='text-xs font-semibold tracking-wide uppercase'
              >College Interests</span
              >
              <span class='text-sm text-gray-500'
              >Select your college interests.</span
              >
            </span>
          </p>
        </li>

        <li class='relative pb-10'>
          <Line />
          <p class='relative flex items-start group' aria-current='step'>
            <span class='h-9 flex items-center' aria-hidden='true'>
              <span
                class='relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-secondary rounded-full'
              >
                <span class='h-2.5 w-2.5 bg-secondary rounded-full' />
              </span>
            </span>
            <span class='ml-4 min-w-0 flex flex-col'>
              <span
                class='text-xs font-semibold tracking-wide uppercase text-secondary'
              >Profile information</span
              >
              <span class='text-sm text-gray-500'
              >Pick your GPA range and location</span
              >
            </span>
          </p>
        </li>

        <li class='relative pb-10'>
          <p class='relative flex items-start group'>
            <span class='h-9 flex items-center' aria-hidden='true'>
              <span
                class='relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full'
              />
            </span>
            <span class='ml-4 min-w-0 flex flex-col'>
              <span
                class='text-xs font-semibold tracking-wide uppercase text-gray-500'
              >College List</span
              >
              <span class='text-sm text-gray-500'
              >Learn which colleges rate highly based on your interests</span
              >
            </span>
          </p>
        </li>
      </ol>
      <p class='mb-6'>
        Who rates the colleges? Learn more <a
        href='https://www.collegexpress.com/faq/#1_5'
        target='_blank'
        rel='noreferrer'
        class='text-primary font-semibold hover:text-tertiary'>here</a
      >.
      </p>
      <Button on:click={() => goto('find-college/interests')}
      >Get started
      </Button
      >
    </div>
    <div class='mt-12 sm:mt-16 lg:mt-0 lg:col-start-1'>
      <div
        class='pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full'
      >
        <img
          class='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none'
          src='https://i.ibb.co/pPCjPtk/glenn-carstens-peters-RLw-UC03-Gwc-unsplash.jpg'
          alt='Customer profile user interface'
        />
      </div>
    </div>
  </div>
</section>

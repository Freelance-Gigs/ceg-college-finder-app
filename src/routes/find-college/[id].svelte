<script>
  import CollegeInterests from '../../components/CollegeInterests.svelte';
  import ProfileInformation from '../../components/ProfileInformation.svelte';
  import StepsCard from '../../components/UI/StepsCard.svelte';
  import CollegeList from '../../components/CollegeList.svelte';

  export const CONTENT = [
    {
      id: 'interests',
      number: '1',
      title: 'College Interests',
      component: CollegeInterests,
    },
    {
      id: 'profile',
      number: '2',
      title: 'Profile Information',
      component: ProfileInformation,
    },
    {
      id: 'list',
      number: '3',
      title: 'College List',
      component: CollegeList,
    },
  ];
</script>

<main>
  <StepsCard content={CONTENT} />
</main>

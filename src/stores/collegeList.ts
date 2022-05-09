import { derived } from 'svelte/store';
import { state } from './state';
import { COLLEGE_DETAILS_TABLE, COLLEGE_INTERESTS_TABLE } from '../api/airtable';
import { interests } from './interests';


export const collegesMatchingState = derived(
  state,
  async ($state) => {
    const records = await COLLEGE_DETAILS_TABLE.select({
      fields: ['University Name and State', 'CollegeXpress Link', 'State'],
    }).firstPage();

    return records.filter((record) => {
      const universityState = record.get('State');

      return universityState === $state;
    }).map(({ fields }) => {
      return fields;
    }).map((field) => field['University Name and State']);
  },
);


export const collegesMatchingInterests = derived(interests, async ($interests) => {
  let colleges = [];
  for (const interest of $interests) {
    const records = await COLLEGE_INTERESTS_TABLE.select().firstPage();

    const res = records.filter((record) => {
      const listName = record.get('List Name');

      return listName === interest;
    }).map(({ fields }) => Object.values(fields));

    colleges = [...colleges, ...res];
  }

  return colleges;
});

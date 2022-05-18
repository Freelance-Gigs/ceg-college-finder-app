import type { AirtableField } from 'src/types/airtable';
import { writable } from 'svelte/store';
import { COLLEGE_INTERESTS_TABLE} from "../api/airtable";
import {flatten} from "lodash";


export const interests = writable(['Astronomy', "Science"]);
export const collegesMatchingInterests = writable<AirtableField[]>([])

export const loadCollegesMatchingInterests = async (interests: string[]): Promise<void> => {
    const interestsAsExpressions = interests.reduce((previousValue, currentValue) => {
        return previousValue ? `${previousValue},{List Name}="${currentValue}"` : `{List Name}="${currentValue}"`
    }, '')

    const records = await COLLEGE_INTERESTS_TABLE.select({
        filterByFormula: `OR(${interestsAsExpressions})`
    }).firstPage();

    const filterOutInterests = (college: AirtableField) => interests.every((interest) => college !== interest)

    const colleges = records
        .map(({fields}) => Object.values(fields).filter((college) => filterOutInterests(college)))


    collegesMatchingInterests.set(flatten(colleges))
}

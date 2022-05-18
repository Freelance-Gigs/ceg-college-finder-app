import { writable } from 'svelte/store';
import {COLLEGE_DETAILS_TABLE} from "../api/airtable";
import type {AirtableField} from "../types/airtable";
import type {ProfileInfo} from "../types/profileInfo";
import {v4} from "uuid";
import states from "states-us";

export const state = writable<ProfileInfo>({});

export const STATES = states.map(({ abbreviation, name }) => ({
    id: v4(),
    value: abbreviation,
    label: `${abbreviation} - ${name}`,
}));


export const collegesMatchingState = writable<AirtableField[]>([])

export const loadCollegesMatchingState = async (state: string): Promise<void> => {
    let colleges: AirtableField[] = []

    const records = COLLEGE_DETAILS_TABLE.select({
        fields: ['University Name and State'],
        filterByFormula: `State="${state}"`
    }).eachPage(function page(records, fetchNextPage) {
        const fetched = records.map(({fields}): AirtableField => fields['University Name and State']);
        colleges = colleges.concat(fetched);
        fetchNextPage();

    }, function done(err) {
        collegesMatchingState.set(colleges);
        if (err) {
            console.error(err);
            return;
        }
    });
}

import { writable } from 'svelte/store';
import {COLLEGE_DETAILS_TABLE} from "../api/airtable";
import type {AirtableField} from "../types/airtable";

export const state = writable<String>('NY');
export const collegesMatchingState = writable<AirtableField[]>([])

export const loadCollegesMatchingState = async (state: string): Promise<void> => {
    const records = await COLLEGE_DETAILS_TABLE.select({
        fields: ['University Name and State'],
        filterByFormula: `State="${state}"`
    }).firstPage();

    const colleges = records.map(({fields}): AirtableField => fields['University Name and State'],
    )
    collegesMatchingState.set(colleges)
}

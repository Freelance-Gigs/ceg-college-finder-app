import {derived, writable} from 'svelte/store';
import {COLLEGE_DETAILS_TABLE} from "../api/airtable";
import type {AirtableField} from "../types/airtable";

interface CollegesMap {
    [name: string] : {
        [property: string]: AirtableField
    }
}

export const collegesMap = writable<CollegesMap[]>([]);

export const loadAllColleges = async () => {
    let colleges: CollegesMap[] = [];

    COLLEGE_DETAILS_TABLE.select({
        fields: ['University Name and State', 'CollegeXpress Link', 'State', 'Acceptance Rate', 'Control Type'],
    }).eachPage(function page(records, fetchNextPage) {
        const fetched = records
            .map(({fields}) => {
                const collegeName = fields['University Name and State'] as string;

                return {
                    [collegeName]: {
                        ['CollegeXpress Link']: fields['CollegeXpress Link'],
                        ['State']: fields['State'],
                        ['Acceptance Rate']: fields['Acceptance Rate'],
                        ['Control Type']: fields['Control Type'],
                    }
                };
            });
        colleges = colleges.concat(fetched)
        fetchNextPage();

    }, function done(err) {
        collegesMap.set(colleges)
        if (err) {
            console.error(err);
            return;
        }
    });
}



import {derived, writable} from 'svelte/store';
import {COLLEGE_DETAILS_TABLE} from "../api/airtable";
import type {AirtableField} from "../types/airtable";
import {collegesMatchingInterests} from "./interests";
import {collegesMatchingState, state} from "./state";
// @ts-ignore
import {frequencies} from 'underscore-contrib';
import { affordability } from './affordability';
import {gpa} from "./gpa";

interface CollegesMap {
    [name: string] : {
        [property: string]: AirtableField
    }
}

type College = {
    [name: string]: AirtableField
}

export const initialColleges = writable<College[]>([]);
export const isPending = writable<Boolean>(false)

export const loadAllColleges = async () => {
    let colleges: College[] = [];

    isPending.set(true)

    COLLEGE_DETAILS_TABLE.select({
        fields: ['University Name and State', 'CollegeXpress Link', 'State', 'Acceptance Rate', 'Control Type'],
    }).eachPage(function page(records, fetchNextPage) {
        const fetched = records
            .map(({fields}) => {

                return  {
                        name: fields['University Name and State'],
                        collegeExpressUrl: fields['CollegeXpress Link'],
                        state: fields['State'],
                        acceptance: fields['Acceptance Rate'],
                        type: fields['Control Type'],

                };
            });
        colleges = colleges.concat(fetched)
        fetchNextPage();

    }, function done(err) {
        initialColleges.set(colleges)
        isPending.set(false)
        if (err) {
            console.error(err);
            return;
        }
    });
}

export const combinedList = derived([collegesMatchingState, collegesMatchingInterests], ([$collegesMatchingState, $collegesMatchingInterests]) => {
    const combined = [...$collegesMatchingState, ...$collegesMatchingInterests]
    const frequenciesMap = frequencies(combined);

    return Object.keys(frequenciesMap).map((key) => ({
        colleges: key,
        num_of_lists: frequenciesMap[key],
    }));
})

export const collegesMap = derived([initialColleges, state, gpa, affordability],
    ([$initialColleges, $state, $gpa, $affordability]): CollegesMap => {
        isPending.set(true)


    // @ts-ignore
        return $initialColleges.reduce((previousValue,currentValue, currentIndex) => {
        const {name, type, state, acceptance = 0} = currentValue

            if(currentIndex >= 846){
                isPending.set(false)
            }

        let color: 'red' | 'yellow' | 'green'= 'yellow';

        const IsHighlySelectivePrivate = type === 'Private' && acceptance < 25
        const isLessSelectivePrivate = type === 'Private' && acceptance > 25
        const isInStatePublic = $state.value === state && type === 'Public'
        const isOutOfStatePublic = $state.value !== state && type === 'Public'

        // Awesome grades + Not Wealthy
        if ($gpa.value === 'awesome' && $affordability.value === 'not wealthy') {
            if (IsHighlySelectivePrivate || isInStatePublic)
                color = 'green'

            if (isLessSelectivePrivate)
                color = 'yellow'

            if (isOutOfStatePublic)
                color = 'red'
        }

        // Awesome grades + Wealthy
        if ($gpa.value === 'awesome' && $affordability.value === 'wealthy'){
            if (IsHighlySelectivePrivate)
                color = 'red'

            if (isLessSelectivePrivate || isInStatePublic)
                color = 'green'

            if(isOutOfStatePublic)
                color = 'yellow'
        }

        // Not Awesome Grades + Wealthy
        if ($gpa.value === 'not awesome' && $affordability.value === 'wealthy'){
            if (IsHighlySelectivePrivate || isOutOfStatePublic)
                color = 'red'

            if (isLessSelectivePrivate)
                color = 'yellow'

            if(isInStatePublic)
                color = 'green'
        }

        // Not Awesome Grades + Not Wealthy
        if ($gpa.value === 'not awesome' && $affordability.value === 'not wealthy'){
            if (IsHighlySelectivePrivate)
                color = 'green'

            if (isLessSelectivePrivate || isOutOfStatePublic)
                color = 'red'

            if (isInStatePublic)
                color = 'yellow'
        }

        return {
            ...previousValue,
            [name as string]: {
                color,
                ...currentValue
            }
        }
    }, {})
    })

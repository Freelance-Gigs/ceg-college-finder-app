import {writable} from "svelte/store";
import type {ProfileInfo} from "../types/profileInfo";


export const affordability = writable<ProfileInfo>({
    value: "wealthy",
    label: "$40K+"
});

export const FAMILY_AFFORDABILITY = [
    {
        value: 'not wealthy',
        label: '$0-$10k',
    },
    {
        value: 'not wealthy',
        label: '$10k-20K',
    },
    {
        value: 'wealthy',
        label: '$20K-$40',
    },
    {
        value: 'wealthy',
        label: '$40K+',
    },
];

import {writable} from "svelte/store";
import type {ProfileInfo} from "../types/profileInfo";


export const affordability = writable<ProfileInfo>({});

export const FAMILY_AFFORDABILITY = [
    {
        value: '$0-$10k',
        label: '$0-$10k',
    },
    {
        value: '$10k-20K',
        label: '$10k-20K',
    },
    {
        value: '$20K-$40',
        label: '$20K-$40',
    },
    {
        value: '$40K+',
        label: '$40K+',
    },
];

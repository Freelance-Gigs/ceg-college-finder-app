import {writable} from "svelte/store";
import type {ProfileInfo} from "../types/profileInfo";
import {v4} from "uuid";


export const gpa = writable<ProfileInfo>({});


export const GPA = [
    {
        id: v4(),
        value: '0.0-2.0',
        label: '0.0-2.0',
    },
    {
        id: v4(),
        value: '2.0-2.5',
        label: '2.0-2.5',
    },
    {
        id: v4(),
        value: '2.6-3.0',
        label: '2.6-3.0',
    },
    {
        id: v4(),
        value: '3.5-4.0',
        label: '3.5-4.0',
    },
    {
        id: v4(),
        value: '4.0+',
        label: '4.0+',
    },
];

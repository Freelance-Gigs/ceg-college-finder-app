import {writable} from "svelte/store";
import type {ProfileInfo} from "../types/profileInfo";
import {v4} from "uuid";


export const gpa = writable<ProfileInfo>({
    id: "a5eaeb0d-b644-4f37-919d-822566e42f13",
    value: "awesome",
    label: "3.5-4.0"
});


export const GPA = [
    {
        id: v4(),
        value: 'not awesome',
        label: '0.0-2.0',
    },
    {
        id: v4(),
        value: 'not awesome',
        label: '2.0-2.5',
    },
    {
        id: v4(),
        value: 'not awesome',
        label: '2.6-3.0',
    },
    {
        id: v4(),
        value: 'awesome',
        label: '3.5-4.0',
    },
    {
        id: v4(),
        value: 'awesome',
        label: '4.0+',
    },
];

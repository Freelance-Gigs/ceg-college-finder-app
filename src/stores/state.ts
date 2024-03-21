import { writable } from 'svelte/store';
import type {ProfileInfo} from "../types/profileInfo";
import {v4} from "uuid";
import states from "states-us/dist";

export const state = writable<ProfileInfo>({});

export const STATES = states.map(({ abbreviation, name }) => ({
    id: v4(),
    value: abbreviation,
    label: `${abbreviation} - ${name}`,
}));

import { writable } from 'svelte/store';

export const clickedElement = writable<HTMLElement>();
export const show = writable<Boolean>(false);

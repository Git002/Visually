import { writable } from 'svelte/store';

export const htmlCode = writable<string>();
export const clickedElement = writable<HTMLElement>();
export const show = writable<Boolean>(false);

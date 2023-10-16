import { writable } from 'svelte/store';

export const showPanel = writable<Boolean>(false);
export let clickedElement = writable<HTMLElement>();

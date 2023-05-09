import { writable, type Writable } from "svelte/store";

export const htmlCode: Writable<HTMLElement> = writable();
export const clickedElement: Writable<HTMLElement> = writable();

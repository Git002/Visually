import { writable } from 'svelte/store';

export let showPanelComponent = writable<Boolean>(false);

export let clickedElement = writable<HTMLElement>();
export let clickedElementStyle = writable<CSSStyleDeclaration>();

export let iFrameDocument = writable<Document>();

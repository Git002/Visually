import { writable } from 'svelte/store';

export let showPanelComponent = writable<Boolean>(false);

export let clickedElement = writable<HTMLElement>();
export let clickedElementStyle = writable<{ [key: string]: any } & CSSStyleDeclaration>();
export let currentCSSActionClass = writable<'' | 'hover' | 'active' | 'focus'>('');

export let iFrameDocument = writable<Document>();

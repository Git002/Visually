import { writable } from 'svelte/store';

export let showPanelComponent = writable<Boolean>(false);

export let clickedElement = writable<HTMLElement>();
export let clickedElementStyle = writable<{ [key: string]: any } & CSSStyleDeclaration>();
export let cssPseudoSelector = writable<'default' | ':hover' | ':active' | ':focus'>('default');

export let iFrameDocument = writable<Document>();
export let preview = writable<Boolean>(false);

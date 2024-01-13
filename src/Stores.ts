import { writable } from 'svelte/store';

export let showPanelComponent = writable<Boolean>(false);

export let clickedElement = writable<HTMLElement>();
interface CustomCSSStyleDeclaration extends CSSStyleDeclaration {
  [key: string]: any;
}
export let clickedElementStyle = writable<CustomCSSStyleDeclaration>();
export let currentCSSPseudoClass = writable<'' | 'hover' | 'active' | 'focus'>('');

export let iFrameDocument = writable<Document>();

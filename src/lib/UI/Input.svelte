<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: string = '10';
  export let Class: string = '';
  export let id: string = '';

  const dispatch = createEventDispatcher();

  interface CustomInputElement extends HTMLInputElement {
    oldValue?: string;
  }

  function blurEvent(e: Event) {
    let inputElement: CustomInputElement = e.target as HTMLInputElement;
    inputElement.oldValue = value;

    dispatch('blur', {
      target: inputElement
    });
  }

  function arrowUpDown(e: KeyboardEvent) {
    let inputElement: CustomInputElement = e.target as HTMLInputElement;

    dispatch('arrowUpDown', {
      target: inputElement,
      key: e.key
    });
  }
</script>

<input
  {id}
  class={'w-[32px] bg-[#404040] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#505050] tracking-wide ' +
    Class}
  {value}
  autocomplete="off"
  placeholder="--"
  on:blur={blurEvent}
  on:keydown|stopPropagation={(e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      arrowUpDown(e);
      blurEvent(e);
    }
    if (e.key === 'Enter') blurEvent(e);
  }}
/>

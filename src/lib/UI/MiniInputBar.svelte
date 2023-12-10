<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let FieldName: string = 'Input';
  export let value: string = 'Default';
  export let id: string = '';

  const dispatch = createEventDispatcher();

  interface CustomInputElement extends HTMLInputElement {
    oldValue?: string;
  }

  function customFunction(e: Event) {
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

<div class="flex justify-between rounded-[6px] bg-[#404040] p-[8px] gap-[10px] border-2 border-[#505050]">
  <input
    {id}
    class="w-full text-[11px] bg-[#404040] rounded-[2px] focus:outline-none focus:ring-2 font-semibold focus:ring-[#505050] tracking-wide capitalize"
    {value}
    autocomplete="off"
    placeholder="--"
    on:blur={customFunction}
    on:keydown|stopPropagation={(e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        arrowUpDown(e);
        customFunction(e);
      }
      if (e.key === 'Enter') customFunction(e);
    }}
  />
  <div class="flex w-full justify-end items-end tracking-wide font-bold uppercase">{FieldName}</div>
</div>

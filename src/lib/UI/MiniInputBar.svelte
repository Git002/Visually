<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickedElementStyle } from '../../Stores';

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

  function incrementDecrementValue(e: KeyboardEvent) {
    const input = <HTMLInputElement>e.target;
    const inputValue = parseInt(input.value);

    // if value is NaN like 'Auto', then get the computedStyle that will give its numeric value like 1020.8 and then you can increment that value up/down
    if (isNaN(inputValue)) {
      let computedValue: any = $clickedElementStyle.computedStyle[input.id as keyof CSSStyleDeclaration];
      if (computedValue) input.value = computedValue;
      return;
    }

    if (e.key === 'ArrowUp') {
      input.value = String(inputValue + 1);
    } else if (e.key === 'ArrowDown' && inputValue !== 0) {
      input.value = String(inputValue - 1);
    }
  }
</script>

<div
  class="flex justify-between rounded-[6px] bg-[#404040] p-[8px] gap-[10px] border-2 border-[#505050] h-[34px]"
>
  <input
    {id}
    class="w-full text-[11px] bg-[#404040] rounded-[2px] focus:outline-none focus:ring-2 font-bold focus:ring-[#505050] tracking-wide capitalize text-[#b8b6b6]"
    {value}
    autocomplete="off"
    spellcheck="false"
    placeholder="--"
    on:blur={customFunction}
    on:keydown|stopPropagation={(e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        incrementDecrementValue(e);
        customFunction(e);
      }
      if (e.key === 'Enter') customFunction(e);
    }}
  />
  <div class="flex w-full justify-end items-end tracking-wide font-bold uppercase">{FieldName}</div>
</div>

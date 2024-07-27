<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let FieldName: string = '';
  export let Icon: string = '';
  export let IconSize: number = 10;
  export let rotateIcon: number = 0;
  export let rowReverse: boolean = false;
  export let value: string = 'Default';
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

  function incrementDecrementValue(e: KeyboardEvent) {
    const input = <HTMLInputElement>e.target;
    const inputValue = parseInt(input.value);

    // if value is like 'Auto', then just cancel the event
    if (isNaN(inputValue)) {
      return;
    }

    if (e.key === 'ArrowUp') {
      input.value = String(inputValue + 1);
    } else if (e.key === 'ArrowDown' && inputValue !== 0) {
      input.value = String(inputValue - 1);
    }
  }

  function focusOnInput(e: Event) {
    (e.target as HTMLDivElement).querySelector('input')?.focus();
  }
</script>

<div
  class="flex justify-between rounded-[6px] bg-[#404040] p-[8px] gap-[10px] border-2 border-[#505050] h-[34px] min-w-0"
  style={rowReverse ? 'flex-direction: row-reverse' : ''}
  on:click={(e) => focusOnInput(e)}
>
  <input
    {id}
    class="min-w-0 shrink text-[11px] bg-[#404040] rounded-[2px] focus:outline-none focus:ring-2 font-semibold focus:ring-[#505050] tracking-wide capitalize text-[#b8b6b6]"
    style={rowReverse ? 'text-align: right' : ''}
    {value}
    autocomplete="off"
    spellcheck="false"
    placeholder="--"
    on:blur={blurEvent}
    on:keydown|stopPropagation={(e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        incrementDecrementValue(e);
        blurEvent(e);
      }
      if (e.key === 'Enter') blurEvent(e);
    }}
  />

  {#if Icon}
    <img
      src={Icon}
      alt=""
      width={IconSize}
      height={IconSize}
      style="transform: rotate({rotateIcon}deg); pointer-events: none;"
    />
  {:else}
    <div
      class="flex min-w-max justify-between items-center tracking-wider font-bold text-[9px] text-[#b8b8b6]/80 uppercase pointer-events-none"
    >
      {FieldName}
    </div>
  {/if}
</div>

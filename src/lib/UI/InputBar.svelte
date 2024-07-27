<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let id: string = '';
  export let Class: string = '';
  export let value: string = '';
  export let type: 'text' | 'color' = 'text';
  export let placeholder: string = 'placeholder';

  let colorInput: HTMLInputElement;

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

  function inputChangeEvent(e: Event) {
    dispatch('input', {
      target: e.target
    });
  }
</script>

{#if type === 'text'}
  <input
    {id}
    class={'w-full text-[11px] bg-[#404040] font-sans font-semibold placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] h-[34px] px-[10px] py-[7px] outline-none ' +
      Class}
    {placeholder}
    spellcheck="false"
    {value}
    on:blur={blurEvent}
    on:input={inputChangeEvent}
    on:keydown|stopPropagation={(e) => {
      if (blurEvent && e.key === 'Enter') blurEvent(e);
    }}
  />
{:else if type === 'color'}
  <div
    class={'relative flex items-center gap-[10px] w-full text-[11px] bg-[#404040] font-sans font-semibold text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] h-[34px] outline-none overflow-hidden px-[1px]' +
      Class}
  >
    <input
      type="color"
      class="absolute invisible"
      bind:this={colorInput}
      bind:value
      on:input={(e) => inputChangeEvent(e)}
    />
    <div
      class="h-[30px] w-[30px] rounded-[4px] cursor-pointer bg-black"
      style={'background-color:' + value}
      on:click={() => colorInput.click()}
    />

    <input
      {id}
      type="text"
      {value}
      on:blur={blurEvent}
      on:keydown|stopPropagation={(e) => {
        if (blurEvent && e.key === 'Enter') blurEvent(e);
      }}
      spellcheck="false"
      class="bg-[#404040] uppercase tracking-wider rounded-[2px] focus:outline-none py-[2px]"
    />
  </div>
{/if}

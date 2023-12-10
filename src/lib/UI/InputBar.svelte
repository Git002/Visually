<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let id: string = '';
  export let Class: string = '';
  export let show: boolean = true;
  export let placeholder: string = 'placeholder';

  const dispatch = createEventDispatcher();

  function customFunction(e: Event) {
    dispatch('blur', {
      target: e.target
    });
  }
</script>

<input
  {id}
  class={show
    ? 'w-full text-[11px] bg-[#404040] font-sans font-semibold placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] h-[34px] px-[10px] py-[7px] outline-none ' +
      Class
    : 'hidden'}
  {placeholder}
  spellcheck="false"
  on:blur={(e) => customFunction(e)}
  on:keydown|stopPropagation={(e) => {
    if (customFunction && e.key === 'Enter') customFunction(e);
  }}
/>

<script lang="ts">
  export let id: string = '';
  export let Class: string = '';
  export let show: boolean = true;
  export let placeholder: string = 'placeholder';
</script>

<input
  {id}
  class={show
    ? 'w-full text-[11px] bg-[#404040] font-sans font-semibold placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] px-[10px] py-[7px] outline-none ' +
      Class
    : 'hidden'}
  {placeholder}
  spellcheck="false"
/>

<style>
  .hidden {
    display: none;
  }
</style>

<script lang="ts">
  import { tick } from 'svelte';

  export let DropdownBtnText: string = 'Select';
  export let ItemsArray: string[] = ['Apple', 'Mango', 'Orange', 'Strawberry'];
  export let customFunction: (() => any) | null = null;
  let dropdownOpen = false;

  async function onDropdownClick(e: Event) {
    const clickedButton = e.target as HTMLButtonElement;
    DropdownBtnText = clickedButton.innerText;
    dropdownOpen = false;
    // if a custom function is passed then execute it after the DOM is in sync
    await tick();
    if (customFunction) {
      customFunction();
    }
  }
</script>

<div class="relative w-full">
  <button
    class="selector-btn flex justify-between flex-row rounded-[6px] bg-[#404040] py-[6px] px-[12px] border-2 border-[#505050] items-center text-center text-[12px] font-semibold text-[#b8b6b6] h-[34px] w-full"
    on:click={() => (dropdownOpen = !dropdownOpen)}
  >
    {DropdownBtnText}
    <object data="Icons/dropdown.svg" title="" style="pointer-events: none;" />
  </button>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class={dropdownOpen
      ? 'absolute w-full bg-[#404040] text-[12px] rounded-[6px] mt-[8px] font-semibold text-[#b8b6b6] overflow-hidden shadow-2xl'
      : 'hidden'}
  >
    {#each ItemsArray as item (item)}
      <div
        class="px-[16px] py-[8px] hover:bg-[#0070e7] hover:text-white"
        on:click={(e) => {
          onDropdownClick(e);
        }}
      >
        {item}
      </div>
    {/each}
  </div>
</div>

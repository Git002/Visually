<script lang="ts">
  import { tick } from 'svelte';

  export let DropdownBtnText: string = 'Select';
  export let ItemsArray: string[] = ['Apple', 'Mango', 'Orange', 'Strawberry'];
  export let customFunction: (() => any) | null = null;
  let dropdownOpen = false;

  async function onItemClick(e: Event) {
    const clickedItem = e.target as HTMLButtonElement;
    DropdownBtnText = clickedItem.innerText;
    // if a custom function is passed then execute it after the DOM is in sync
    await tick();
    if (customFunction) {
      customFunction();
    }
  }

  function dropdownClose() {
    dropdownOpen = false;
    document.body.removeEventListener('click', dropdownClose);
  }
</script>

<div class="relative text-[12px] w-full">
  <button
    class="flex justify-between flex-row rounded-[6px] bg-[#404040] py-[6px] px-[12px] border-2 border-[#505050] items-center text-center font-semibold text-[#b8b6b6] h-[34px] w-full focus:outline-0"
    on:click|stopPropagation={() => {
      dropdownOpen = !dropdownOpen;
      document.body.addEventListener('click', dropdownClose);
    }}
    on:keydown|stopPropagation={(e) => {
      if (e.key === 'Escape') {
        dropdownOpen = false;
      }
    }}
  >
    {DropdownBtnText}
    <object data="Icons/dropdown.svg" title="" style="pointer-events: none;" />
  </button>

  <div
    class={dropdownOpen
      ? 'absolute w-full bg-[#484848] rounded-[6px] mt-[10px] font-semibold text-[#b8b6b6] overflow-hidden drop-shadow-2xl z-10'
      : 'hidden'}
    on:click={(e) => {
      onItemClick(e);
    }}
  >
    {#each ItemsArray as item (item)}
      <div class="px-[16px] py-[10px] hover:bg-[#0070e7] hover:text-white">
        {item}
      </div>
    {/each}
  </div>
</div>

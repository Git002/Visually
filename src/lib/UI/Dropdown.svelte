<script lang="ts">
  import { tick } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let DropdownBtnText: string = 'Select';
  export let ItemsArray: string[] = ['Apple', 'Mango', 'Orange', 'Strawberry'];
  let dropdownOpen = false;

  const dispatch = createEventDispatcher();

  function customFunction(e: Event) {
    dispatch('click', {
      target: e.target
    });
  }

  async function onItemClick(e: Event) {
    const clickedItem = e.target as HTMLElement;
    if (clickedItem.tagName !== 'BUTTON') return;
    DropdownBtnText = clickedItem.innerText;

    await tick();
    customFunction(e);
  }

  function dropdownClose() {
    dropdownOpen = false;
    document.body.removeEventListener('click', dropdownClose);
  }
</script>

<div class="relative text-[12px] w-full">
  <!-- Dropdown Button -->
  <button
    class="flex justify-between flex-row rounded-[6px] bg-[#404040] py-[6px] px-[12px] border-2 border-[#505050] items-center text-center font-semibold tracking-wide text-[#b8b6b6] h-[34px] w-full focus:outline-0"
    on:click|stopPropagation={() => {
      dropdownOpen = !dropdownOpen;
      document.body.addEventListener('click', dropdownClose);
    }}
    on:keydown|stopPropagation={(e) => {
      if (e.key === 'Escape') dropdownOpen = false;
    }}
  >
    {DropdownBtnText}
    <object data="Icons/dropdown.svg" title="" style="pointer-events: none;" />
  </button>

  <!-- Dropdown Menu -->

  <div
    class={dropdownOpen
      ? 'absolute w-full bg-[#494949] rounded-[6px] mt-[9px] font-semibold text-[#b8b6b6] tracking-wide overflow-hidden z-10 py-[4px] shadow-[0px_70px_50px_10px_#00000024]'
      : 'hidden'}
    on:click={(e) => onItemClick(e)}
  >
    {#each ItemsArray as item (item)}
      <div class="px-[6px] py-[3px]">
        {#if item === DropdownBtnText}
          <button
            class="inline-flex w-full justify-between bg-[#cf672b] text-[#ebebeb] px-[12px] py-[6px] rounded-[6px] cursor-default"
          >
            {item}
            <img src="Icons/selected.svg" alt="" width="16" height="16" style="pointer-events: none;" />
          </button>
        {:else}
          <button
            class="inline-flex w-full justify-between hover:text-[#ebebeb] hover:bg-[#606060] px-[12px] py-[6px] rounded-[6px] cursor-default"
          >
            {item}
          </button>
        {/if}
      </div>
    {/each}
  </div>
</div>

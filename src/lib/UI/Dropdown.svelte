<script lang="ts">
  import { tick, createEventDispatcher } from 'svelte';
  import { popup } from '@skeletonlabs/skeleton';

  export let id: string;
  export let DropdownBtnText: string = 'Select';
  export let ItemsArray: string[];

  const dispatch = createEventDispatcher();

  function customFunction(e: Event) {
    dispatch('click', {
      target: e.target
    });
  }

  async function changeDropdownBtnText(e: Event) {
    const clickedItem = e.target as HTMLElement;
    if (clickedItem.tagName !== 'BUTTON') return;

    DropdownBtnText = clickedItem.innerText.toLowerCase();

    await tick();
    customFunction(e);
  }
</script>

<div class="text-[12px] w-full relative">
  <!-- Dropdown Button -->
  <button
    class="flex justify-between flex-row rounded-[6px] bg-[#404040] py-[6px] px-[12px] border-2 border-[#505050] items-center capitalize font-semibold tracking-wide text-[#b8b6b6] h-[34px] w-full focus:outline-0"
    style="top: 0px;"
    use:popup={{
      event: 'click',
      target: id,
      placement: 'bottom',
      middleware: {
        offset: 10
      }
    }}
  >
    {DropdownBtnText}
    <object data="Icons/dropdown.svg" title="" style="pointer-events: none;" />
  </button>

  <!-- Dropdown Menu -->
  <div
    class="absolute hidden w-full bg-[#494949] rounded-[6px] font-semibold text-[#b8b6b6] tracking-wide overflow-hidden z-50 py-[4px] shadow-[0px_70px_50px_10px_#00000024]"
    data-popup={id}
    on:click={(e) => changeDropdownBtnText(e)}
  >
    {#each ItemsArray as item (item)}
      <div class="px-[6px] py-[3px]">
        {#if item.toLowerCase() === DropdownBtnText.toLowerCase()}
          <button
            class="inline-flex w-full justify-between bg-[#cf672b] text-[#ebebeb] text-left capitalize px-[12px] py-[6px] rounded-[6px] cursor-default"
          >
            {item}
            <img src="Icons/selected.svg" alt="" width="16" height="16" style="pointer-events: none;" />
          </button>
        {:else}
          <button
            class="inline-flex w-full justify-between hover:text-[#ebebeb] text-left capitalize hover:bg-[#606060] px-[12px] py-[6px] rounded-[6px] cursor-default"
          >
            {item}
          </button>
        {/if}
      </div>
    {/each}
  </div>
</div>

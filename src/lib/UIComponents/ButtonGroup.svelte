<script lang="ts">
  import { tick } from 'svelte';

  export let ItemsArray = ['Apple', 'Mango'];
  export let IdArray = ['apple_id', 'mango_id'];
  export let customFunction: (() => any) | null = null;
  let activeId: string = IdArray[0];

  // change color of the active button in the button group
  async function changeColor(e: Event) {
    let clickedItem = e.target as HTMLElement;
    if (IdArray.includes(clickedItem.id)) {
      activeId = clickedItem.id;
      // if a custom function is passed then execute it after the DOM is in sync
      await tick();
      if (customFunction) {
        customFunction();
      }
    }
    e.stopPropagation();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex justify-between rounded-[6px] bg-[#404040] border-2 border-[#505050] text-[12px] font-sans font-bold tracking-widest h-[34px]"
  on:click={(e) => {
    changeColor(e);
  }}
>
  {#each ItemsArray as item, i}
    {#if activeId === IdArray[i]}
      <button
        type="button"
        id={IdArray[i]}
        class="py-[6px] px-[10px] rounded-[5px] bg-[#2e2f31] text-[#b8b6b6]"
      >
        {@html item}
      </button>
    {:else}
      <button
        type="button"
        id={IdArray[i]}
        class="py-[6px] px-[10px] rounded-[5px] bg-[#404040] text-[#b8b6b6]"
      >
        {@html item}
      </button>
    {/if}
  {/each}
</div>

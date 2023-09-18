<script lang="ts">
  export let IconsArray = ['Icon1', 'Icon2'];
  export let IdArray = ['apple', 'mango'];

  let activeId: string = IdArray[0];

  function changeColor(e: Event) {
    let parent = e.currentTarget as HTMLDivElement;
    let clickedElem = e.target as HTMLElement;
    // case to handle clicks on elements border
    if (parent.contains(clickedElem) && parent != clickedElem) {
      activeId = clickedElem.id;
    }
    e.stopPropagation();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex justify-between rounded-[6px] bg-[#404040] border-2 border-[#505050] text-[12px] font-sans font-bold tracking-widest gap-[2px]"
  on:click={(e) => {
    changeColor(e);
  }}
>
  {#each IconsArray as item, i}
    {#if activeId === IdArray[i]}
      <button
        type="button"
        id={IdArray[i]}
        class="py-[6px] px-[12px] rounded-[5px] bg-[#2e2f31] text-[#b8b6b6]"
      >
        {@html item}
      </button>
    {:else}
      <button
        type="button"
        id={IdArray[i]}
        class="py-[6px] px-[12px] rounded-[5px] bg-[#404040] text-[#b8b6b6]"
      >
        {@html item}
      </button>
    {/if}
  {/each}
</div>

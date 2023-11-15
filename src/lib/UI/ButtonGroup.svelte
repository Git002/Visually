<script lang="ts">
  export let Items = ['Apple', 'Mango'];
  export let IdArray = ['apple_id', 'mango_id'];
  export let activeElementId: string = IdArray[0];

  function changeColor(e: Event) {
    let currentClickedItemId = (e.target as HTMLElement).id;
    if (IdArray.includes(currentClickedItemId)) {
      activeElementId = currentClickedItemId;
    }
  }
</script>

<div
  class="flex justify-between rounded-[6px] bg-[#404040] border-2 border-[#505050] text-[12px] font-sans font-bold tracking-widest h-[34px]"
  on:click={(e) => {
    changeColor(e);
  }}
  on:click
>
  {#each Items as item, i}
    {#if activeElementId === IdArray[i]}
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

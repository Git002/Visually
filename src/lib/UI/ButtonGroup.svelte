<script lang="ts">
  export let Items: string[] = ['Apple', 'Mango'];
  export let ButtonIds: string[] = ['apple_id', 'mango_id'];
  export let activeButtonId: string = ButtonIds[0];
  export let deactiveButtonIds: string[] = [''];

  function changeColor(e: Event) {
    let currentClickedItemId = (e.target as HTMLElement).id;
    if (ButtonIds.includes(currentClickedItemId)) {
      activeButtonId = currentClickedItemId;
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
    {#if activeButtonId === ButtonIds[i]}
      <button
        type="button"
        id={ButtonIds[i]}
        class="py-[6px] px-[10px] rounded-[5px] bg-[#2e2f31] text-[#b8b6b6]"
      >
        {@html item}
      </button>
    {:else if deactiveButtonIds.includes(ButtonIds[i])}
      <button
        type="button"
        id={ButtonIds[i]}
        class="py-[6px] px-[10px] rounded-[5px] bg-[#404040] text-[#b8b6b6] pointer-events-none opacity-40"
      >
        {@html item}
      </button>
    {:else}
      <button
        type="button"
        id={ButtonIds[i]}
        class="py-[6px] px-[10px] rounded-[5px] bg-[#404040] text-[#b8b6b6]"
      >
        {@html item}
      </button>
    {/if}
  {/each}
</div>

<script lang="ts">
  import { tick, createEventDispatcher } from 'svelte';

  export let Items: { text: string; iconPath: string }[];
  export let IconSize: number = 15;
  export let ButtonIds: string[];
  export let activeButtonId: string = ButtonIds[0];
  export let deactiveButtonIds: string[] = [''];
  export let flexGrow: boolean = false;

  const dispatch = createEventDispatcher();

  function customFunction(e: Event) {
    dispatch('click', {
      target: e.target
    });
  }

  async function changeButtonColor(e: Event) {
    let currentClickedItemId = (e.target as HTMLElement).id;
    if (!ButtonIds.includes(currentClickedItemId)) return;

    activeButtonId = currentClickedItemId;
    await tick();
    customFunction(e);
  }
</script>

<div
  class="flex justify-between rounded-[6px] bg-[#404040] border-2 border-[#505050] text-[12px] font-semibold tracking-widest h-[34px] shrink-0"
  style={flexGrow ? 'flex-grow: 1;' : ''}
  on:click={(e) => {
    changeButtonColor(e);
  }}
>
  {#each Items as item, i}
    <button
      type="button"
      id={ButtonIds[i]}
      class="px-[10px] rounded-[5px] text-[#b8b6b6]"
      style={activeButtonId === ButtonIds[i]
        ? 'background-color: #2e2f31; pointer-events: none'
        : deactiveButtonIds.includes(ButtonIds[i])
        ? 'background-color: #404040; opacity: 0.4'
        : 'background-color: #404040'}
    >
      {#if item.iconPath}
        <img width={IconSize} height={IconSize} alt="" style="pointer-events: none;" src={item.iconPath} />
      {/if}
      {#if item.text}
        {item.text}
      {/if}
    </button>
  {/each}
</div>

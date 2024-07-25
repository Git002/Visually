<script lang="ts">
  import { tick, createEventDispatcher } from 'svelte';
  import { popup } from '@skeletonlabs/skeleton';

  export let Items: { text: string; popupText?: string; iconPath: string }[];
  export let IconSize: number = 15;
  export let ButtonIds: string[];
  export let activeButtonId: string = ButtonIds[0];
  export let deactiveButtonIds: string[] = [''];
  export let flexGrow: boolean = false;
  export let border: boolean = true;
  export let popupAlignment: 'top' | 'bottom' | 'left' | 'right' = 'top';

  const dispatch = createEventDispatcher();

  function handleClick(e: Event) {
    dispatch('click', {
      target: e.target
    });
  }

  async function changeButtonColor(e: Event) {
    let currentClickedItemId = (e.target as HTMLElement).id;
    if (!ButtonIds.includes(currentClickedItemId)) return;

    activeButtonId = currentClickedItemId;
    await tick();
    handleClick(e);
  }
</script>

<div
  class={`flex justify-between rounded-[6px] bg-[#404040] ${
    border ? 'border-2 border-[#505050]' : ''
  } text-[12px] font-semibold h-[34px] shrink-0`}
  style={flexGrow ? 'flex-grow: 1;' : ''}
  on:click={(e) => {
    changeButtonColor(e);
  }}
>
  {#each Items as item, i}
    <button
      type="button"
      id={ButtonIds[i]}
      class="px-[10px] rounded-[5px] text-[#b8b6b6] [&>*]:pointer-events-none"
      style={activeButtonId === ButtonIds[i]
        ? 'background-color: #2e2f31; pointer-events: none'
        : deactiveButtonIds.includes(ButtonIds[i])
          ? 'background-color: #404040; opacity: 0.4'
          : 'background-color: #404040'}
      use:popup={{
        event: 'hover',
        target: 'popupHover-' + ButtonIds[i],
        placement: popupAlignment
      }}
    >
      {#if item.iconPath}
        <img width={IconSize} height={IconSize} alt="" style="pointer-events: none;" src={item.iconPath} />
      {/if}
      {#if item.text}
        {item.text}
      {/if}
    </button>

    <!-- Popup -->
    {#if item.popupText}
      <div
        class="bg-[#272727] text-gray-300/90 py-[7px] px-[12px] rounded-md text-[12px] font-medium absolute z-50 hidden"
        data-popup={'popupHover-' + ButtonIds[i]}
      >
        {item.popupText}
      </div>
    {/if}
  {/each}
</div>

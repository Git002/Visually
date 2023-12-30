<script lang="ts">
  export let ItemName: string;
  export let Icon: string = '';
  export let Expand: boolean = true;
  export let Align: 'start' | 'end' = 'end';
  export let Border: boolean = true;
  export let Class: string | null = null;
  export let style: string = '';
  export let draggable: boolean = false;

  function accordianToggle(e: Event) {
    let clickedElem = e.target as HTMLElement;

    let arrowDownBtn: HTMLImageElement;
    arrowDownBtn = clickedElem.children[0] as HTMLImageElement;

    Expand = !Expand;

    if (Expand) arrowDownBtn.style.transform = 'rotate(360deg)';
    else arrowDownBtn.style.transform = 'rotate(-90deg)';
  }
</script>

{#if Align === 'end'}
  <div
    data-header
    class={Class
      ? Class
      : 'flex justify-between px-[12px] pt-[12px] gap-[6px] text-[#d2d2d2] text-[13px] w-full font-bold text-center tracking-wide'}
    {style}
    {draggable}
  >
    <div class="flex gap-[8px]">
      {#if Icon}
        <img src={Icon} alt="" style="pointer-events: none;" width="15" />
      {/if}
      {ItemName}
    </div>

    <div class="flex cursor-pointer" on:click={accordianToggle}>
      <img
        src="Icons/caret-down.svg"
        alt=""
        style={Expand ? 'pointer-events: none;' : 'pointer-events: none; transform: rotate(-90deg);'}
        width="10"
        height="10"
      />
    </div>
  </div>
{:else}
  <div
    data-header
    class={Class
      ? Class
      : 'flex px-[12px] pt-[12px] gap-[6px] text-[#d2d2d2] text-[13px] w-full font-bold text-center tracking-wide'}
    {style}
    {draggable}
  >
    <div class="flex" on:click={accordianToggle}>
      <img
        src="Icons/caret-down.svg"
        alt=""
        style={Expand ? 'pointer-events: none;' : 'pointer-events: none; transform: rotate(-90deg);'}
        width="10"
        height="10"
      />
    </div>

    <div class="flex gap-[8px] pointer-events-none">
      {#if Icon}
        <img src={Icon} alt="" style="pointer-events: none;" width="15" />
      {/if}
      {ItemName}
    </div>
  </div>
{/if}

{#if Expand}
  <slot />
{/if}

{#if Border}
  <div class="border-t border-[#252527] mt-[14px] w-full" />
{/if}

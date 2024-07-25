<script lang="ts">
  export let ItemName: string;
  export let Icon: string = '';
  export let Expand: boolean = true;
  export let Border: boolean = true;

  function accordianToggle(e: Event) {
    let arrowDownBtn = e.target as HTMLImageElement;
    if (!arrowDownBtn.hasAttribute('data-caret-down')) return;
    Expand = !Expand;
  }
</script>

<div
  data-header
  class="flex justify-between px-[12px] pt-[13px] gap-[6px] text-[#d2d2d2] text-[13px] w-full font-medium text-center tracking-wide"
  on:click={accordianToggle}
>
  <div class="flex gap-[8px]">
    {#if Icon}
      <img src={Icon} alt="" style="cursor: pointer; pointer-events: none;" width="15" />
    {/if}
    {ItemName}
  </div>

  <img
    data-caret-down
    src="Icons/caret-down.svg"
    alt=""
    style={Expand ? 'transform: rotate(360deg);' : 'transform: rotate(-90deg);'}
    width="10"
    height="10"
  />
</div>

<div class={Expand ? 'pt-[14px] px-[12px]' : 'hidden'}>
  <slot />
</div>

{#if Border}
  <div class="border-t border-[#252527] mt-[14px] w-full" />
{/if}

<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte';

  type AccordianComponentTyped = {
    [title: string]: ComponentType<SvelteComponent>;
  };

  export let componentsArray: AccordianComponentTyped;

  function accordianToggle(e: Event) {
    if ((e.target as HTMLElement).hasAttribute('data-accordian-header') === false) return;

    let panel = (e.target as HTMLElement).nextElementSibling as HTMLElement;
    let arrowDownBtn = (e.target as HTMLElement).children[0] as HTMLObjectElement;

    if (panel.style.display && panel.style.display !== 'none') {
      arrowDownBtn.style.transform = 'rotate(-90deg)';
      panel.style.display = 'none';
    } else {
      arrowDownBtn.style.transform = 'rotate(360deg)';
      panel.style.display = 'flex';
    }
  }
</script>

<div on:click={accordianToggle}>
  {#each Object.entries(componentsArray) as [key]}
    <div
      data-accordian-header
      class="flex justify-between px-[14px] py-[14px] text-[#d2d2d2] cursor-pointer w-full text-[13px] font-bold text-center tracking-wide"
    >
      {key}
      <object data="Icons/caret-down.svg" title="" style="pointer-events: none;" />
    </div>
    <div class="flex flex-col gap-[12px] pb-[14px] px-[14px]" style="display: flex;">
      <svelte:component this={componentsArray[key]} />
    </div>

    <div class="border-t border-[#252527] w-full" />
  {/each}
</div>

<style>
</style>

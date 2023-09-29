<script lang="ts">
  import type { ComponentType, SvelteComponentTyped } from 'svelte';

  type AccordianComponentTyped = {
    [title: string]: ComponentType<SvelteComponentTyped>;
  };
  export let componentsArray: AccordianComponentTyped;

  function accordianToggle(e: Event) {
    let panel = (e.target as HTMLElement).nextElementSibling as HTMLElement;
    let arrowDownBtn = (e.target as HTMLElement).firstChild as HTMLObjectElement;

    if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
      arrowDownBtn.style.transform = 'rotate(-90deg)';
      panel.style.maxHeight = '0';
    } else {
      arrowDownBtn.style.transform = 'rotate(360deg)';
      panel.style.maxHeight = '100%';
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#each Object.entries(componentsArray) as [key]}
  <div
    class="flex gap-[8px] px-[9px] text-gray-300 cursor-pointer w-full text-[13px] font-bold text-center tracking-wide;"
    on:click={accordianToggle}
  >
    <object data="Icons/caret-down.svg" title="" style="pointer-events: none;" />
    {key}
  </div>
  <div class="pl-[24px] overflow-hidden" style="max-height: 100%;">
    <svelte:component this={componentsArray[key]} />
  </div>
{/each}

<style>
</style>

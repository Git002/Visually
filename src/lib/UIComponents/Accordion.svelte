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
    class="accordion flex gap-[10px] px-[12px] text-gray-300 cursor-pointer w-full text-[13px] font-bold text-center tracking-wide;"
    on:click={accordianToggle}
  >
    <object data="Icons/caret-down.svg" title="" style="pointer-events: none;" />
    {key}
  </div>
  <div class="panel p-0 px-6 overflow-hidden" style="max-height: 100%; overflow: hidden;">
    <svelte:component this={componentsArray[key]} />
  </div>
{/each}

<style>
</style>

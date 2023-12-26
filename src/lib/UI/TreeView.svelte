<script lang="ts">
  import Accordion from '$lib/UI/Accordion.svelte';

  export let element: HTMLElement;
  export let basePaddingLeft: number = 0;
  export let Expand: boolean = false;

  let tagInfo: { [key: string]: { name: string; icon: string } } = {
    BODY: { name: 'Body', icon: './Icons/NavigatorPanel/window.svg' },
    DIV: { name: 'Div', icon: './Icons/NavigatorPanel/square.svg' },
    H1: { name: 'Heading', icon: './Icons/NavigatorPanel/heading.svg' },
    P: { name: 'Pragraph', icon: './Icons/NavigatorPanel/paragraph.svg' },
    IMG: { name: 'Image', icon: './Icons/NavigatorPanel/image.svg' },
    BUTTON: { name: 'Button', icon: './Icons/NavigatorPanel/button.svg' },
    INPUT: { name: 'Input', icon: './Icons/NavigatorPanel/input.svg' }
  };
</script>

{#if element.children.length > 0}
  <Accordion
    ItemName={element.tagName.toLowerCase()}
    Icon={tagInfo[element.tagName].icon}
    Align="start"
    Border={false}
    {Expand}
    draggable={true}
    Class={'flex py-[6px] gap-[10px] text-[#B8B6B6] text-[12px] cursor-pointer w-full font-bold text-center tracking-wide border-y-2 border-[#2E2F31] hover:bg-[#353638] hover:border-[#353638] capitalize'}
    style="padding-left: {basePaddingLeft}px;"
  >
    {#each Object.entries(element.children) as [key, value] (key)}
      <svelte:self element={value} basePaddingLeft={basePaddingLeft + 20} />
    {/each}
  </Accordion>
{:else if element.tagName === 'BODY'}
  <div
    class="flex gap-[9px] py-[6px] text-[#B8B6B6] text-[12px] text-start cursor-pointer w-full font-bold tracking-wide border-y-2 border-[#2E2F31] hover:bg-[#353638] hover:border-[#353638] capitalize"
    style="padding-left: {basePaddingLeft}px;"
  >
    <img src={tagInfo[element.tagName].icon} alt="" style="pointer-events: none;" width="14" />
    {tagInfo[element.tagName].name}
  </div>
{:else}
  <div
    class="flex gap-[8px] py-[6px] text-[#B8B6B6] text-[12px] text-start cursor-pointer w-full font-bold tracking-wide border-y-2 border-[#2E2F31] hover:bg-[#353638] hover:border-[#353638] capitalize"
    draggable="true"
    style="padding-left: {basePaddingLeft}px;"
  >
    <img src={tagInfo[element.tagName].icon} alt="" style="pointer-events: none; width:14px" />
    {tagInfo[element.tagName].name}
  </div>
{/if}

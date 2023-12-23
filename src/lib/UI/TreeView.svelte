<script lang="ts">
  import Accordion from '$lib/UI/Accordion.svelte';

  export let element: HTMLElement;
  export let basePaddingLeft: number = 0;
  export let childPaddingLeft: number = 0;
  export let leafNodePaddingLeft: number = 0;
  export let Expand: boolean = false;

  let depth: number = 0;

  let tagToIcon: { [key: string]: { name: string; path: string } } = {
    BODY: { name: 'Body', path: './Icons/NavigatorPanel/window.svg' },
    DIV: { name: 'Div', path: './Icons/NavigatorPanel/square.svg' },
    H1: { name: 'Heading', path: './Icons/NavigatorPanel/heading.svg' },
    P: { name: 'Pragraph', path: './Icons/NavigatorPanel/paragraph.svg' },
    IMG: { name: 'Image', path: './Icons/NavigatorPanel/image.svg' }
  };
</script>

{#if element.children.length > 0}
  <Accordion
    ItemName={element.tagName.toLowerCase()}
    Icon={tagToIcon[element.tagName].path}
    Align="start"
    Border={false}
    {Expand}
    Class={'flex py-[6px] gap-[12px] mb-[2px] text-[#B8B6B6] text-[12px] cursor-pointer w-full font-bold text-center tracking-wide hover:bg-[#353638] capitalize'}
    style="padding-left: {basePaddingLeft}px;"
  >
    {#each Object.entries(element.children) as [key, value] (key)}
      <svelte:self
        element={value}
        basePaddingLeft={basePaddingLeft + childPaddingLeft}
        {childPaddingLeft}
        {leafNodePaddingLeft}
      />
    {/each}
  </Accordion>
{:else if element.tagName === 'BODY'}
  <div
    class="flex gap-[9px] py-[6px] mb-[2px] text-[#B8B6B6] text-[12px] text-start cursor-pointer w-full font-bold tracking-wide hover:bg-[#353638] capitalize"
    style="padding-left: {basePaddingLeft}px;"
  >
    <img src={tagToIcon[element.tagName].path} alt="" style="pointer-events: none; width:14px" />
    {tagToIcon[element.tagName].name}
  </div>
{:else}
  <div
    class="flex gap-[9px] py-[6px] mb-[2px] text-[#B8B6B6] text-[12px] text-start cursor-pointer w-full font-bold tracking-wide hover:bg-[#353638] capitalize"
    style="padding-left: {basePaddingLeft + leafNodePaddingLeft}px;"
  >
    <img src={tagToIcon[element.tagName].path} alt="" style="pointer-events: none; width:14px" />
    {tagToIcon[element.tagName].name}
  </div>
{/if}

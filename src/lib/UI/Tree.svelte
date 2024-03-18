<script lang="ts">
  import TreeView from './TreeView.svelte';

  export let element: HTMLElement;
  export let basePaddingLeft: number = 0;
  export let draggable: boolean = false;
  export let Expand: boolean = false;
  export let tagInfo: { [key: string]: { name: string; icon: string } };
</script>

{#if element.children.length > 0}
  <TreeView
    ItemName={element.tagName.toLowerCase()}
    Icon={tagInfo[element.tagName].icon}
    {Expand}
    {draggable}
    style="padding-left: {basePaddingLeft}px;"
  >
    {#each Object.entries(element.children) as [key, value] (key)}
      <svelte:self element={value} basePaddingLeft={basePaddingLeft + 20} {tagInfo} draggable={true} />
    {/each}
  </TreeView>
{:else if element.tagName === 'BODY'}
  <div
    class="flex gap-[9px] py-[5px] text-[#B8B6B6] text-[12px] text-start cursor-pointer w-full font-semibold tracking-wide border-y-2 border-[#2E2F31] hover:bg-[#353638] hover:border-[#353638] capitalize"
    style="padding-left: {basePaddingLeft}px;"
  >
    <img src={tagInfo[element.tagName].icon} alt="" style="pointer-events: none;" width="14" />
    {tagInfo[element.tagName].name}
  </div>
{:else}
  <div
    data-header
    class="flex gap-[11px] py-[5px] text-[#B8B6B6] text-[12px] text-start cursor-pointer w-full font-semibold tracking-wide border-y-2 border-[#2E2F31] hover:bg-[#353638] hover:border-[#353638] capitalize"
    draggable="true"
    style="padding-left: {basePaddingLeft}px;"
  >
    <img src={tagInfo[element.tagName].icon} alt="" style="pointer-events: none; width:14px" />
    {tagInfo[element.tagName].name}
  </div>
{/if}

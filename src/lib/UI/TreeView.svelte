<script lang="ts">
  import { draggedNode } from '$lib/PanelComponents/NavigatorPanel.svelte';

  export let Expand: boolean = false;
  export let style: string | null;
  export let Icon: string | null;
  export let ItemName: string;
  export let draggable: boolean = false;

  function treeToggle(e: Event) {
    let arrowDownBtn = e.target as HTMLImageElement;
    if (!arrowDownBtn.hasAttribute('data-caret-down')) return;
    Expand = !Expand;
  }

  function ExpandContent(e: DragEvent) {
    let elem = e.target as HTMLElement;
    if (elem !== draggedNode && elem.parentElement !== draggedNode && elem.hasAttribute('data-caret-down')) {
      Expand = true;
    }
  }
</script>

<div
  data-header
  class="flex py-[5px] gap-[10px] border-y-2 border-[#2E2F31] hover:bg-[#353638] hover:border-[#353638] capitalize"
  {style}
  {draggable}
  on:click={treeToggle}
  on:drag={() => (Expand = false)}
  on:dragover={ExpandContent}
>
  <img
    data-caret-down
    src="Icons/caret-down.svg"
    alt=""
    style={Expand ? 'transform: rotate(360deg);' : 'transform: rotate(-90deg);'}
    width="10"
    height="10"
  />

  {#if Icon}
    <img src={Icon} alt="" style="pointer-events: none;" width="15" />
  {/if}
  {ItemName}
</div>

<div data-children class={Expand ? 'w-full' : 'hidden'} data-expanded={Expand}>
  <slot />
</div>

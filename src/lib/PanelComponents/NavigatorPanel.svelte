<script lang="ts">
  import TreeView from '$lib/UI/TreeView.svelte';
  import { onMount } from 'svelte';
  import { iFrameDocument } from '../../Stores';

  onMount(() => {
    let navPanel = <HTMLDivElement>document.getElementById('navigator-tree-view');
    let draggedElement: HTMLElement;

    navPanel.addEventListener('dragstart', (e: DragEvent) => {
      draggedElement = e.target as HTMLElement;

      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);
    });

    navPanel.addEventListener('dragover', (e: DragEvent) => {
      let elem = e.target as HTMLElement;
      let elemRect = elem.getBoundingClientRect();

      let defaultBorderStyle: string;

      if (elem === draggedElement) {
        defaultBorderStyle = '2px solid #353638';
      } else {
        defaultBorderStyle = '2px solid #2E2F31';
      }

      let cursorPos = (e as MouseEvent).pageY - elemRect.top;

      if (cursorPos < elemRect.height / 2) {
        elem.style.borderTop = '2px solid #007bfb';
        elem.style.borderBottom = defaultBorderStyle;
      } else {
        elem.style.borderTop = defaultBorderStyle;
        elem.style.borderBottom = '2px solid #007bfb';
      }
    });

    navPanel.addEventListener('dragleave', (e: DragEvent) => {
      let elem = e.target as HTMLElement;
      elem.style.borderTop = '';
      elem.style.borderBottom = '';
    });

    navPanel.addEventListener('drop', (e: DragEvent) => {
      let elem = e.target as HTMLElement;
      elem.style.borderTop = '';
      elem.style.borderBottom = '';
    });
  });
</script>

<div class="font-sans px-[20px] text-[10px] mb-[14px] font-semibold tracking-wider text-[#ded9d9]">
  NAVIGATOR
</div>

<div id="navigator-tree-view">
  {#if $iFrameDocument}
    <TreeView element={$iFrameDocument?.body} Expand={true} basePaddingLeft={20} />
  {/if}
</div>

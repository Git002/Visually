<script lang="ts" context="module">
  export let draggedNode: HTMLDivElement;
</script>

<script lang="ts">
  import Tree from '$lib/UI/Tree.svelte';
  import { onMount } from 'svelte';
  import { iFrameDocument } from '../../Stores';

  let tagInfo: { [key: string]: { name: string; icon: string } } = {
    BODY: { name: 'Body', icon: './Icons/NavigatorPanel/window.svg' },
    DIV: { name: 'Div', icon: './Icons/NavigatorPanel/square.svg' },
    H1: { name: 'Heading', icon: './Icons/NavigatorPanel/heading.svg' },
    P: { name: 'Pragraph', icon: './Icons/NavigatorPanel/paragraph.svg' },
    IMG: { name: 'Image', icon: './Icons/NavigatorPanel/image.svg' },
    BUTTON: { name: 'Button', icon: './Icons/NavigatorPanel/button.svg' },
    INPUT: { name: 'Input', icon: './Icons/NavigatorPanel/input.svg' }
  };

  /**
   * Returns the position at which the given node is at.
   */
  function getNodesPosition(currentNode: HTMLElement) {
    let result = [];

    let parentNode: HTMLElement;
    let currentNodeIndex: number;

    while (currentNode.textContent?.trim() !== 'body') {
      parentNode = currentNode.parentElement as HTMLElement;
      currentNodeIndex = Array.from(parentNode.children)
        .filter((element) => element.hasAttribute('data-header'))
        .indexOf(currentNode);
      result.push(currentNodeIndex);
      currentNode = parentNode.previousElementSibling as HTMLElement;
    }

    result.push(0);
    return result.reverse();
  }

  /**
   * Fetch the original element from iFrame based on the position provided.
   * For example giving position=[0] will return <body>
   */
  function getElementByPosition(position: number[]): HTMLElement {
    let node = $iFrameDocument.body as HTMLElement;
    if (position.length > 1) {
      position.slice(1).forEach((index) => {
        node = node.children[index] as HTMLElement;
      });
    }
    return node;
  }

  onMount(() => {
    let navPanel = <HTMLDivElement>document.getElementById('navigator-tree-view');
    let clickedElement: HTMLElement;

    navPanel.addEventListener('click', (e: Event) => {
      let clickedNode = e.target as HTMLElement;
      if (!clickedNode.hasAttribute('data-header')) return;

      clickedElement = getElementByPosition(getNodesPosition(clickedNode));
      clickedElement.click();
    });

    navPanel.addEventListener('keydown', (e: KeyboardEvent) => {
      if (['Delete', 'Backspace'].includes(e.key) && clickedElement.tagName !== 'BODY') {
        const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
        $iFrameDocument.dispatchEvent(backspaceEvent);
      }
    });

    let draggedElement: HTMLElement;

    let insertPosition: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
    const INSIDE_AT_START = 'afterbegin';
    const INSIDE_AT_BOTTOM = 'beforeend';
    const ABOVE = 'beforebegin';
    const BELOW = 'afterend';

    navPanel.addEventListener('dragstart', (e: DragEvent) => {
      draggedNode = e.target as HTMLDivElement;
      draggedNode.style.opacity = '50%';

      draggedElement = getElementByPosition(getNodesPosition(draggedNode));

      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);
    });

    navPanel.addEventListener('dragover', (e: DragEvent) => {
      let elem = e.target as HTMLDivElement;
      let elemRect = elem.getBoundingClientRect();

      if (elem.textContent?.trim() === 'body') return;

      /* The draggedNode will be having a bg-color of #353638 as it's on hovered state while rest of the nodes will be #2E2F31. That's why border styles needs to be set depending upon the state of the nodes */
      let defaultBorderStyle: string;
      if (elem === draggedNode) defaultBorderStyle = '2px solid #353638'; //lighter
      else defaultBorderStyle = '2px solid #2E2F31'; //darker

      let cursorPos = (e as MouseEvent).pageY - elemRect.top;

      if (elem.hasAttribute('data-caret-down')) elem = elem.parentElement as HTMLDivElement;

      if (cursorPos < elemRect.height / 2) {
        elem.style.borderTop = '2px solid #007bfb';
        elem.style.borderBottom = defaultBorderStyle;
        insertPosition = ABOVE;
      } else {
        elem.style.borderTop = defaultBorderStyle;
        elem.style.borderBottom = '2px solid #007bfb';
        insertPosition = BELOW;
      }
    });

    navPanel.addEventListener('dragleave', (e: DragEvent) => {
      let elem = e.target as HTMLDivElement;
      elem.style.borderTop = '';
      elem.style.borderBottom = '';
    });

    navPanel.addEventListener('drop', (e: DragEvent) => {
      let targetNode = e.target as HTMLDivElement;

      if (targetNode.textContent?.trim() === 'body') return;

      if (targetNode.hasAttribute('data-caret-down')) targetNode = targetNode.parentElement as HTMLDivElement;

      targetNode.style.borderTop = '';
      targetNode.style.borderBottom = '';

      let targetElement = getElementByPosition(getNodesPosition(targetNode));
      targetElement.insertAdjacentHTML(insertPosition, draggedElement.outerHTML);

      draggedElement.remove();

      // passing event so that it would trigger a re-render of this component [will fix this way later]
      const dropEvent = new DragEvent('drop');
      $iFrameDocument.dispatchEvent(dropEvent);
    });

    navPanel.addEventListener('dragend', () => (draggedNode.style.opacity = ''));
  });
</script>

<div class="font-sans px-[20px] text-[10px] mb-[14px] font-semibold tracking-wider text-[#ded9d9]">
  NAVIGATOR
</div>

<div
  id="navigator-tree-view"
  class="flex-col text-[#B8B6B6] text-[12px] cursor-pointer w-full font-bold text-center tracking-wide focus:outline-none"
  tabindex="-1"
>
  {#if $iFrameDocument}
    <div class="flex-col w-full">
      <Tree element={$iFrameDocument?.body} Expand={true} basePaddingLeft={20} {tagInfo} />
    </div>
  {/if}
</div>

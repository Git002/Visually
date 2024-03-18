<script lang="ts" context="module">
  export let draggedNode: HTMLDivElement;
</script>

<script lang="ts">
  import Tree from '$lib/UI/Tree.svelte';
  import { onMount, tick } from 'svelte';
  import { clickedElement, iFrameDocument } from '../../Stores';

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
   * Returns the position at which the given node is at in the nav-tree.
   */
  function getNodesPosition(currentNode: HTMLElement): number[] {
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

  function getElementsPosition(element: HTMLElement): number[] {
    let result = [];
    let parentElement: HTMLElement;
    let elementIndex: number;

    while (element.tagName !== 'BODY') {
      parentElement = element.parentElement as HTMLElement;
      elementIndex = Array.from(parentElement.children).indexOf(element);
      result.push(elementIndex);
      element = parentElement;
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

  async function getNodeByPosition(position: number[]): Promise<HTMLElement> {
    await tick();
    let node = (document.getElementById('navigator-tree-view') as HTMLElement)
      .firstElementChild as HTMLElement;

    if (position.length > 1) {
      for (const index of position.slice(1)) {
        let childContainer = node.nextElementSibling as HTMLElement;
        if (childContainer.getAttribute('data-expanded') === 'false') {
          (node.firstElementChild as HTMLImageElement).click();
        }
        node = Array.from(childContainer.children)
          .filter((elem) => elem.hasAttribute('data-header'))
          .at(index) as HTMLElement;
      }
    }
    return node;
  }

  let prevActiveNode: HTMLElement;
  let activeNode: HTMLElement;

  async function toggleActiveNode() {
    activeNode = await getNodeByPosition(getElementsPosition($clickedElement));

    if (prevActiveNode) prevActiveNode.classList.remove('active-node');
    activeNode.classList.add('active-node');

    prevActiveNode = activeNode;
  }

  $: if ($clickedElement) {
    toggleActiveNode();
  }

  onMount(() => {
    let navPanel = <HTMLDivElement>document.getElementById('navigator-tree-view');
    let clickedElement: HTMLElement;

    navPanel.addEventListener('click', (e: Event) => {
      let clickedNode = e.target as HTMLElement;
      if (!clickedNode.hasAttribute('data-header')) return;

      clickedElement = getElementByPosition(getNodesPosition(clickedNode));
      clickedElement.click();

      (<HTMLIFrameElement>document.getElementById('frame')).contentWindow?.focus();
    });

    navPanel.addEventListener('keydown', (e: KeyboardEvent) => {
      if (['Delete', 'Backspace'].includes(e.key) && clickedElement.tagName !== 'BODY') {
        const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
        $iFrameDocument.dispatchEvent(backspaceEvent);
      }
    });

    let draggedElement: HTMLElement;
    let position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
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

      if (elem.textContent?.trim() === 'body' || elem.parentElement?.textContent?.trim() === 'body') return;

      /* The draggedNode might be having a bg-color of #353638 as it's on hovered state while rest of the nodes will be #2E2F31. That's why border styles needs to be reset after the drop event */
      let defaultBorderStyle: string;
      if (elem === draggedNode) defaultBorderStyle = '2px solid #353638'; //lighter
      else defaultBorderStyle = '2px solid #2E2F31'; //darker

      let cursorPos = (e as MouseEvent).pageY - elemRect.top;

      if (elem.hasAttribute('data-caret-down')) elem = elem.parentElement as HTMLDivElement;

      if (cursorPos < elemRect.height / 2) {
        elem.style.borderTop = '2px solid #007bfb';
        elem.style.borderBottom = defaultBorderStyle;
        position = ABOVE;
      } else {
        elem.style.borderTop = defaultBorderStyle;
        elem.style.borderBottom = '2px solid #007bfb';
        position = BELOW;
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
      targetElement.insertAdjacentHTML(position, draggedElement.outerHTML);

      draggedElement.remove();

      // find the inserted element and click on it to update the active node
      if (position === ABOVE) (targetElement?.previousElementSibling as HTMLElement)?.click();
      else if (position === BELOW) (targetElement?.nextElementSibling as HTMLElement)?.click();
      else if (position === INSIDE_AT_BOTTOM) (targetElement?.lastElementChild as HTMLElement)?.click();
      else if (position === INSIDE_AT_START) (targetElement?.firstElementChild as HTMLElement)?.click();

      // passing event so that it would trigger a re-render
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
  class="flex-col text-[#B8B6B6] text-[12px] cursor-pointer w-full font-semibold text-center tracking-wide focus:outline-none"
  tabindex="-1"
>
  {#if $iFrameDocument}
    <Tree element={$iFrameDocument?.body} basePaddingLeft={20} {tagInfo} />
  {/if}
</div>

<style>
  :global(.active-node) {
    background-color: #cf672b;
    color: #ebebeb;
    border-color: #cf672b;
  }

  :global(.active-node img) {
    filter: brightness(2.5);
  }

  :global(.active-node:hover) {
    background-color: #cf672b;
    color: #ebebeb;
    border-color: #cf672b;
  }
</style>

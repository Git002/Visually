<script lang="ts">
  import TreeView from '$lib/UI/TreeView.svelte';
  import { onMount } from 'svelte';
  import { iFrameDocument } from '../../Stores';

  let elementsPosition: { tagName: string; isParent: boolean; position: number[] }[] = [];
  let tagInfo: { [key: string]: { name: string; icon: string } } = {
    BODY: { name: 'Body', icon: './Icons/NavigatorPanel/window.svg' },
    DIV: { name: 'Div', icon: './Icons/NavigatorPanel/square.svg' },
    H1: { name: 'Heading', icon: './Icons/NavigatorPanel/heading.svg' },
    P: { name: 'Pragraph', icon: './Icons/NavigatorPanel/paragraph.svg' },
    IMG: { name: 'Image', icon: './Icons/NavigatorPanel/image.svg' },
    BUTTON: { name: 'Button', icon: './Icons/NavigatorPanel/button.svg' },
    INPUT: { name: 'Input', icon: './Icons/NavigatorPanel/input.svg' }
  };

  function generateElementsPosition(elem: HTMLElement, parentIndex: number[] = []) {
    const tagName = elem.tagName;
    if (elem.tagName === 'BODY') {
      elementsPosition.push({ tagName, isParent: true, position: [0] });
      Array.from(elem.children).forEach((child) => {
        generateElementsPosition(child as HTMLElement, [0]);
      });
    } else {
      const elementSiblings = Array.from((elem.parentElement as HTMLElement).children);
      const currentPosition = [...parentIndex, elementSiblings.indexOf(elem)];

      if (elem.children.length > 0) {
        elementsPosition.push({ tagName, isParent: true, position: currentPosition });

        Array.from(elem.children).forEach((child) => {
          generateElementsPosition(child as HTMLElement, currentPosition);
        });
      } else {
        elementsPosition.push({ tagName, isParent: false, position: currentPosition });
      }
    }
  }

  $: if ($iFrameDocument) {
    elementsPosition = [];
    generateElementsPosition($iFrameDocument.body);
  }

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
    let clickedNode: HTMLElement;
    let draggedNode: HTMLElement;
    let currentNodeIndex: number;

    navPanel.addEventListener('click', (e: Event) => {
      if (!(e.target as HTMLElement).hasAttribute('data-header')) return;

      currentNodeIndex = Array.from(navPanel.children).indexOf(e.target as HTMLElement);

      clickedNode = getElementByPosition(elementsPosition[currentNodeIndex].position);
      clickedNode.click();
      navPanel.focus();
    });

    navPanel.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && clickedNode.tagName !== 'BODY') {
        const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
        $iFrameDocument.dispatchEvent(backspaceEvent);
      }
    });

    navPanel.addEventListener('dragstart', (e: DragEvent) => {
      draggedNode = e.target as HTMLElement;
      currentNodeIndex = Array.from(navPanel.children).indexOf(draggedNode);

      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);
    });

    navPanel.addEventListener('dragover', (e: DragEvent) => {
      let elem = e.target as HTMLElement;
      let elemRect = elem.getBoundingClientRect();

      let defaultBorderStyle: string;

      if (elem === draggedNode) {
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

<div id="navigator-tree-view" class="focus:outline-none" tabindex="-1">
  {#if $iFrameDocument}
    <TreeView element={$iFrameDocument?.body} Expand={true} basePaddingLeft={20} {tagInfo} />
  {/if}
</div>

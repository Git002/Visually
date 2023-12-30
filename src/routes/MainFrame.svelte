<script lang="ts">
  import { onMount } from 'svelte';
  import { clickedElement, showPanelComponent, iFrameDocument } from '../Stores';
  import { processStyles } from '../lib/Modules/cssFunctions';
  import { calculateRect, ghostImageHandler } from '../lib/Modules/MainFrameFunctions';
  import { PanelElements } from '../lib/PanelComponents/ElementsPanel.svelte';

  let hoveredElement: HTMLElement;
  let draggedElement: HTMLElement | null = null;
  let dropTarget: HTMLElement | null;

  let position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
  const INSIDE_AT_START = 'afterbegin';
  const INSIDE_AT_BOTTOM = 'beforeend';
  const ABOVE = 'beforebegin';
  const BELOW = 'afterend';

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    // helper selectors for drag n drop
    const click_selector = <HTMLDivElement>document.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
    const indicator = <HTMLDivElement>document.getElementById('indicator');

    let htmlCode: string | null;

    // drag and drop operations for document --->
    document.addEventListener('dragstart', (e: DragEvent) => {
      const grabbedElem = e.target as HTMLDivElement;
      if (!grabbedElem.closest('#elements-panel')) return;

      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);

      const ghostText = grabbedElem.getAttribute('data-tagname')!;
      ghost_img.innerText = ghostText;
      ghost_img.style.display = 'block';

      htmlCode = PanelElements[ghostText].code;
    });

    document.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();

      ghost_img.style.top = e.clientY + 15 + 'px';
      ghost_img.style.left = e.clientX + 25 + 'px';

      indicator.style.display = 'none';
    });

    document.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();

      ghostImageHandler(75, 60, 'none');

      indicator.style.display = 'none';

      draggedElement = null;
      htmlCode = null;
    });

    document.addEventListener('dragend', (e: DragEvent) => {
      e.preventDefault();

      ghostImageHandler(75, 60, 'none');

      indicator.style.display = 'none';

      draggedElement = null;
      htmlCode = null;
    });

    iFrame.src = 'userFiles/index.html';

    iFrame.addEventListener('load', () => {
      let iFrameDoc = <Document>iFrame.contentDocument;
      $iFrameDocument = iFrameDoc;

      let prevClickedElement: HTMLElement;
      let currentClickedElement: HTMLElement;
      let currentElementObserver: MutationObserver;

      iFrameDoc.addEventListener('click', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.isTrusted) $showPanelComponent = false;

        currentClickedElement = e.target as HTMLElement;

        calculateRect(currentClickedElement, click_selector);
        click_selector.style.display = 'block';

        $clickedElement = currentClickedElement;
        processStyles($clickedElement);

        if (prevClickedElement !== currentClickedElement) {
          if (currentClickedElement) {
            currentElementObserver?.disconnect();

            currentElementObserver = new MutationObserver(() => {
              currentClickedElement.click();
            });

            currentElementObserver.observe(currentClickedElement, {
              attributes: true,
              attributeFilter: ['class']
            });
          }
        }
        prevClickedElement = currentClickedElement;
      });

      iFrameDoc.addEventListener('mouseover', (e: Event) => {
        hoveredElement = e.target as HTMLElement;
        if (hoveredElement.tagName !== 'BODY') hoveredElement.draggable = true;

        calculateRect(hoveredElement, hover_selector);

        hover_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseout', (e: Event) => {
        const mouseoutElem = e.target as HTMLElement;
        mouseoutElem.removeAttribute('draggable');

        hover_selector.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragstart', (e: DragEvent) => {
        e.stopPropagation();

        const blank = iFrameDoc.createElement('div');
        e.dataTransfer!.setDragImage(blank, 0, 0);

        draggedElement = e.target as HTMLElement;
        htmlCode = draggedElement.outerHTML;

        ghost_img.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        ghostImageHandler(e.clientX + 75, e.clientY + 60);

        let elem = e.target as HTMLElement;
        let parentElem = elem.parentElement as HTMLElement;
        let elemRect = elem.getBoundingClientRect();
        let parentRect = parentElem.getBoundingClientRect();

        let cursorPos = (e as MouseEvent).pageY - elemRect.top;

        indicator.style.display = 'block';
        hover_selector.style.display = 'none';
        click_selector.style.display = 'none';

        calculateRect(elem, indicator);

        dropTarget = null;

        if (!elem.previousElementSibling && parentElem.tagName !== 'BODY') {
          // if the spacing between the current element and its direct parent is too low
          if (elemRect.top - parentRect.top < 3) {
            if (cursorPos < 3) {
              dropTarget = parentElem;
              calculateRect(dropTarget, indicator);
              indicator.style.borderWidth = '3px 0px 0px 0px';
              position = ABOVE;
            } else if (cursorPos <= elemRect.height / 2) {
              indicator.style.borderWidth = '3px 0px 0px 0px';
              position = ABOVE;
            } else if (cursorPos >= elemRect.height / 2 && cursorPos < elemRect.height - 3) {
              indicator.style.borderWidth = '0px 0px 3px 0px';
              position = BELOW;
            } else {
              dropTarget = parentElem;
              calculateRect(dropTarget, indicator);
              indicator.style.borderWidth = '0px 0px 3px 0px';
              position = BELOW;
            }
          }
        } else if (elem.tagName === 'BODY') {
          indicator.style.borderWidth = '3px 3px 3px 3px';
          position = INSIDE_AT_BOTTOM;
        } else if (elem.tagName === 'DIV') {
          if (cursorPos <= elemRect.height / 10) {
            indicator.style.borderWidth = '3px 0px 0px 0px';
            position = ABOVE;
          } else if (
            cursorPos > elemRect.height / 10 &&
            cursorPos <= elemRect.height - elemRect.height / 10
          ) {
            indicator.style.borderWidth = '3px 3px 3px 3px';
            position = INSIDE_AT_BOTTOM;
          } else if (cursorPos >= elemRect.height - elemRect.height / 10) {
            indicator.style.borderWidth = '0px 0px 3px 0px';
            position = BELOW;
          }
        } else if (cursorPos <= elemRect.height / 2) {
          indicator.style.borderWidth = '3px 0px 0px 0px';
          position = ABOVE;
        } else {
          indicator.style.borderWidth = '0px 0px 3px 0px';
          position = BELOW;
        }
      });

      iFrameDoc.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        ghostImageHandler(75, 60, 'none');

        if (htmlCode) {
          dropTarget
            ? dropTarget.insertAdjacentHTML(position, htmlCode)
            : (e.target as HTMLElement).insertAdjacentHTML(position, htmlCode);

          draggedElement?.remove();
        }

        indicator.style.display = 'none';

        $iFrameDocument = iFrameDoc; // trigger Navigator.svelte to re-render the tree

        draggedElement = null;
        dropTarget = null;
        htmlCode = null;
      });

      iFrameDoc.addEventListener('dragend', (e: DragEvent) => {
        e.stopPropagation();

        indicator.style.display = 'none';
      });

      iFrameDoc.addEventListener('scroll', () => {
        if ($clickedElement) calculateRect($clickedElement, click_selector);
        calculateRect(hoveredElement, hover_selector);
      });

      iFrameDoc.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && currentClickedElement.tagName !== 'BODY') {
          // the element to be clicked when the current element gets deleted
          let remainingElement: HTMLElement;

          let prevElement = <HTMLElement>currentClickedElement.previousElementSibling;
          let nextElement = <HTMLElement>currentClickedElement.nextElementSibling;
          let parentElement = <HTMLElement>currentClickedElement.parentElement;

          parentElement.childNodes.forEach((node: ChildNode) => {
            if (node.nodeName === '#text') node.remove();
          });

          remainingElement = nextElement || prevElement || parentElement;

          currentClickedElement.remove();
          remainingElement.click();

          calculateRect(hoveredElement, hover_selector);

          $iFrameDocument = iFrameDoc; // trigger Navigator.svelte to re-render the tree
        }
      });

      iFrameDoc.body.click();
    });

    window.addEventListener('resize', () => {
      if ($clickedElement) {
        calculateRect($clickedElement, click_selector);
        hover_selector.style.display = 'none';
      }
    });
  });
</script>

<!-- iframe -->
<div id="frame_container" class="relative w-full h-full overflow-hidden">
  <iframe frameborder="0" title="Project" id="frame" style="color-scheme: dark; width: 100%; height: 100%;" />

  <div
    id="click-selector"
    style="
    box-sizing: border-box;
    display: block;
    pointer-events: none;
    border: 1px solid rgb(76, 120, 255);
    position: absolute;
    border-radius: 0px;
    background-color: transparent;
  "
  />

  <div
    id="hover-selector"
    style="
    box-sizing: border-box;
    display: none;
    pointer-events: none;
    border: 1px solid rgb(76, 120, 255);
    position: absolute;
    border-radius: 0px;
    background-color: transparent;
  "
  />

  <div
    id="indicator"
    style="
    box-sizing: border-box;
    display: none;
    pointer-events: none;
    position: absolute;
    border-radius: 0px;
    border-style: solid;
    border-color: #007bfb;
    background-color: transparent;
  "
  />
</div>

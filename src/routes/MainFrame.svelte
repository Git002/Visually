<script lang="ts">
  import { onMount } from 'svelte';
  import { clickedElement, showPanelComponent, iFrameDocument, preview } from '../Stores';
  import { processStyles } from '../lib/Modules/cssFunctions';
  import { calculateRect, ghostImageHandler } from '../lib/Modules/MainFrameFunctions';
  import { PanelElements } from '../lib/PanelComponents/ElementsPanel.svelte';
  import { handleEnterEvent } from '$lib/Modules/helperFunctions';

  let hoveredElement: HTMLElement;
  let draggedElement: HTMLElement | null = null;
  let dropTarget: HTMLElement | null;

  let position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
  const INSIDE_AT_START = 'afterbegin';
  const INSIDE_AT_BOTTOM = 'beforeend';
  const ABOVE = 'beforebegin';
  const BELOW = 'afterend';

  let dblclickedElement: HTMLElement | null;

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    // helper selectors for drag & drop
    const click_selector = <HTMLDivElement>document.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
    const indicator = <HTMLDivElement>document.getElementById('indicator');

    let htmlCode: string | null;

    // drag and drop operations for document --->
    document.addEventListener('dragstart', (e: DragEvent) => {
      if ($preview) return;

      const grabbedElem = e.target as HTMLDivElement;
      if (!grabbedElem.closest('#elements-panel')) return;

      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);

      const ghostText = grabbedElem.getAttribute('data-tagname')!;
      ghost_img.innerText = ghostText;

      htmlCode = PanelElements[ghostText].code;
    });

    document.addEventListener('dragover', (e: DragEvent) => {
      if ($preview) return;

      e.preventDefault();

      if (!(e.target as HTMLElement).closest('#elements-panel')) {
        ghost_img.style.display = 'none';
        return;
      }

      ghost_img.style.top = e.clientY + 15 + 'px';
      ghost_img.style.left = e.clientX + 25 + 'px';
      ghost_img.style.display = 'block';

      indicator.style.display = 'none';
    });

    document.addEventListener('drop', (e: DragEvent) => {
      if ($preview) return;

      e.preventDefault();

      ghostImageHandler(75, 60, 'none');
      indicator.style.display = 'none';

      draggedElement = null;
      htmlCode = null;
    });

    document.addEventListener('dragend', (e: DragEvent) => {
      if ($preview) return;

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
        if ($preview) return;

        e.preventDefault();
        e.stopPropagation();

        if (e.isTrusted) $showPanelComponent = false;

        currentClickedElement = e.target as HTMLElement;

        // removing contenteditable if clicked elsewhere
        if (dblclickedElement && dblclickedElement !== currentClickedElement) {
          dblclickedElement.normalize();
          dblclickedElement.removeAttribute('contenteditable');
          dblclickedElement = null;

          click_selector.style.outlineStyle = 'none';
          click_selector.style.border = '1px solid rgb(76, 120, 255)';
        }

        calculateRect(currentClickedElement, click_selector);

        click_selector.style.display = 'block';

        $clickedElement = currentClickedElement;
        processStyles(currentClickedElement);

        // Detect through Mutation Observer if there are any changes to class attribute. If yes, then re-click on the element so that other components could recieve the updated styles too
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

      iFrameDoc.addEventListener('dblclick', (e: MouseEvent) => {
        if ($preview) return;

        dblclickedElement = e.target as HTMLElement;

        if (!['H1', 'P'].includes(dblclickedElement.tagName)) return;

        if (!dblclickedElement.hasAttribute('contentEditable')) {
          dblclickedElement.contentEditable = 'true';
          dblclickedElement.focus();

          // Set cursor to end
          const range = iFrameDoc.createRange();
          range.selectNodeContents(dblclickedElement);
          range.collapse(false);

          const selection = iFrame.contentWindow?.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);

          // Style the indicators so that it looks distinct while editing text
          click_selector.style.outlineStyle = 'solid';
          click_selector.style.border = '0px solid rgb(76, 120, 255)';
          hover_selector.style.display = 'none';
        }

        // const popup = document.getElementById('popup') as HTMLDivElement;
        // popup.style.top = dblclickedElement.offsetHeight + dblclickedElement.offsetTop + 10 + 'px';
        // popup.style.left = dblclickedElement.offsetLeft + 'px';
      });

      iFrameDoc.addEventListener('mouseover', (e: Event) => {
        if ($preview) return;

        hoveredElement = e.target as HTMLElement;

        if (hoveredElement.tagName !== 'BODY') hoveredElement.draggable = true;

        calculateRect(hoveredElement, hover_selector);

        if (hoveredElement === dblclickedElement) {
          hover_selector.style.display = 'none';
        } else {
          hover_selector.style.display = 'block';
        }
      });

      iFrameDoc.addEventListener('mouseout', (e: Event) => {
        if ($preview) return;

        const mouseoutElem = e.target as HTMLElement;
        mouseoutElem.removeAttribute('draggable');

        hover_selector.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragstart', (e: DragEvent) => {
        if ($preview) return;

        e.stopPropagation();

        const blank = iFrameDoc.createElement('div');
        e.dataTransfer!.setDragImage(blank, 0, 0);

        draggedElement = e.target as HTMLElement;
        htmlCode = draggedElement.outerHTML;

        ghost_img.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragover', (e: DragEvent) => {
        if ($preview) return;

        e.preventDefault();
        e.stopPropagation();

        ghostImageHandler(e.clientX + 75, e.clientY + 60);

        let elem = e.target as HTMLElement;
        let elemRect = elem.getBoundingClientRect();

        let parentElem = elem.parentElement as HTMLElement;
        let parentRect = parentElem.getBoundingClientRect();

        let cursorPos = (e as MouseEvent).pageY - elemRect.top;

        indicator.style.display = 'block';
        hover_selector.style.display = 'none';
        click_selector.style.display = 'none';

        calculateRect(elem, indicator);

        dropTarget = null;

        // logic for placing the indicator
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
        if ($preview) return;

        e.preventDefault();
        e.stopPropagation();

        ghostImageHandler(75, 60, 'none');

        dropTarget ? dropTarget : (dropTarget = e.target as HTMLElement);

        let allowDrop = true;

        if (dropTarget !== draggedElement && draggedElement?.contains(dropTarget)) allowDrop = false;

        if (htmlCode && dropTarget !== draggedElement && allowDrop) {
          dropTarget.insertAdjacentHTML(position, htmlCode);

          draggedElement?.remove();

          let dropElement: HTMLElement | undefined = undefined;

          if (position === ABOVE) dropElement = dropTarget?.previousElementSibling as HTMLElement;
          else if (position === BELOW) dropElement = dropTarget?.nextElementSibling as HTMLElement;
          else if (position === INSIDE_AT_BOTTOM) dropElement = dropTarget?.lastElementChild as HTMLElement;
          else if (position === INSIDE_AT_START) dropElement = dropTarget?.firstElementChild as HTMLElement;

          if (!dropElement) throw new Error('dropElement is empty');

          if (dropElement.tagName === 'IMG') {
            dropElement.addEventListener('load', (e) => (e.target as HTMLElement).click());
          }

          dropElement.click();
        }

        indicator.style.display = 'none';

        iFrame.contentWindow?.focus();

        // trigger Navigator.svelte to re-render the tree
        $iFrameDocument = iFrameDoc;

        draggedElement = null;
        dropTarget = null;
        htmlCode = null;
      });

      iFrameDoc.addEventListener('dragend', (e: DragEvent) => {
        if ($preview) return;

        e.stopPropagation();
        indicator.style.display = 'none';

        draggedElement = null;
        dropTarget = null;
        htmlCode = null;
      });

      iFrameDoc.addEventListener('scroll', () => {
        if ($preview) return;

        if ($clickedElement) calculateRect($clickedElement, click_selector);
        calculateRect(hoveredElement, hover_selector);
      });

      iFrameDoc.addEventListener('keydown', (e: KeyboardEvent) => {
        if ($preview) return;

        if (dblclickedElement && e.key === 'Enter') {
          e.preventDefault();

          handleEnterEvent(iFrameDoc);

          dblclickedElement.click();

          // trigger Navigator.svelte to re-render the tree
          $iFrameDocument = iFrameDoc;
        }
      });

      iFrameDoc.addEventListener('keyup', (e: KeyboardEvent) => {
        if ($preview) return;

        // Deleting texts inside contenteditable
        if (dblclickedElement && e.key === 'Backspace') {
          e.preventDefault();

          calculateRect(dblclickedElement, click_selector);

          // trigger Navigator.svelte to re-render the tree
          $iFrameDocument = iFrameDoc;
        }

        // Deleting the elements
        else if (
          ['Delete', 'Backspace'].includes(e.key) &&
          !['BODY', 'HTML'].includes(currentClickedElement.tagName)
        ) {
          let remainingElement: HTMLElement;

          let prevElement = <HTMLElement>currentClickedElement.previousElementSibling;
          let nextElement = <HTMLElement>currentClickedElement.nextElementSibling;
          let parentElement = <HTMLElement>currentClickedElement.parentElement;

          remainingElement = nextElement || prevElement || parentElement;

          currentClickedElement.remove();
          remainingElement.click();

          calculateRect(hoveredElement, hover_selector);

          // trigger Navigator.svelte to re-render the tree
          $iFrameDocument = iFrameDoc;
        }
      });

      iFrameDoc.body.click();
    });

    window.addEventListener('resize', () => {
      if ($preview) return;

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

  <!-- For Clicks -->
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
    outline-color: #abd4ff;
    outline-width: 4px;
  "
  />

  <!-- For Hover -->
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

  <!-- For Drag & Drop -->
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

  <!-- For Text editing popup -->
  <!-- <div
    id="popup"
    class="rounded-[6px] shadow-gray-600 shadow-2xl"
    style="
    position: absolute;
    display: none;
    top: 10px;
    "
  >
    <MultiSelect
      Items={[
        { text: '', iconPath: 'Icons/TextEdit/bold.svg' },
        { text: '', iconPath: 'Icons/TextEdit/italic.svg' },
        { text: '', iconPath: 'Icons/TextEdit/underline.svg' },
        { text: '', iconPath: 'Icons/TextEdit/strikethrough.svg' },
        { text: '', iconPath: 'Icons/TextEdit/style.svg' }
      ]}
      border={false}
      ButtonIds={[
        'set-text-bold',
        'set-text-italic',
        'set-text-underline',
        'set-text-strikethrough',
        'set-text-style'
      ]}
    />
  </div> -->
</div>

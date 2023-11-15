<script lang="ts">
  import { onMount } from 'svelte';
  import { clickedElement, showPanel, iFrameDocument } from '../Stores';
  import { calculateRect, ghostImageHandler, processStyles } from '../lib/Modules/helperFunctions';
  import { PanelElements } from './Panel.svelte';

  // types for insertAdjacentHTML on the drop() event
  type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
  let position: InsertPosition;

  let hoveredElement: HTMLElement;
  let draggedElement: HTMLElement | null = null;

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');
    let htmlCode: string;

    // helper selectors for drag n drop
    const click_selector = <HTMLDivElement>document.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
    const indicator = <HTMLDivElement>document.getElementById('indicator');

    // drag and drop operations for document ---------->
    document.addEventListener('dragstart', (e) => {
      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);

      const ghostText = (e.target as HTMLDivElement).getAttribute('data-tagname')!;
      ghost_img.innerText = ghostText;
      ghost_img.style.display = 'block';

      htmlCode = PanelElements[ghostText].code;
    });

    document.addEventListener('dragover', (e) => {
      e.preventDefault();

      ghost_img.style.top = e.clientY + 15 + 'px';
      ghost_img.style.left = e.clientX + 25 + 'px';

      indicator.style.display = 'none';
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();

      ghostImageHandler(60, 75, 'none');

      indicator.style.display = 'none';

      draggedElement = null;
    });

    document.addEventListener('dragend', (e) => {
      e.preventDefault();

      ghostImageHandler(60, 75, 'none');

      indicator.style.display = 'none';

      draggedElement = null;
    });

    // make the iframe reload for changes
    iFrame.src = 'userFiles/index.html';

    iFrame.addEventListener('load', () => {
      let iFrameDoc = iFrame.contentDocument!;

      iFrameDocument.update(() => iFrameDoc);

      let prevClickedElement: HTMLElement;
      let currentClickedElement: HTMLElement;

      iFrameDoc.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        currentClickedElement = e.target as HTMLElement;

        clickedElement.update(() => currentClickedElement);
        processStyles($clickedElement);

        // hide Panel.svelte
        showPanel.update(() => false);

        if (prevClickedElement !== currentClickedElement) {
          // hide NotSelected.svelte
          let NotSelected = <HTMLDivElement>document.getElementById('not_selected');
          NotSelected.style.visibility = 'hidden';

          calculateRect(currentClickedElement, click_selector);

          click_selector.style.display = 'block';
        }

        prevClickedElement = currentClickedElement;
      });

      iFrameDoc.addEventListener('mouseover', (e) => {
        hoveredElement = e.target as HTMLElement;
        if (hoveredElement.tagName !== 'BODY') hoveredElement.draggable = true;

        calculateRect(hoveredElement, hover_selector);

        hover_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseout', (e) => {
        const mouseoutElem = e.target as HTMLElement;
        mouseoutElem.removeAttribute('draggable');

        hover_selector.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragstart', (e) => {
        e.stopPropagation();

        const blank = iFrameDoc.createElement('div');
        e.dataTransfer!.setDragImage(blank, 0, 0);

        draggedElement = e.target as HTMLElement;
        htmlCode = draggedElement.outerHTML;

        ghost_img.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // update the ghost's position when inside the iFrame
        ghostImageHandler(e.clientY + 60, e.clientX + 75);

        let elem = e.target as HTMLElement;
        let rect = elem.getBoundingClientRect();

        indicator.style.display = 'block';
        hover_selector.style.display = 'none';
        click_selector.style.display = 'none';

        // change the rect() of indicator on dragover
        calculateRect(elem, indicator);

        if (elem.tagName === 'BODY') {
          indicator.style.display = 'none';
          indicator.style.borderTop = '';
          indicator.style.borderBottom = '';

          position = 'beforeend';
        } else {
          // insert above the the element
          if (Math.abs((e as MouseEvent).pageY - rect.top) <= rect.height / 2) {
            indicator.style.borderTop = '3px solid #007bfb';
            indicator.style.borderBottom = '';

            position = 'beforebegin';
          }
          // insert below the element
          else {
            indicator.style.borderTop = '';
            indicator.style.borderBottom = '3px solid #007bfb';

            position = 'afterend';
          }
        }
      });

      iFrameDoc.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // reset the ghost's position on drop
        ghostImageHandler(60, 75, 'none');

        // then add the copied element to the DOM
        (e.target as HTMLElement).insertAdjacentHTML(position, htmlCode);

        // then delete the original element to create an illusion of elements being moved on drag
        draggedElement?.remove();

        indicator.style.display = 'none';

        draggedElement = null;
      });

      iFrameDoc.addEventListener('dragend', (e) => {
        e.stopPropagation();

        indicator.style.display = 'none';
      });

      // recalculate selector styles on scroll for smooth experience
      iFrameDoc.addEventListener('scroll', () => {
        if ($clickedElement) calculateRect($clickedElement, click_selector);
        calculateRect(hoveredElement, hover_selector);
      });
    });

    window.addEventListener('resize', () => {
      // updating selector styles on resize
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
    display: none;
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
    background-color: transparent;
  "
  />
</div>

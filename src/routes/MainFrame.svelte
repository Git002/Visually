<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode, clickedElement, show } from '../Stores';
  import { calculateRect } from '../lib/Modules/helperFunctions';

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    // type for insertAdjacentHTML on drop() event
    type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

    let position: InsertPosition;
    let hoveredElement: HTMLElement;
    let draggedElement: HTMLElement | null = null;

    // helper selectors for drag n drop
    let click_selector: HTMLDivElement, hover_selector: HTMLDivElement, indicator: HTMLDivElement;

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      ghost_img.style.top = e.clientY + 15 + 'px';
      ghost_img.style.left = e.clientX + 25 + 'px';
      indicator.style.display = 'none';
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      ghost_img.style.visibility = 'hidden';
      ghost_img.style.top = 60 + 'px';
      ghost_img.style.left = 75 + 'px';
      draggedElement = null;
    });

    // make the iframe reload
    iFrame.src = 'userFiles/index.html';

    iFrame.addEventListener('load', () => {
      let iFrameDoc = iFrame.contentDocument!;

      // helper selectors
      click_selector = <HTMLDivElement>document.getElementById('click-selector');
      hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
      indicator = <HTMLDivElement>document.getElementById('indicator');

      iFrameDoc.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // hide elements panel when clicked anywhere in iFrame
        show.update(() => false);

        clickedElement.update(() => e.target as HTMLElement);

        calculateRect($clickedElement, click_selector);
        click_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseover', (e) => {
        hoveredElement = e.target as HTMLElement;
        if (hoveredElement.tagName !== 'BODY') {
          hoveredElement.draggable = true;
        }

        calculateRect(hoveredElement, hover_selector);
        hover_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseout', (e) => {
        let elem = e.target as HTMLElement;
        elem.removeAttribute('draggable');
      });

      iFrameDoc.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        const blank = iFrameDoc.createElement('div');
        e.dataTransfer!.setDragImage(blank, 0, 0);

        draggedElement = e.target as HTMLElement;
        htmlCode.update(() => draggedElement!.outerHTML);
        ghost_img.style.visibility = 'hidden';
      });

      iFrameDoc.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // update the ghost's position when inside the iFrame
        ghost_img.style.top = e.clientY + 60 + 'px';
        ghost_img.style.left = e.clientX + 75 + 'px';

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
        ghost_img.style.top = 60 + 'px';
        ghost_img.style.left = 75 + 'px';
        ghost_img.style.visibility = 'hidden';

        // add the copied element to the dom
        let elem = e.target as HTMLElement;
        elem.insertAdjacentHTML(position, $htmlCode);

        // then delete the original to create an illusion of elements being moved
        if (draggedElement) {
          draggedElement.remove();
        }

        indicator.style.display = 'none';
        draggedElement = null;
      });

      // recalculate selector styles on scroll for smooth experience
      iFrameDoc.addEventListener('scroll', (e) => {
        if ($clickedElement) {
          calculateRect($clickedElement, click_selector);
        }
        calculateRect(hoveredElement, hover_selector);
      });
    });

    window.addEventListener('resize', (e) => {
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
  <iframe
    frameborder="0"
    title="Project"
    id="frame"
    style="color-scheme: dark; width: 100%; height: 100%;"
  />

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

<style>
</style>

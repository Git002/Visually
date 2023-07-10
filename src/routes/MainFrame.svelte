<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode, clickedElement } from '../Stores';
  import { calculateRect } from '../lib/Modules/helperFunctions';

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    // object type for insertAdjacentHTML on drop() event
    type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

    let position: InsertPosition;
    let hoveredElement: HTMLElement;

    // helper selectors for drag n drop
    let click_selector: HTMLDivElement, hover_selector: HTMLDivElement, indicator: HTMLDivElement;

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
        clickedElement.update(() => e.target as HTMLElement);
        calculateRect($clickedElement, click_selector);
        click_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseover', (e) => {
        hoveredElement = e.target as HTMLElement;
        calculateRect(hoveredElement, hover_selector);
        hover_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('dragover', (e) => {
        e.preventDefault();

        // setting ghost_img drag position
        ghost_img.style.visibility = 'visible';
        ghost_img.style.top = e.clientY + 60 + 'px';
        ghost_img.style.left = e.clientX + 75 + 'px';

        let elem = e.target as HTMLElement;
        let rect = elem.getBoundingClientRect();

        indicator.style.display = 'block';
        hover_selector.style.display = 'none';
        click_selector.style.display = 'none';

        // show indicator on drag
        calculateRect(elem, indicator);

        if (elem.tagName === 'BODY') {
          indicator.style.display = 'none';
          indicator.style.borderTop = '';
          indicator.style.borderBottom = '';
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
        let elem = e.target as HTMLElement;
        if (elem.tagName === 'BODY') {
          iFrameDoc.body.insertAdjacentHTML('beforeend', String($htmlCode));
        } else {
          elem.insertAdjacentHTML(position, String($htmlCode));
        }
        indicator.style.display = 'none';
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
    class="bg-white w-full h-full"
    frameborder="0"
    title="Project"
    id="frame"
    style="color-scheme: dark;"
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

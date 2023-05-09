<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode, clickedElement } from '../Stores';

  // calculating the outline box pixels for helper divs
  function calculateRect(element: HTMLElement, selector: HTMLDivElement, window: Window) {
    let rect = element.getBoundingClientRect();
    selector.style.width = rect.width + 'px';
    selector.style.height = rect.height + 'px';
    selector.style.top = rect.top + window.scrollY + 'px';
    selector.style.left = rect.left + window.scrollX + 'px';
  }

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    // object type for insertAdjacentHTML on drop() event
    type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
    let position: InsertPosition;

    let hoveredElement: HTMLElement;

    let iFrameWindow: Window;
    // helper selectors for drag n drop
    let click_selector: HTMLDivElement, hover_selector: HTMLDivElement, indicator: HTMLDivElement;

    // make the iframe reload
    iFrame.src = 'userFiles/index.html';

    iFrame.addEventListener('load', () => {
      let iFrameDoc = iFrame.contentDocument!;
      iFrameWindow = iFrame.contentWindow!;

      // helper selectors
      click_selector = <HTMLDivElement>iFrameDoc.getElementById('click-selector');
      hover_selector = <HTMLDivElement>iFrameDoc.getElementById('hover-selector');
      indicator = <HTMLDivElement>iFrameDoc.getElementById('indicator');

      iFrameDoc.addEventListener('click', (e) => {
        clickedElement.update(() => e.target as HTMLElement);
        calculateRect($clickedElement, click_selector, iFrameWindow);
        click_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseover', (e) => {
        hoveredElement = e.target as HTMLElement;
        calculateRect(hoveredElement, hover_selector, iFrameWindow);
        hover_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseout', (e) => {
        hover_selector.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragover', (e) => {
        e.preventDefault();

        // setting ghost_img drag position
        ghost_img.style.visibility = 'visible';
        ghost_img.style.top = e.clientY + 60 + 'px';
        ghost_img.style.left = e.clientX + 75 + 'px';

        let elem = e.target as HTMLElement;
        let rect = elem.getBoundingClientRect();

        calculateRect(elem, indicator, iFrameWindow);

        indicator.style.display = 'block';
        hover_selector.style.display = 'none';
        click_selector.style.display = 'none';

        if (elem.tagName !== 'BODY') {
          if (Math.abs((e as MouseEvent).pageY - rect.top) <= rect.height / 2) {
            indicator.style.borderTop = '3px solid #007bfb';
            indicator.style.borderBottom = '';
            // insert before the element
            position = 'beforebegin';
          } else {
            indicator.style.borderTop = '';
            indicator.style.borderBottom = '3px solid #007bfb';
            // insert after the element
            position = 'afterend';
          }
        } else {
          indicator.style.display = 'none';
          indicator.style.borderTop = '';
          indicator.style.borderBottom = '';
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

      // recalculate selector styles on scroll
      iFrameDoc.addEventListener('scroll', (e) => {
        if ($clickedElement) {
          calculateRect($clickedElement, click_selector, iFrameWindow);
        }
        calculateRect(hoveredElement, hover_selector, iFrameWindow);
      });
    });

    document.addEventListener('dragend', () => {
      indicator.style.display = 'none';
    });

    window.addEventListener('resize', (e) => {
      // updating selector styles on resize
      if (clickedElement) {
        calculateRect($clickedElement, click_selector, iFrameWindow);
        hover_selector.style.display = 'none';
      }
    });
  });
</script>

<!-- iframe -->
<div id="frame_container" class="relative w-full h-full overflow-hidden">
  <iframe
    class="bg-[#ececec] w-full h-full"
    frameborder="0"
    title="Project"
    id="frame"
    style="color-scheme: dark;"
  />
</div>

<style>
</style>

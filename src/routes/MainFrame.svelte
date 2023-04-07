<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode } from '../Stores';

  // calculating the outline box pixels for helper divs
  function calculateRect(element: HTMLElement, selector: HTMLDivElement, print?: boolean) {
    let rect = element.getBoundingClientRect();
    selector.style.width = rect.width + 'px';
    selector.style.height = rect.height + 'px';
    selector.style.top = rect.top + 'px';
    selector.style.left = rect.left + 'px';
  }

  onMount(() => {
    const iFrame = <HTMLIFrameElement>document.getElementById('frame');
    const iFrameContainer = <HTMLDivElement>document.getElementById('frame_container');
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    // (needs to be tested)
    iFrameContainer.style.height = String(window.innerHeight - 43) + 'px';

    // helper selectors
    const click_selector = <HTMLDivElement>document.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
    const indicator = <HTMLDivElement>document.getElementById('indicator');

    // object type for insertAdjacentHTML on drop
    type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
    let position: InsertPosition;

    let clickedElement: HTMLElement;
    let hoveredElement: HTMLElement;

    iFrame.src = 'userFiles/index.html';
    iFrame.addEventListener('load', () => {
      let iFrameDoc = iFrame.contentDocument!;

      iFrameDoc.addEventListener('click', (e) => {
        clickedElement = e.target as HTMLElement;
        calculateRect(clickedElement, click_selector, true);
        click_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseover', (e) => {
        hoveredElement = e.target as HTMLElement;
        calculateRect(hoveredElement, hover_selector);
        hover_selector.style.display = 'block';
      });

      iFrameDoc.addEventListener('mouseout', (e) => {
        hover_selector.style.display = 'none';
      });

      iFrameDoc.addEventListener('dragover', (e) => {
        e.preventDefault();

        // setting ghost_img drag position
        ghost_img.style.top = e.clientY + 60 + 'px';
        ghost_img.style.left = e.clientX + 75 + 'px';

        let elem = e.target as HTMLElement;
        let rect = elem.getBoundingClientRect();

        indicator.style.display = 'block';
        indicator.style.width = rect.width + 'px';
        indicator.style.height = rect.height + 'px';
        indicator.style.top = rect.top + 'px';
        indicator.style.left = rect.left + 'px';

        if (elem.tagName !== 'BODY') {
          if (Math.abs((e as MouseEvent).clientY - rect.top) <= rect.height / 2) {
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
        if (clickedElement) {
          calculateRect(clickedElement, click_selector);
        }
        calculateRect(hoveredElement, hover_selector);
      });
    });

    document.addEventListener('dragend', () => {
      indicator.style.display = 'none';
    });

    window.addEventListener('resize', (e) => {
      // updating selector styles on resize
      if (clickedElement) {
        calculateRect(clickedElement, click_selector);
        hover_selector.style.display = 'none';
      }
      // updating iframe's div on resize (needs to be tested)
      iFrameContainer.style.height = String(window.innerHeight - 43) + 'px';
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
  <div id="click-selector" />
  <div id="hover-selector" />
  <div id="indicator" />
</div>

<style>
  /* Helper divs */
  div#hover-selector,
  div#click-selector {
    box-sizing: border-box;
    display: none;
    pointer-events: none;
    border: 1px solid rgb(76, 120, 255);
    position: absolute;
    border-radius: 0px;
    background-color: transparent;
  }

  div#indicator {
    box-sizing: border-box;
    display: none;
    pointer-events: none;
    position: absolute;
    border-radius: 0px;
    background-color: transparent;
  }
</style>

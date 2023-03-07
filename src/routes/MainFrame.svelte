<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode } from '../Stores';

  onMount(() => {
    const host = <HTMLDivElement>document.getElementById('frame-root');
    const shadow = host.attachShadow({ mode: 'open' });

    // get default html to load from the template
    const load_template = <HTMLTemplateElement>document.getElementById('load-template');
    shadow.appendChild(load_template.content);

    // helper selectors
    const click_selector = <HTMLDivElement>shadow.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>shadow.getElementById('hover-selector');
    const indicator = <HTMLDivElement>shadow.getElementById('indicator');

    let clickedElement: HTMLElement;

    shadow.addEventListener('click', (e) => {
      clickedElement = e.target as HTMLElement;

      let rect = clickedElement.getBoundingClientRect();
      let l = rect.left;
      let t = rect.top;
      let w = rect.width;
      let h = rect.height;

      click_selector.style.visibility = 'visible';

      click_selector.style.width = w + 'px';
      click_selector.style.height = h + 'px';
      click_selector.style.left = l + window.scrollX + 'px';
      click_selector.style.top = t + window.scrollY + 'px';
    });

    shadow.addEventListener('mouseover', (e) => {
      let rect = (e.target as Element).getBoundingClientRect();
      let l = rect.left;
      let t = rect.top;
      let w = rect.width;
      let h = rect.height;

      hover_selector.style.visibility = 'visible';

      hover_selector.style.width = w + 'px';
      hover_selector.style.height = h + 'px';
      hover_selector.style.left = l + window.scrollX + 'px';
      hover_selector.style.top = t + window.scrollY + 'px';
    });

    shadow.addEventListener('mouseout', (e) => {
      hover_selector.style.visibility = 'hidden';
    });

    shadow.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    shadow.addEventListener('drop', (e) => {
      shadow.querySelector('[data-body]')!.insertAdjacentHTML('beforeend', String($htmlCode));
    });

    window.addEventListener('resize', (e) => {
      clickedElement.click();
      hover_selector.style.visibility = 'hidden';
    });
  });
</script>

<!-- shadow root -->
<div
  class="bg-[#ececec] w-full h-[730px] z-0 overflow-y-scroll"
  style="color-scheme: dark;"
  id="frame-root"
/>

<!-- default empty template -->
<template id="load-template">
  <style id="visually-default-stylesheet">
    * {
      box-sizing: border-box !important;
    }

    /* Remove default margin */
    h1,
    h2,
    h3,
    h4,
    p,
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
      margin: 0;
    }

    /* Set body's default width and height */
    div[data-body] {
      width: 100% !important;
      height: 100% !important;
    }

    /* Helper divs */
    div#hover-selector,
    div#click-selector {
      visibility: hidden;
      pointer-events: none !important;
      border: 1px solid rgb(76, 120, 255) !important;
      position: absolute !important;
      z-index: 99999 !important;
      border-radius: 0px !important;
      background-color: transparent !important;
    }

    div#indicator {
      visibility: hidden;
      pointer-events: none !important;
      position: absolute !important;
      z-index: 99999 !important;
      border-radius: 0px !important;
      background-color: transparent !important;
    }
  </style>

  <div data-body>
    <div id="click-selector" />
    <div id="hover-selector" />
    <div id="indicator" />
  </div>
</template>

<style>
</style>

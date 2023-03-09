<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode } from '../Stores';

  onMount(() => {
    const host = <HTMLDivElement>document.getElementById('frame-root');
    const shadow = host.attachShadow({ mode: 'open' });

    // load default html from the template
    const load_template = <HTMLTemplateElement>document.getElementById('load-template');
    shadow.appendChild(load_template.content);

    // helper selectors
    const click_selector = <HTMLDivElement>document.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
    const indicator = <HTMLDivElement>document.getElementById('indicator');

    type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
    let position: InsertPosition;
    let clickedElement: HTMLElement;

    shadow.addEventListener('click', (e) => {
      clickedElement = e.target as HTMLElement;
      let rect = clickedElement.getBoundingClientRect();

      click_selector.style.display = 'block';
      click_selector.style.width = rect.width + 'px';
      click_selector.style.height = rect.height + 'px';
      click_selector.style.left = rect.left + window.scrollX + 'px';
      click_selector.style.top = rect.top + window.scrollY + 'px';
    });

    shadow.addEventListener('mouseover', (e) => {
      let rect = (e.target as HTMLElement).getBoundingClientRect();

      hover_selector.style.display = 'block';
      hover_selector.style.width = rect.width + 'px';
      hover_selector.style.height = rect.height + 'px';
      hover_selector.style.left = rect.left + window.scrollX + 'px';
      hover_selector.style.top = rect.top + window.scrollY + 'px';
    });

    shadow.addEventListener('mouseout', (e) => {
      hover_selector.style.display = 'none';
    });

    shadow.addEventListener('dragover', (e) => {
      e.preventDefault();

      let elem = e.target as HTMLElement;
      let rect = elem.getBoundingClientRect();
      indicator.style.display = 'block';
      indicator.style.width = rect.width + 'px';
      indicator.style.height = rect.height + 'px';
      indicator.style.left = rect.left + window.scrollX + 'px';
      indicator.style.top = rect.top + window.scrollY + 'px';

      if (!elem.hasAttribute('data-body')) {
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

    shadow.addEventListener('drop', (e) => {
      let elem = e.target as HTMLElement;
      if (elem.hasAttribute('data-body')) {
        shadow.querySelector('[data-body]')!.insertAdjacentHTML('beforeend', String($htmlCode));
      } else {
        elem.insertAdjacentHTML(position, String($htmlCode));
      }

      indicator.style.display = 'none';
    });

    window.addEventListener('resize', (e) => {
      // re-updating values on resize
      let rect = clickedElement.getBoundingClientRect();
      click_selector.style.width = rect.width + 'px';
      click_selector.style.height = rect.height + 'px';
      click_selector.style.left = rect.left + window.scrollX + 'px';
      click_selector.style.top = rect.top + window.scrollY + 'px';

      hover_selector.style.display = 'none';
    });
  });
</script>

<!-- shadow root -->
<div
  class="bg-[#ececec] w-full h-screen z-0 overflow-y-scroll"
  style="color-scheme: dark;"
  id="frame-root"
/>

<div id="click-selector" />
<div id="hover-selector" />
<div id="indicator" />

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

    h1 {
      font-family: 'Open Sans', sans-serif;
      font-size: 32px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 10px;
      width: auto;
    }

    p {
      font-family: 'Open Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #3d5565;
      line-height: 28px;
      margin-bottom: 10px;
      width: auto;
    }

    button {
      font-size: 12px;
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 6px;
      background-color: #0f172a;
      color: white;
      border: 0;
      margin-bottom: 10px;
    }

    /* Set body's default width and height */
    div[data-body] {
      width: 100% !important;
      height: 100% !important;
      padding: 10px !important;
      user-select: none !important;
    }
  </style>

  <div data-body />
</template>

<style>
  /* Helper divs */
  div#hover-selector,
  div#click-selector {
    display: none;
    pointer-events: none !important;
    border: 1px solid rgb(76, 120, 255) !important;
    position: absolute !important;
    z-index: 2 !important;
    border-radius: 0px !important;
    background-color: transparent !important;
  }

  div#indicator {
    display: none;
    pointer-events: none !important;
    position: absolute !important;
    z-index: 2 !important;
    border-radius: 0px !important;
    background-color: transparent !important;
  }
</style>

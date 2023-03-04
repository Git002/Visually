<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode } from '../Stores';

  onMount(() => {
    const host = <HTMLDivElement>document.getElementById('frame-root');
    const shadow = host.attachShadow({ mode: 'open' });
    const load_html = <HTMLTemplateElement>document.getElementById('load-html');
    shadow.appendChild(load_html.content);

    shadow.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    shadow.addEventListener('drop', (e) => {
      shadow.querySelector('[data-body]')!.insertAdjacentHTML('beforeend', String($htmlCode));
    });
  });
</script>

<div class="bg-[#ececec] w-full h-full" id="frame-root" />

<template id="load-html">
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

    div[data-body] {
      width: 100%;
      height: 100%;
    }
  </style>

  <div data-body />
</template>

<style>
</style>

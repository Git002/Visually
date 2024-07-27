<script lang="ts">
  import { iFrameDocument, preview } from '../Stores';
  import { minify } from 'csso';
  import beautify from 'js-beautify';
  import { cssRulesToText } from '../lib/Modules/helperFunctions';
  import { getToastStore } from '@skeletonlabs/skeleton';

  const toastStore = getToastStore();

  function previewFrame() {
    const sidebar = <HTMLDivElement>document.getElementById('sidebar');
    const properties = <HTMLDivElement>document.getElementById('properties');

    const click_selector = <HTMLDivElement>document.getElementById('click-selector');
    const hover_selector = <HTMLDivElement>document.getElementById('hover-selector');
    const indicator = <HTMLDivElement>document.getElementById('indicator');

    $preview = !$preview;

    if ($preview) {
      sidebar.style.width = '0';
      properties.style.width = '0';

      click_selector.style.display = 'none';
      hover_selector.style.display = 'none';
      indicator.style.display = 'none';
    } else {
      sidebar.style.width = '';
      properties.style.width = '';

      click_selector.style.display = 'block';
    }
  }

  function exportCode() {
    const styleTag = $iFrameDocument.getElementById('visually-default-stylesheet') as HTMLStyleElement;

    const unHandledCSS = cssRulesToText((styleTag.sheet as CSSStyleSheet).cssRules);
    const formattedCss = beautify.css(minify(unHandledCSS).css, { indent_size: 2 });
    styleTag.textContent = formattedCss;

    let newCode = $iFrameDocument.documentElement.outerHTML;
    navigator.clipboard.writeText(beautify.html(newCode));

    toastStore.trigger({
      message: 'Copied to clipboard',
      background: 'bg-green-700',
      classes: 'pl-[18px] py-[5px]'
    });
  }
</script>

<div
  class="flex justify-between items-center flex-row w-full bg-[#2e2f31] pl-[8px] pr-[12px] border-b border-[#202124] select-none"
>
  <div class="flex flex-row items-center">
    <button class="rounded-full py-[8px] px-[8px] bg-[#393a3c]">
      <object data="../Icons/Header/menu.svg" title="" style="pointer-events: none;" />
    </button>
  </div>

  <div class="flex flex-row py-[8px] gap-[8px]">
    <button
      class="font-sans text-[10px] font-semibold tracking-widest text-center text-[#b8b6b6] rounded-full px-[10px] py-[2px] hover:text-[#d8d4d4]"
      on:click={previewFrame}
    >
      {$preview ? 'VIEW EDITOR' : 'PREVIEW'}
    </button>
    <button
      class="font-sans text-[12px] font-semibold tracking-wide text-center text-[#ebebeb] bg-[#cf672b] rounded-md px-[10px] hover:bg-[#d46a2c] inline-flex items-center gap-[8px]"
      on:click={exportCode}
    >
      <object data="../Icons/Header/export.svg" title="" style="pointer-events: none;" /> Export
    </button>
  </div>
</div>

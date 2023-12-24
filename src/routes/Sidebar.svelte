<script lang="ts">
  import { showPanelComponent } from '../Stores';
  import ElementsPanel from '$lib/PanelComponents/ElementsPanel.svelte';
  import NavigatorPanel from '$lib/PanelComponents/NavigatorPanel.svelte';

  let buttonIdsWithIcons: { [key: string]: string } = {
    'navigator-panel-btn': './Icons/Sidebar/navigator.svg',
    'components-panel-btn': './Icons/Sidebar/components.svg',
    'pages-panel-btn': './Icons/Sidebar/files.svg',
    'uploads-panel-btn': './Icons/Sidebar/folder.svg'
  };

  let activeBtnId: string = '';

  function triggerPanelComponent(e: Event) {
    let clickedBtn = <HTMLButtonElement>e.target;
    if (clickedBtn.tagName !== 'BUTTON') return;

    if (clickedBtn.id === activeBtnId && $showPanelComponent) {
      $showPanelComponent = false;
    } else {
      $showPanelComponent = true;
    }

    activeBtnId = clickedBtn.id;
  }
</script>

<div class="flex flex-row">
  <div
    class="flex flex-col h-full bg-[#2e2f31] py-[14px] gap-[4px] items-center"
    on:click={triggerPanelComponent}
  >
    <button id="elements-panel-btn" class="bg-[#ebe9e9] rounded-full px-[7px] py-[7px] mb-[6px]">
      <object data="./Icons/Sidebar/add.svg" title="" style="pointer-events: none;" />
    </button>

    {#each Object.keys(buttonIdsWithIcons) as buttonId}
      <button
        id={buttonId}
        class={activeBtnId === buttonId && $showPanelComponent
          ? 'px-[12px] py-[12px] bg-[#343638]'
          : 'px-[12px] py-[12px] hover:bg-[#343638]'}
      >
        <object data={buttonIdsWithIcons[buttonId]} title="" style="pointer-events: none;" />
      </button>
    {/each}
  </div>
</div>

<div
  id="panel"
  class={$showPanelComponent
    ? 'flex flex-col ml-[45px] w-[240px] h-full bg-[#2e2f31] border-l-[1px] border-[#202124] absolute z-10 select-none'
    : 'hidden'}
>
  <div id="elements-panel" class={activeBtnId === 'elements-panel-btn' ? 'py-[20px] px-[20px]' : 'hidden'}>
    <ElementsPanel />
  </div>
  <div id="navigator" class={activeBtnId === 'navigator-panel-btn' ? 'py-[20px]' : 'hidden'}>
    <NavigatorPanel />
  </div>
</div>

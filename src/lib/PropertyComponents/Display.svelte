<script lang="ts">
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import { clickedElement, clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  // default styles for each button group
  let displayButtonId: string = 'display-block';
  let alignItemsButtonId: string = 'align-items-stretch';
  let justifyContentButtonId: string = 'justify-content-flex-start';

  let showFlexGroup: boolean = false;
  let showGridGroup: boolean = false;

  // updates the display bar when clicked on the element inside iFrame
  $: {
    if ($clickedElement) {
      displayButtonId = 'display-' + $clickedElementStyle.display;
      // toggle Flex & Grid button groups based on display values
      showFlexGroup = displayButtonId === 'display-flex';
      showGridGroup = displayButtonId === 'display-grid';

      alignItemsButtonId = 'align-items-' + $clickedElementStyle.alignItems;
      justifyContentButtonId = 'justify-content-' + $clickedElementStyle.justifyContent;
    }
  }

  function setDisplayCSS(e: CustomEvent) {
    let clickedButton = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('display', clickedButton.id.replace('display-', ''));
  }

  function setAlignCSS(e: CustomEvent) {
    let clickedButton = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('align-items', clickedButton.id.replace('align-items-', ''));
  }

  function setJustifyCSS(e: CustomEvent) {
    let clickedButton = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('justify-content', clickedButton.id.replace('justify-content-', ''));
  }
</script>

<div class="flex flex-col gap-[12px]">
  <ButtonGroup
    Items={[
      { text: '', iconPath: 'Icons/Display/block.svg' },
      { text: '', iconPath: 'Icons/Display/flex.svg' },
      { text: '', iconPath: 'Icons/Display/grid.svg' },
      { text: '', iconPath: 'Icons/Display/inline-block.svg' },
      { text: '', iconPath: 'Icons/Display/inline.svg' },
      { text: '', iconPath: 'Icons/Display/none.svg' }
    ]}
    ButtonIds={[
      'display-block',
      'display-flex',
      'display-grid',
      'display-inline-block',
      'display-inline',
      'display-none'
    ]}
    bind:activeButtonId={displayButtonId}
    on:click={setDisplayCSS}
  />

  <div class={showFlexGroup ? 'flex flex-col gap-[12px] visible' : 'hidden'}>
    <ButtonGroup
      Items={[
        { text: '', iconPath: 'Icons/Display/Align/start.svg' },
        { text: '', iconPath: 'Icons/Display/Align/center.svg' },
        { text: '', iconPath: 'Icons/Display/Align/end.svg' },
        { text: '', iconPath: 'Icons/Display/Align/stretch.svg' },
        { text: '', iconPath: 'Icons/Display/Align/baseline.svg' }
      ]}
      ButtonIds={[
        'align-items-flex-start',
        'align-items-center',
        'align-items-flex-end',
        'align-items-stretch',
        'align-items-baseline'
      ]}
      bind:activeButtonId={alignItemsButtonId}
      on:click={setAlignCSS}
    />

    <ButtonGroup
      Items={[
        { text: '', iconPath: 'Icons/Display/Justify/start.svg' },
        { text: '', iconPath: 'Icons/Display/Justify/center.svg' },
        { text: '', iconPath: 'Icons/Display/Justify/end.svg' },
        { text: '', iconPath: 'Icons/Display/Justify/between.svg' },
        { text: '', iconPath: 'Icons/Display/Justify/evenly.svg' }
      ]}
      ButtonIds={[
        'justify-content-flex-start',
        'justify-content-center',
        'justify-content-flex-end',
        'justify-content-space-between',
        'justify-content-space-evenly'
      ]}
      bind:activeButtonId={justifyContentButtonId}
      on:click={setJustifyCSS}
    />
  </div>

  <div
    class={showGridGroup
      ? 'visible flex justify-center items-center rounded-[6px] bg-[#404040] border-2 border-[#505050] text-[11px] font-sans font-bold text-[#b8b6b6] text-center h-[34px]'
      : 'hidden'}
  >
    Grid is still under development
  </div>
</div>

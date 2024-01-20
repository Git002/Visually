<script lang="ts">
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import { clickedElement, clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  // Icon paths to be passed to each button group
  const displayIconsArr = [
    { text: '', iconPath: 'Icons/Display/block.svg' },
    { text: '', iconPath: 'Icons/Display/flex.svg' },
    { text: '', iconPath: 'Icons/Display/grid.svg' },
    { text: '', iconPath: 'Icons/Display/inline-block.svg' },
    { text: '', iconPath: 'Icons/Display/inline.svg' },
    { text: '', iconPath: 'Icons/Display/none.svg' }
  ];
  const flexAlignIconsArr = [
    { text: '', iconPath: 'Icons/Display/Align/start.svg' },
    { text: '', iconPath: 'Icons/Display/Align/center.svg' },
    { text: '', iconPath: 'Icons/Display/Align/end.svg' },
    { text: '', iconPath: 'Icons/Display/Align/stretch.svg' },
    { text: '', iconPath: 'Icons/Display/Align/baseline.svg' }
  ];
  const flexJustifyIconsArr = [
    { text: '', iconPath: 'Icons/Display/Justify/start.svg' },
    { text: '', iconPath: 'Icons/Display/Justify/center.svg' },
    { text: '', iconPath: 'Icons/Display/Justify/end.svg' },
    { text: '', iconPath: 'Icons/Display/Justify/between.svg' },
    { text: '', iconPath: 'Icons/Display/Justify/evenly.svg' }
  ];

  // Button IDs with their CSS values
  const displayIdWithValues: { [key: string]: string } = {
    'display-block': 'block',
    'display-flex': 'flex',
    'display-grid': 'grid',
    'display-inline-block': 'inline-block',
    'display-inline': 'inline',
    'display-none': 'none'
  } as const;

  const alignItemsIdWithValues: { [key: string]: string } = {
    'align-items-flex-start': 'flex-start',
    'align-items-center': 'center',
    'align-items-flex-end': 'flex-end',
    'align-items-stretch': 'stretch',
    'align-items-baseline': 'baseline'
  } as const;

  const justifyContentIdWithValues: { [key: string]: string } = {
    'justify-content-flex-start': 'flex-start',
    'justify-content-center': 'center',
    'justify-content-flex-end': 'flex-end',
    'justify-content-space-between': 'space-between',
    'justify-content-space-evenly': 'space-evenly'
  } as const;

  // default styles for each button group
  let displayButtonId: string = 'display-block';
  let alignItemsButtonId: string = 'align-items-stretch';
  let justifyContentButtonId: string = 'justify-content-flex-start';

  let cssUtility = new CSSUtility();

  function setCSS(e: Event) {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') return;

    let clickedButton = e.target as HTMLButtonElement;

    // if button is already active then avoid re-execution of the function
    if ([displayButtonId, alignItemsButtonId, justifyContentButtonId].includes(clickedButton.id)) return;

    if (Object.keys(displayIdWithValues).includes(clickedButton.id)) {
      cssUtility.writeCSS('display', displayIdWithValues[clickedButton.id]);
    } else if (Object.keys(alignItemsIdWithValues).includes(clickedButton.id)) {
      cssUtility.writeCSS('align-items', alignItemsIdWithValues[clickedButton.id]);
    } else if (Object.keys(justifyContentIdWithValues).includes(clickedButton.id)) {
      cssUtility.writeCSS('justify-content', justifyContentIdWithValues[clickedButton.id]);
    }
  }

  let showFlexGroup = false;
  let showGridGroup = false;

  // updates the display bar when clicked on an element inside iFrame
  $: {
    if ($clickedElement) {
      if (Object.values(displayIdWithValues).includes($clickedElementStyle['display'])) {
        displayButtonId = 'display-' + $clickedElementStyle?.['display'];
        showFlexGroup = displayButtonId === 'display-flex';
        showGridGroup = displayButtonId === 'display-grid';
      }
      if (Object.values(alignItemsIdWithValues).includes($clickedElementStyle['align-items'])) {
        alignItemsButtonId = 'align-items-' + $clickedElementStyle?.['align-items'];
      }
      if (Object.values(justifyContentIdWithValues).includes($clickedElementStyle['justify-content'])) {
        justifyContentButtonId = 'justify-content-' + $clickedElementStyle?.['justify-content'];
      }
    }
  }
</script>

<div class="flex flex-col gap-[12px] px-[12px]" on:click={setCSS}>
  <ButtonGroup
    Items={displayIconsArr}
    ButtonIds={Object.keys(displayIdWithValues)}
    bind:activeButtonId={displayButtonId}
  />

  <div class={showFlexGroup ? 'flex flex-col gap-[12px] visible' : 'hidden'}>
    <ButtonGroup
      Items={flexAlignIconsArr}
      ButtonIds={Object.keys(alignItemsIdWithValues)}
      bind:activeButtonId={alignItemsButtonId}
    />
    <ButtonGroup
      Items={flexJustifyIconsArr}
      ButtonIds={Object.keys(justifyContentIdWithValues)}
      bind:activeButtonId={justifyContentButtonId}
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

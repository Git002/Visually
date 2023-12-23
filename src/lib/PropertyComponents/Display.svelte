<script lang="ts">
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import { clickedElement, clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  // for images
  let displayIconsArr = [
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/block.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/flex.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/grid.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/inline-block.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/inline.svg' />"
  ];
  let flexAlignIconsArr = [
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/start.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/center.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/end.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/stretch.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/baseline.svg' />"
  ];
  let flexJustifyIconsArr = [
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/start.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/center.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/end.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/between.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/evenly.svg' />"
  ];

  // Element IDs with their CSS values
  const displayValues: { [key: string]: string } = {
    'display-block': 'block',
    'display-flex': 'flex',
    'display-grid': 'grid',
    'display-inline-block': 'inline-block',
    'display-inline': 'inline'
  } as const;

  const alignItemsValues: { [key: string]: string } = {
    'align-items-flex-start': 'flex-start',
    'align-items-center': 'center',
    'align-items-flex-end': 'flex-end',
    'align-items-stretch': 'stretch',
    'align-items-baseline': 'baseline'
  } as const;

  const justifyContentValues: { [key: string]: string } = {
    'justify-content-flex-start': 'flex-start',
    'justify-content-center': 'center',
    'justify-content-flex-end': 'flex-end',
    'justify-content-space-between': 'space-between',
    'justify-content-space-evenly': 'space-evenly'
  } as const;

  let displayButtonId: string = 'display-block';
  let alignItemsButtonId: string = 'align-items-stretch';
  let justifyContentButtonId: string = 'justify-content-flex-start';

  let cssUtility = new CSSUtility();

  function setCSS(e: Event) {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') return;

    let clickedButton = e.target as HTMLButtonElement;

    // if button is already active then avoid re-execution of the function
    if ([displayButtonId, alignItemsButtonId, justifyContentButtonId].includes(clickedButton.id)) return;

    if (Object.keys(displayValues).includes(clickedButton.id)) {
      cssUtility.writeCSS('display', displayValues[clickedButton.id]);
    } else if (Object.keys(alignItemsValues).includes(clickedButton.id)) {
      cssUtility.writeCSS('align-items', alignItemsValues[clickedButton.id]);
    } else if (Object.keys(justifyContentValues).includes(clickedButton.id)) {
      cssUtility.writeCSS('justify-content', justifyContentValues[clickedButton.id]);
    }
  }

  let showFlexGroup = false;
  let showGridGroup = false;

  // updates the display bar on click inside iFrame
  $: {
    if ($clickedElement) {
      if (Object.values(displayValues).includes($clickedElementStyle?.display)) {
        displayButtonId = 'display-' + $clickedElementStyle?.display;

        showFlexGroup = displayButtonId === 'display-flex';
        showGridGroup = displayButtonId === 'display-grid';
      }
      if (Object.values(alignItemsValues).includes($clickedElementStyle?.alignItems)) {
        alignItemsButtonId = 'align-items-' + $clickedElementStyle?.alignItems;
      }
      if (Object.values(justifyContentValues).includes($clickedElementStyle?.justifyContent)) {
        justifyContentButtonId = 'justify-content-' + $clickedElementStyle?.justifyContent;
      }
    }
  }
</script>

<div class="flex flex-col gap-[12px] mt-[14px] px-[12px]" on:click={setCSS}>
  <ButtonGroup
    Items={displayIconsArr}
    ButtonIds={Object.keys(displayValues)}
    bind:activeButtonId={displayButtonId}
  />

  <div class={showFlexGroup ? 'flex flex-col gap-[12px] visible' : 'hidden'}>
    <ButtonGroup
      Items={flexAlignIconsArr}
      ButtonIds={Object.keys(alignItemsValues)}
      bind:activeButtonId={alignItemsButtonId}
    />
    <ButtonGroup
      Items={flexJustifyIconsArr}
      ButtonIds={Object.keys(justifyContentValues)}
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

<script lang="ts">
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';

  let DisplayArr = [
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/block.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/flex.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/grid.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/inline-block.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/inline.svg' />"
  ];

  let FlexAlignArr = [
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/start.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/center.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/end.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/stretch.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Align/baseline.svg' />"
  ];

  let FlexJustifyArr = [
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/start.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/center.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/end.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/between.svg' />",
    "<img width=15 height=15 style='pointer-events: none;' src='Icons/Display/Justify/evenly.svg' />"
  ];

  let showFlexGroup = false;
  let showGridGroup = false;

  function displayBarHandler(e: Event) {
    let clickedItem = e.target as HTMLButtonElement;
    showFlexGroup = clickedItem.id === 'flex';
    showGridGroup = clickedItem.id === 'grid';
  }
</script>

<div class="flex flex-col gap-[12px]">
  <!-- Button groups -->
  <ButtonGroup
    ItemsArray={DisplayArr}
    IdArray={['block', 'flex', 'grid', 'inline-block', 'inline']}
    customFunction={displayBarHandler}
  />

  <div class={showFlexGroup ? 'flex flex-col gap-[12px] visible' : 'hidden'}>
    <ButtonGroup
      ItemsArray={FlexAlignArr}
      IdArray={[
        'flex-align-start',
        'flex-align-center',
        'flex-align-end',
        'flex-align-stretch',
        'flex-align-baseline'
      ]}
    />
    <ButtonGroup
      ItemsArray={FlexJustifyArr}
      IdArray={[
        'flex-justify-start',
        'flex-justify-center',
        'flex-justify-end',
        'flex-justify-between',
        'flex-justify-evenly'
      ]}
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

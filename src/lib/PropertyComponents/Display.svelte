<script lang="ts">
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';

  let DisplayArr = [
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/block.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/flex.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/grid.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/inline-block.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/inline.svg' />"
  ];

  let FlexAlignArr = [
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Align/start.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Align/center.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Align/end.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Align/stretch.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Align/baseline.svg' />"
  ];

  let FlexJustifyArr = [
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Justify/start.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Justify/center.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Justify/end.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Justify/between.svg' />",
    "<img style='pointer-events: none; width:18px height:18px' src='Icons/Display/Justify/evenly.svg' />"
  ];

  let showFlexGroup = false;

  function displayBarHandler(e: Event) {
    let clickedItem = e.target as HTMLButtonElement;
    if (clickedItem.id === 'flex') {
      showFlexGroup = true;
    } else {
      showFlexGroup = false;
    }
  }
</script>

<div class="flex flex-col px-[10px] gap-[12px]">
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
</div>

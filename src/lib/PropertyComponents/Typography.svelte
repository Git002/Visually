<script lang="ts">
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import { CSSUtility } from '$lib/Modules/cssFunctions';
  import { clickedElement, clickedElementStyle } from '../../Stores';

  let textAlignmentId: string = 'text-align-left';
  let fontStyleId: string = 'font-style-regular';

  // updates the content when clicked on the element inside iFrame
  $: {
    if ($clickedElement) {
      textAlignmentId = 'text-align-' + $clickedElementStyle['text-align'];
      fontStyleId = 'font-style-' + $clickedElementStyle['font-style'];
    }
  }

  function setTextAlignment(e: CustomEvent) {
    let clickedBtn = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('text-align', clickedBtn.id.replace('text-align-', ''));
  }

  function setFontStyle(e: CustomEvent) {
    let clickedBtn = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('font-style', clickedBtn.id.replace('font-style-', ''));
  }
</script>

<div>
  <div class="flex justify-between">
    <ButtonGroup
      Items={[
        { text: '', iconPath: 'Icons/Typography/text-left.svg' },
        { text: '', iconPath: 'Icons/Typography/text-center.svg' },
        { text: '', iconPath: 'Icons/Typography/text-right.svg' },
        { text: '', iconPath: 'Icons/Typography/text-justify.svg' }
      ]}
      ButtonIds={['text-align-left', 'text-align-center', 'text-align-right', 'text-align-justify']}
      bind:activeButtonId={textAlignmentId}
      on:click={setTextAlignment}
    />

    <ButtonGroup
      Items={[
        { text: '', iconPath: 'Icons/Typography/text-regular.svg' },
        { text: '', iconPath: 'Icons/Typography/text-italic.svg' }
      ]}
      ButtonIds={['font-style-normal', 'font-style-italic']}
      bind:activeButtonId={fontStyleId}
      on:click={setFontStyle}
    />
  </div>
</div>

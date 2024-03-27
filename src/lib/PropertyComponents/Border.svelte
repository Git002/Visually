<script lang="ts">
  import { clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';

  function setBorderRadius(e: CustomEvent) {
    let targetInput = e.detail.target;
    if (targetInput.value === targetInput.oldValue) return;

    if (Number(targetInput.value)) {
      CSSUtility.writeCSS(targetInput.id, targetInput.value + 'px');
    } else if (CSS.supports(targetInput.id, targetInput.value)) {
      CSSUtility.writeCSS(targetInput.id, targetInput.value);
    } else {
      targetInput.value = targetInput.oldValue;
    }
  }
</script>

<div class="flex flex-col gap-[10px]">
  <div class="grid grid-cols-2 gap-[10px]">
    <MiniInputBar id={'border-width'} FieldName="Width" value="10" />
    <MiniInputBar
      id={'border-radius'}
      FieldName="Radius"
      value={$clickedElementStyle?.borderRadius}
      on:blur={setBorderRadius}
    />
  </div>

  <div class="grid grid-cols-2 gap-[10px]">
    <MiniInputBar
      id={'border-top-left-radius'}
      Icon={'/Icons/Border/corner.svg'}
      value={$clickedElementStyle?.borderTopLeftRadius}
      on:blur={setBorderRadius}
    />
    <MiniInputBar
      id={'border-top-right-radius'}
      Icon={'/Icons/Border/corner.svg'}
      rowReverse
      rotateIcon={90}
      value={$clickedElementStyle?.borderTopRightRadius}
      on:blur={setBorderRadius}
    />
  </div>

  <div class="grid grid-cols-2 gap-[10px]">
    <MiniInputBar
      id={'border-bottom-left-radius'}
      Icon={'/Icons/Border/corner.svg'}
      rotateIcon={270}
      value={$clickedElementStyle?.borderBottomLeftRadius}
      on:blur={setBorderRadius}
    />
    <MiniInputBar
      id={'border-bottom-right-radius'}
      Icon={'/Icons/Border/corner.svg'}
      rowReverse
      rotateIcon={180}
      value={$clickedElementStyle?.borderBottomRightRadius}
      on:blur={setBorderRadius}
    />
  </div>
</div>

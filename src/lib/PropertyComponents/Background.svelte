<script lang="ts">
  import InputBar from '$lib/UI/InputBar.svelte';
  import { CSSUtility } from '$lib/Modules/cssFunctions';
  import { clickedElementStyle } from '../../Stores';

  function setBackgroundColor(e: CustomEvent) {
    CSSUtility.writeCSS('background-color', e.detail.target.value);
  }
</script>

<InputBar
  id="background-color"
  value={$clickedElementStyle?.backgroundColor ?? '#000000'}
  type="color"
  on:input={setBackgroundColor}
  on:blur={setBackgroundColor}
/>

<script lang="ts">
  import { clickedElementStyle } from '../../Stores';
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import InputBar from '$lib/UI/InputBar.svelte';
  import ButtonGroup from '$lib/UI/ButtonGroup.svelte';
  import { setMiniInputBarStyle } from '$lib/Modules/helperFunctions';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  let activeBorderSwitch: string = 'border-radius-switch';
  let showRadiusSwitch: boolean = true;

  function toggleSwitch() {
    if (activeBorderSwitch === 'border-radius-switch') showRadiusSwitch = true;
    else showRadiusSwitch = false;
  }

  function setBorder(e: CustomEvent) {
    if ($clickedElementStyle.borderWidth !== '0') {
      if ($clickedElementStyle.borderStyle === 'none') CSSUtility.writeCSS('border-style', 'solid');
    }
    setMiniInputBarStyle(e);
  }

  function setBorderColor(e: CustomEvent) {
    CSSUtility.writeCSS('border-color', e.detail.target.value);
  }
</script>

<div class="flex flex-col gap-[12px]">
  <div class="flex gap-[10px]">
    <ButtonGroup
      ButtonIds={['border-radius-switch', 'border-thickness-switch']}
      Items={[
        { text: 'Radius', iconPath: '' },
        { text: 'Thickness', iconPath: '' }
      ]}
      bind:activeButtonId={activeBorderSwitch}
      on:click={toggleSwitch}
      flexGrow
    />

    {#if showRadiusSwitch}
      <MiniInputBar
        id={'border-radius'}
        value={$clickedElementStyle?.borderRadius}
        rowReverse
        on:blur={setMiniInputBarStyle}
      />
    {:else}
      <!-- Border width -->
      <MiniInputBar
        id={'border-width'}
        value={$clickedElementStyle?.borderWidth}
        rowReverse
        on:blur={setBorder}
      />
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-[12px]">
    {#if showRadiusSwitch}
      <MiniInputBar
        id={'border-top-left-radius'}
        Icon={'/Icons/Border/corner.svg'}
        value={$clickedElementStyle?.borderTopLeftRadius}
        on:blur={setMiniInputBarStyle}
      />
      <MiniInputBar
        id={'border-top-right-radius'}
        Icon={'/Icons/Border/corner.svg'}
        rowReverse
        rotateIcon={90}
        value={$clickedElementStyle?.borderTopRightRadius}
        on:blur={setMiniInputBarStyle}
      />
    {:else}
      <!-- Border width -->
      <MiniInputBar
        id={'border-top-width'}
        FieldName="Top"
        value={$clickedElementStyle?.borderTopWidth}
        on:blur={setMiniInputBarStyle}
      />
      <MiniInputBar
        id={'border-bottom-width'}
        FieldName="Bottom"
        value={$clickedElementStyle?.borderBottomWidth}
        on:blur={setMiniInputBarStyle}
      />
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-[12px]">
    {#if showRadiusSwitch}
      <MiniInputBar
        id={'border-bottom-left-radius'}
        Icon={'/Icons/Border/corner.svg'}
        rotateIcon={270}
        value={$clickedElementStyle?.borderBottomLeftRadius}
        on:blur={setMiniInputBarStyle}
      />
      <MiniInputBar
        id={'border-bottom-right-radius'}
        Icon={'/Icons/Border/corner.svg'}
        rowReverse
        rotateIcon={180}
        value={$clickedElementStyle?.borderBottomRightRadius}
        on:blur={setMiniInputBarStyle}
      />
    {:else}
      <!-- Border width -->
      <MiniInputBar
        id={'border-left-width'}
        FieldName="Left"
        value={$clickedElementStyle?.borderLeftWidth}
        on:blur={setMiniInputBarStyle}
      />
      <MiniInputBar
        id={'border-right-width'}
        FieldName="Right"
        value={$clickedElementStyle?.borderRightWidth}
        on:blur={setMiniInputBarStyle}
      />
    {/if}
  </div>

  <InputBar
    id="border-color"
    value={$clickedElementStyle?.borderColor ?? '#000000'}
    type="color"
    on:input={setBorderColor}
    on:blur={setBorderColor}
  />
</div>

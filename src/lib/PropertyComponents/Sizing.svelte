<script lang="ts">
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
  import { clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';
  import { setMiniInputBarStyle } from '$lib/Modules/helperFunctions';

  function setOverflow(e: CustomEvent) {
    let targetButton = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('overflow', targetButton.textContent as string);
  }
</script>

<div class="flex flex-col gap-[12px] text-[10px] tracking-wide text-[#b8b6b6]">
  <div class="grid grid-cols-2 gap-[12px]">
    <MiniInputBar
      id={'width'}
      FieldName={'width'}
      value={$clickedElementStyle?.width}
      on:blur={setMiniInputBarStyle}
    />
    <MiniInputBar
      id={'height'}
      FieldName={'height'}
      value={$clickedElementStyle?.height}
      on:blur={setMiniInputBarStyle}
    />
    <MiniInputBar
      id={'min-width'}
      FieldName={'min w'}
      value={$clickedElementStyle?.minWidth}
      on:blur={setMiniInputBarStyle}
    />
    <MiniInputBar
      id={'min-height'}
      FieldName={'min h'}
      value={$clickedElementStyle?.minHeight}
      on:blur={setMiniInputBarStyle}
    />
    <MiniInputBar
      id={'max-width'}
      FieldName={'max w'}
      value={$clickedElementStyle?.maxWidth}
      on:blur={setMiniInputBarStyle}
    />
    <MiniInputBar
      id={'max-height'}
      FieldName={'max h'}
      value={$clickedElementStyle?.maxHeight}
      on:blur={setMiniInputBarStyle}
    />
  </div>

  <div class="grid grid-cols-10 items-center">
    <div class="col-span-3 text-[12px] font-semibold">Overflow</div>
    <div class="col-span-7">
      <Dropdown
        id={'overflowDropdown'}
        DropdownBtnText={$clickedElementStyle?.overflow}
        ItemsArray={['auto', 'hidden', 'visible', 'scroll']}
        on:click={setOverflow}
      />
    </div>
  </div>
</div>

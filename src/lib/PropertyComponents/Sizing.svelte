<script lang="ts">
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
  import { clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  function setSizing(e: CustomEvent) {
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

  function setOverflow(e: CustomEvent) {
    let targetButton = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('overflow', targetButton.textContent as string);
  }
</script>

<div class="flex flex-col gap-[10px] text-[10px] tracking-wide text-[#b8b6b6]">
  <div class="grid grid-cols-2 gap-[10px]">
    <MiniInputBar id={'width'} FieldName={'width'} value={$clickedElementStyle?.width} on:blur={setSizing} />
    <MiniInputBar
      id={'height'}
      FieldName={'height'}
      value={$clickedElementStyle?.height}
      on:blur={setSizing}
    />
    <MiniInputBar
      id={'min-width'}
      FieldName={'min w'}
      value={$clickedElementStyle?.minWidth}
      on:blur={setSizing}
    />
    <MiniInputBar
      id={'min-height'}
      FieldName={'min h'}
      value={$clickedElementStyle?.minHeight}
      on:blur={setSizing}
    />
    <MiniInputBar
      id={'max-width'}
      FieldName={'max w'}
      value={$clickedElementStyle?.maxWidth}
      on:blur={setSizing}
    />
    <MiniInputBar
      id={'max-height'}
      FieldName={'max h'}
      value={$clickedElementStyle?.maxHeight}
      on:blur={setSizing}
    />
  </div>

  <div class="grid grid-cols-4 items-center gap-[30px]">
    <div class="text-[12px] font-bold">Overflow</div>
    <div class="col-span-3">
      <Dropdown
        DropdownBtnText={$clickedElementStyle?.overflow}
        ItemsArray={['auto', 'hidden', 'visible', 'scroll']}
        on:click={setOverflow}
      />
    </div>
  </div>
</div>

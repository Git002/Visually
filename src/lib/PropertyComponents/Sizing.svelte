<script lang="ts">
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
  import { clickedElement, clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  let cssUtility = new CSSUtility();

  let inputFields: { id: any & CSSStyleDeclaration; FieldName: string; value: any & CSSStyleDeclaration }[] =
    [
      { id: 'width', FieldName: 'width', value: $clickedElementStyle?.['width'] },
      { id: 'height', FieldName: 'height', value: $clickedElementStyle?.['height'] },
      { id: 'min-width', FieldName: 'min w', value: $clickedElementStyle?.['min-width'] },
      { id: 'min-height', FieldName: 'min h', value: $clickedElementStyle?.['min-height'] },
      { id: 'max-width', FieldName: 'max w', value: $clickedElementStyle?.['max-width'] },
      { id: 'max-height', FieldName: 'max h', value: $clickedElementStyle?.['max-height'] }
    ];

  let dropdownBtnText: string;

  $: {
    if ($clickedElementStyle) {
      inputFields.forEach((field) => (field.value = $clickedElementStyle[field.id]));
      inputFields = inputFields;

      dropdownBtnText = $clickedElementStyle.overflow;
    }
  }

  function incrementDecrementValue(e: CustomEvent) {
    const input = <HTMLInputElement>e.detail.target;
    const inputValue = parseInt(input.value);

    // if value is NaN like 'Auto' then, get the computedStyle that will give its numeric value like 1020.8 or so and then you can increment that value up/down
    if (isNaN(inputValue)) {
      let computedValue: any = getComputedStyle($clickedElement)[input.id as keyof CSSStyleDeclaration];
      if (computedValue) input.value = computedValue;
      return;
    }

    if (e.detail.key === 'ArrowUp') {
      input.value = String(inputValue + 1);
    } else if (e.detail.key === 'ArrowDown' && inputValue !== 0) {
      input.value = String(inputValue - 1);
    }
  }

  function applySizingCSS(e: CustomEvent) {
    let targetInput = e.detail.target;
    if (targetInput.value === targetInput.oldValue) return;

    if (Number(targetInput.value)) {
      cssUtility.writeCSS(targetInput.id, targetInput.value + 'px');
    } else if (CSS.supports(targetInput.id, targetInput.value)) {
      cssUtility.writeCSS(targetInput.id, targetInput.value);
    } else {
      targetInput.value = targetInput.oldValue;
    }
  }

  function applyOverflowCSS(e: CustomEvent) {
    let targetButton = e.detail.target as HTMLButtonElement;
    cssUtility.writeCSS('overflow', targetButton.textContent!);
  }
</script>

<div class="flex flex-col gap-[10px] text-[10px] px-[12px] tracking-wide text-[#b8b6b6]">
  <div class="grid grid-cols-2 gap-[10px]">
    {#each inputFields as { id, FieldName, value }}
      <MiniInputBar
        {id}
        {FieldName}
        {value}
        on:blur={applySizingCSS}
        on:arrowUpDown={incrementDecrementValue}
      />
    {/each}
  </div>

  <div class="flex flex-row justify-between items-center gap-[10px]">
    <div class="text-[12px] font-bold">Overflow</div>
    <Dropdown
      DropdownBtnText={$clickedElementStyle?.overflow}
      ItemsArray={['auto', 'hidden', 'visible', 'scroll']}
      on:click={applyOverflowCSS}
    />
  </div>
</div>

<script lang="ts">
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
  import { clickedElement, clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  let cssUtility = new CSSUtility();

  let inputFields: { id: string; FieldName: string; key: string; value: any }[] = [
    { id: 'width', FieldName: 'width', key: 'width', value: $clickedElementStyle?.width },
    { id: 'height', FieldName: 'height', key: 'height', value: $clickedElementStyle?.height },
    { id: 'min-width', FieldName: 'min w', key: 'minWidth', value: $clickedElementStyle?.minWidth },
    { id: 'min-height', FieldName: 'min h', key: 'minHeight', value: $clickedElementStyle?.minHeight },
    { id: 'max-width', FieldName: 'max w', key: 'maxWidth', value: $clickedElementStyle?.maxWidth },
    { id: 'max-height', FieldName: 'max h', key: 'maxHeight', value: $clickedElementStyle?.maxHeight }
  ];

  $: {
    if ($clickedElementStyle) {
      inputFields.forEach((field) => {
        field.value = $clickedElementStyle[field.key as keyof CSSStyleDeclaration];
      });
      inputFields = inputFields;
    }
  }

  function incrementDecrementValue(e: CustomEvent) {
    const input = <HTMLInputElement>e.detail.target;
    const inputValue = parseInt(input.value);

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

  function handleBlur(e: any) {
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
</script>

<div class="flex flex-col gap-[10px] text-[10px] tracking-wide text-[#b8b6b6]">
  <div class="grid grid-cols-2 gap-[10px]">
    {#each inputFields as { id, FieldName, value }}
      <MiniInputBar {id} {FieldName} {value} on:blur={handleBlur} on:arrowUpDown={incrementDecrementValue} />
    {/each}
  </div>

  <div class="flex flex-row justify-between items-center gap-[10px]">
    <div class="text-[12px] font-bold">Overflow</div>
    <Dropdown DropdownBtnText="Auto" ItemsArray={['Auto', 'Hidden', 'Visible', 'Scroll']} />
  </div>
</div>

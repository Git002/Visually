<script lang="ts">
  import Input from '$lib/UI/Input.svelte';
  import { clickedElementStyle } from '../../Stores';
  import { CSSUtility } from '$lib/Modules/cssFunctions';

  function incrementDecrementValue(e: CustomEvent) {
    const input = <HTMLInputElement>e.detail.target;
    const inputValue = parseInt(input.value);

    if (e.detail.key === 'ArrowUp') {
      input.value = String(inputValue + 1);
    } else if (e.detail.key === 'ArrowDown') {
      input.value = String(inputValue - 1);
    }
  }

  function applyCSS(e: any) {
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

<div
  class="grid grid-cols-4 rounded-[6px] bg-[#404040] text-[12px] px-[8px] py-[10px] border-2 border-[#505050] text-[#b8b6b6] text-center items-center w-full gap-[8px] relative"
>
  <div class="absolute top-[4px] left-[6px] text-[8px] tracking-wider font-semibold text-[#9a9898]">
    MARGIN
  </div>

  <div class="col-span-6">
    <Input
      id="margin-top"
      Class="my-[2px] text-center"
      value={$clickedElementStyle?.marginTop}
      on:blur={applyCSS}
      on:arrowUpDown={incrementDecrementValue}
    />
  </div>
  <Input
    id="margin-left"
    Class="mt-[6px] text-center"
    value={$clickedElementStyle?.marginLeft}
    on:blur={applyCSS}
    on:arrowUpDown={incrementDecrementValue}
  />

  <div
    class="grid grid-cols-3 col-span-4 rounded-[6px] border-[3px] border-[#2e2f31] px-[4px] py-[10px] gap-y-[8px] relative"
  >
    <div class="absolute top-[4px] left-[6px] text-[8px] tracking-wider font-semibold text-[#9a9898]">
      PADDING
    </div>

    <div class="col-span-3">
      <Input
        id="padding-top"
        Class="mt-[6px] text-center"
        value={$clickedElementStyle?.paddingTop}
        on:blur={applyCSS}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>
    <div>
      <Input
        id="padding-left"
        Class="text-center"
        value={$clickedElementStyle?.paddingLeft}
        on:blur={applyCSS}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>

    <!---- Inner box ---->
    <div class="flex items-center justify-center">
      <div class="bg-[#2e2f31] h-[16px] w-[28px] rounded-[4px]" />
    </div>

    <div>
      <Input
        id="padding-right"
        Class="text-center"
        value={$clickedElementStyle?.paddingRight}
        on:blur={applyCSS}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>
    <div class="col-span-3">
      <Input
        id="padding-bottom"
        Class="text-center"
        value={$clickedElementStyle?.paddingBottom}
        on:blur={applyCSS}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>
  </div>

  <div>
    <Input
      id="margin-right"
      Class="mt-[6px] text-center"
      value={$clickedElementStyle?.marginRight}
      on:blur={applyCSS}
      on:arrowUpDown={incrementDecrementValue}
    />
  </div>

  <div class="col-span-6">
    <Input
      id="margin-bottom"
      Class="my-[2px] text-center"
      value={$clickedElementStyle?.marginBottom}
      on:blur={applyCSS}
      on:arrowUpDown={incrementDecrementValue}
    />
  </div>
</div>

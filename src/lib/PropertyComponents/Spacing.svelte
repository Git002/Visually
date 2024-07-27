<script lang="ts">
  import Input from '$lib/UI/Input.svelte';
  import { clickedElementStyle } from '../../Stores';
  import { applyChanges } from '$lib/Modules/helperFunctions';

  function incrementDecrementValue(e: CustomEvent) {
    const input = <HTMLInputElement>e.detail.target;
    const inputValue = parseInt(input.value);

    if (e.detail.key === 'ArrowUp') {
      input.value = String(inputValue + 1);
    } else if (e.detail.key === 'ArrowDown') {
      input.value = String(inputValue - 1);
    }
  }
</script>

<div
  class="grid grid-cols-4 rounded-[6px] bg-[#404040] text-[12px] px-[8px] py-[6px] border-2 border-[#505050] text-[#b8b6b6] text-center items-center w-full gap-[8px] relative"
>
  <div class="absolute top-[2px] left-[8px] text-[8px] tracking-wider font-semibold text-[#9a9898]">
    MARGIN
  </div>

  <div class="col-span-6">
    <Input
      id="margin-top"
      Class="my-[2px] text-center"
      value={$clickedElementStyle?.marginTop}
      on:blur={applyChanges}
      on:arrowUpDown={incrementDecrementValue}
    />
  </div>
  <Input
    id="margin-left"
    Class="mt-[12px] text-center"
    value={$clickedElementStyle?.marginLeft}
    on:blur={applyChanges}
    on:arrowUpDown={incrementDecrementValue}
  />

  <div
    class="grid grid-cols-3 col-span-4 rounded-[6px] border-[3px] border-[#2e2f31] px-[4px] py-[8px] gap-y-[4px] relative"
  >
    <div class="absolute left-[8px] text-[8px] tracking-wider font-semibold text-[#9a9898]">PADDING</div>

    <div class="col-span-3">
      <Input
        id="padding-top"
        Class="mt-[12px] text-center"
        value={$clickedElementStyle?.paddingTop}
        on:blur={applyChanges}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>
    <div>
      <Input
        id="padding-left"
        Class="text-center"
        value={$clickedElementStyle?.paddingLeft}
        on:blur={applyChanges}
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
        on:blur={applyChanges}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>
    <div class="col-span-3">
      <Input
        id="padding-bottom"
        Class="text-center"
        value={$clickedElementStyle?.paddingBottom}
        on:blur={applyChanges}
        on:arrowUpDown={incrementDecrementValue}
      />
    </div>
  </div>

  <div>
    <Input
      id="margin-right"
      Class="mt-[12px] text-center"
      value={$clickedElementStyle?.marginRight}
      on:blur={applyChanges}
      on:arrowUpDown={incrementDecrementValue}
    />
  </div>

  <div class="col-span-6">
    <Input
      id="margin-bottom"
      Class="my-[2px] text-center"
      value={$clickedElementStyle?.marginBottom}
      on:blur={applyChanges}
      on:arrowUpDown={incrementDecrementValue}
    />
  </div>
</div>

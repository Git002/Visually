<script lang="ts">
  import Input from '$lib/UI/Input.svelte';
</script>

<div
  class="grid grid-cols-4 rounded-[6px] bg-[#404040] text-[12px] px-[8px] py-[8px] border-2 border-[#505050] text-[#b8b6b6] text-center items-center w-full gap-[8px] relative"
>
  <div
    class="absolute top-[4px] left-[6px] text-[8px] tracking-wider font-semibold text-[#9a9898] italic"
  >
    MARGIN
  </div>
  <div class="col-span-6">
    <Input value="10" Class="mt-[2px]" />
  </div>
  <Input value="40" Class="mt-[6px]" />

  <!-- Padding -->
  <div
    class="grid grid-cols-3 col-span-4 rounded-[6px] border-[3px] border-[#2e2f31] px-[4px] py-[10px] gap-y-[8px] relative"
  >
    <div
      class="absolute top-[4px] left-[6px] text-[8px] tracking-wider font-semibold text-[#9a9898] italic"
    >
      PADDING
    </div>
    <div class="col-span-3">
      <Input value="20" Class="mt-[6px]" />
    </div>
    <div>
      <Input value="30" />
    </div>

    <!-- Inner box -->
    <div class="flex items-center justify-center">
      <div class="bg-[#2e2f31] h-[16px] w-[28px] rounded-[4px]" />
    </div>
    <div>
      <Input value="50" />
    </div>
    <div class="col-span-3">
      <Input value="70" />
    </div>
  </div>
  <div>
    <Input value="40" Class="mt-[6px]" />
  </div>
  <div />
  <div class="col-span-4">
    <Input value="10" Class="my-[2px]" />
  </div>
  <div />
</div>

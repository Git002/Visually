<script lang="ts">
  import Selector from '../lib/PropertyComponents/Selector.svelte';
</script>

<div class="flex flex-col gap-[12px]">
  <Selector />
  <div
    class="flex justify-between items-center bg-[#292a2c] px-[15px] py-[5px] font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4]"
  >
    PROPERTIES

    <span
      class="flex items-center bg-[#404040] text-[#b8b6b6] text-[10px] font-semibold px-[8px] py-[1px] rounded"
      style="align-items: center !important">On Hover</span
    >
  </div>
</div>

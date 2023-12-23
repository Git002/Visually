<script lang="ts">
  import Accordion from '$lib/UI/Accordion.svelte';
  import Selector from '../lib/PropertyComponents/Selector.svelte';
  import Display from '$lib/PropertyComponents/Display.svelte';
  import Spacing from '$lib/PropertyComponents/Spacing.svelte';
  import Sizing from '$lib/PropertyComponents/Sizing.svelte';
</script>

<div class="flex flex-col select-none max-h-[94vh]">
  <div
    class="flex items-center bg-[#292a2c] px-[12px] py-[5px] font-sans text-[10px] font-bold tracking-wider text-[#b7b4b4]"
  >
    SELECTOR
  </div>
  <Selector />

  <div
    class="flex items-center bg-[#292a2c] px-[12px] py-[5px] font-sans text-[10px] font-bold tracking-wider text-[#b7b4b4]"
  >
    PROPERTIES
  </div>
  <div id="properties-panel" class="overflow-auto">
    <Accordion ItemName="Display">
      <Display />
    </Accordion>
    <Accordion ItemName="Spacing">
      <Spacing />
    </Accordion>
    <Accordion ItemName="Sizing">
      <Sizing />
    </Accordion>
  </div>
</div>

<style>
  #properties-panel::-webkit-scrollbar {
    display: none;
  }
</style>

<script lang="ts">
  import Accordion from '$lib/UIComponents/Accordion.svelte';
  import Selector from '../lib/PropertyComponents/Selector.svelte';
  import Display from '$lib/PropertyComponents/Display.svelte';
  import Spacing from '$lib/PropertyComponents/Spacing.svelte';
  import Sizing from '$lib/PropertyComponents/Sizing.svelte';

  let arr = { Display, Spacing, Sizing };
</script>

<div class="flex flex-col select-none">
  <div
    class="flex items-center bg-[#292a2c] px-[14px] py-[5px] font-sans text-[10px] font-bold tracking-wider text-[#b7b4b4]"
  >
    SELECTOR
  </div>
  <Selector />

  <div
    class="flex items-center bg-[#292a2c] px-[14px] py-[5px] font-sans text-[10px] font-bold tracking-wider text-[#b7b4b4]"
  >
    PROPERTIES
  </div>
  <div id="properties-panel" class="overflow-auto h-screen pb-[200px]">
    <Accordion componentsArray={arr} />
  </div>
</div>

<style>
  #properties-panel::-webkit-scrollbar {
    display: none;
  }
</style>

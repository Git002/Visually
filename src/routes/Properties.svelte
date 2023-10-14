<script lang="ts">
  import Accordion from '$lib/UIComponents/Accordion.svelte';
  import Selector from '../lib/PropertyComponents/Selector.svelte';
  import Display from '$lib/PropertyComponents/Display.svelte';
  import Sizing from '$lib/PropertyComponents/Sizing.svelte';

  let arr = { Display, Sizing };
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
  <Accordion componentsArray={arr} />
</div>

<script lang="ts">
  import Selector from '../lib/PropertyComponents/Selector.svelte';
  import Display from '$lib/PropertyComponents/Display.svelte';
  import Accordion from '$lib/UIComponents/Accordion.svelte';

  let arr = { Display: Display };
</script>

<div class="flex flex-col gap-[12px] select-none">
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
  <Accordion componentsArray={arr} />
</div>

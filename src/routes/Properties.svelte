<script lang="ts">
  import Accordion from '$lib/UI/Accordion.svelte';
  import Selector from '../lib/PropertyComponents/Selector.svelte';

  import Display from '$lib/PropertyComponents/Display.svelte';
  import Spacing from '$lib/PropertyComponents/Spacing.svelte';
  import Sizing from '$lib/PropertyComponents/Sizing.svelte';
  import Typography from '$lib/PropertyComponents/Typography.svelte';
  import Border from '$lib/PropertyComponents/Border.svelte';
  import Background from '$lib/PropertyComponents/Background.svelte';
</script>

<div class="flex flex-col select-none max-h-[94vh]">
  <div
    class="flex items-center bg-[#292a2c] px-[12px] py-[2px] font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4]"
  >
    SELECTOR
  </div>
  <Selector />

  <div
    class="flex items-center bg-[#292a2c] px-[12px] py-[2px] font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4]"
  >
    PROPERTIES
  </div>
  <div id="properties-panel" class="overflow-auto hide-scrollbar">
    <Accordion ItemName="Display">
      <Display />
    </Accordion>
    <Accordion ItemName="Spacing">
      <Spacing />
    </Accordion>
    <Accordion ItemName="Sizing">
      <Sizing />
    </Accordion>
    <Accordion ItemName="Typography">
      <Typography />
    </Accordion>
    <Accordion ItemName="Border">
      <Border />
    </Accordion>
    <Accordion ItemName="Background">
      <Background />
    </Accordion>
  </div>
</div>

<style>
</style>

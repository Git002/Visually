<script lang="ts">
  import { onMount } from 'svelte';
  import { showPanelComponent } from '../Stores';

  onMount(() => {
    document.addEventListener('dragover', () => {
      showPanelComponent.update(() => false);
    });
  });
</script>

<div class="flex flex-row">
  <div class="flex flex-col h-full bg-[#2e2f31] py-[14px] px-[8px] gap-[30px] items-center">
    <button
      id="addNew"
      class="bg-[#ebe9e9] rounded-full px-[8px] py-[8px]"
      on:click={() => showPanelComponent.update(() => !$showPanelComponent)}
    >
      <object data="./Icons/add.svg" title="" style="pointer-events: none;" /></button
    >

    <button>
      <object data="./Icons/components.svg" title="" style="pointer-events: none;" />
    </button>

    <button>
      <object data="./Icons/files.svg" title="" style="pointer-events: none;" />
    </button>

    <button>
      <object data="./Icons/folder.svg" title="" style="pointer-events: none;" />
    </button>
  </div>

  <!-- <Panel /> -->
</div>

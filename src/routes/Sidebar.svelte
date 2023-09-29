<script lang="ts">
  import { onMount } from 'svelte';
  import { show } from '../Stores';

  onMount(() => {
    document.addEventListener('dragover', () => {
      show.update(() => false);
    });
  });
</script>

<div class="flex flex-row">
  <div class="flex flex-col h-full bg-[#2e2f31] py-[14px] px-[8px] gap-[30px] items-center">
    <button
      id="addNew"
      class="font-sans text-[17px] text-black bg-[#ebe9e9] rounded-lg px-[7px]"
      on:click={() => show.update(() => !$show)}>+</button
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

<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    let show = false;
    document.getElementById('addNew')!.addEventListener('click', () => {
      if (show) {
        show = false;
        document.getElementById('showPanel')!.style.visibility = 'hidden';
      } else {
        show = true;
        document.getElementById('showPanel')!.style.visibility = 'visible';
      }
    });

    document.addEventListener('dragover', () => {
      show = false;
      document.getElementById('showPanel')!.style.visibility = 'hidden';
    });
  });
</script>

<div class="flex flex-row">
  <div class="flex flex-col h-full bg-[#2e2f31] py-[12px] px-[10px] gap-[30px] items-center">
    <button
      id="addNew"
      class="font-sans text-center text-[17px] text-black bg-[#ebe9e9] rounded-full px-[7px]"
      >+</button
    >

    <button>
      <object data="./src/Icons/components.svg" title="" style="pointer-events: none;" />
    </button>

    <button>
      <object data="./src/Icons/files.svg" title="" style="pointer-events: none;" />
    </button>

    <button>
      <object data="./src/Icons/folder.svg" title="" style="pointer-events: none;" />
    </button>
  </div>

  <!-- <Panel /> -->
</div>

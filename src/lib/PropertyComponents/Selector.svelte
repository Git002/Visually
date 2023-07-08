<script lang="ts">
  import Dropdown from '../Components/Dropdown.svelte';

  let dropItems = ['None', 'On Hover', 'On Press', 'On Focus'];
</script>

<div class="flex flex-col gap-[12px]">
  <div
    class="bg-[#292a2c] px-[15px] py-[5px] font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4]"
  >
    SELECTOR
  </div>

  <div class="flex px-[15px] gap-[8px]">
    <!-- Button group -->
    <div
      class="flex justify-between rounded-[6px] bg-[#404040] border-2 border-[#505050] text-[12px] font-sans font-bold tracking-widest"
    >
      <button type="button" class="py-[6px] px-[10px] rounded-[5px] bg-[#2e2f31] text-[#b8b6b6]">
        Class
      </button>
      <button type="button" class="py-[6px] px-[12px] rounded-[5px] text-[#b8b6b6]"> ID </button>
    </div>

    <!-- dropdown -->
    <Dropdown DropdownName={'Set state'} ItemsArray={dropItems} />
  </div>
</div>

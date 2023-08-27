<script lang="ts">
  import Dropdown from '../UIComponents/Dropdown.svelte';
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';
</script>

<div class="flex flex-col gap-[12px]">
  <div
    class="flex items-center bg-[#292a2c] px-[15px] py-[5px] font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4]"
  >
    SELECTOR
  </div>

  <div class="flex px-[15px] gap-[8px]">
    <!-- Button group -->
    <ButtonGroup ItemsArray={['Class', 'ID']} IdArray={['selector_class', 'selector_id']} />

    <!-- dropdown -->
    <Dropdown
      DropdownName={'Set state'}
      ItemsArray={['None', 'On Hover', 'On Press', 'On Focus']}
    />
  </div>
</div>

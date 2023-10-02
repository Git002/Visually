<script lang="ts" context="module">
  import Dropdown from '../UIComponents/Dropdown.svelte';
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';
</script>

<div class="flex justify-between px-[10px] gap-[10px]">
  <!-- Button group -->
  <ButtonGroup ItemsArray={['Class', 'ID']} IdArray={['selector_class', 'selector_id']} />

  <!-- dropdown -->
  <Dropdown
    DropdownBtnText={'Set State'}
    ItemsArray={['Default', 'On Hover', 'On Press', 'On Focus']}
  />
</div>

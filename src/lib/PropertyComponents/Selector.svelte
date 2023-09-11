<script lang="ts" context="module">
  import Dropdown from '../UIComponents/Dropdown.svelte';
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';
</script>

<div class="flex px-[15px] gap-[8px]">
  <!-- Button group -->
  <ButtonGroup ItemsArray={['Class', 'ID']} IdArray={['selector_class', 'selector_id']} />

  <!-- dropdown -->
  <Dropdown DropdownName={'Default'} ItemsArray={['Default', 'On Hover', 'On Press', 'On Focus']} />
</div>

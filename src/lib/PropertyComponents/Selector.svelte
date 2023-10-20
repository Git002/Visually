<script lang="ts">
  import Dropdown from '../UIComponents/Dropdown.svelte';
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';
  import Input from '$lib/UIComponents/Input.svelte';

  let classInputOpen = true;
  let idInputOpen = false;

  function toggleClassId(e: Event) {
    let clickedBtn = e.target as HTMLButtonElement;
    if (clickedBtn.id === 'selector-class') {
      classInputOpen = true;
      idInputOpen = false;
    } else if (clickedBtn.id === 'selector-id') {
      classInputOpen = false;
      idInputOpen = true;
    }
  }
</script>

<div class="flex flex-col px-[14px] py-[12px] gap-[10px]">
  <div class="flex justify-between gap-[8px]">
    <!-- Button group -->
    <ButtonGroup
      ItemsArray={['Class', 'ID']}
      IdArray={['selector-class', 'selector-id']}
      customFunction={toggleClassId}
    />

    <!-- dropdown -->
    <Dropdown
      DropdownBtnText={'Set State'}
      ItemsArray={['Default', 'On Hover', 'On Press', 'On Focus']}
    />
  </div>

  <Input show={classInputOpen} id={'class-input'} placeholder={'add a new class'} />
  <Input show={idInputOpen} id={'id-input'} placeholder={'add a new ID'} />
</div>

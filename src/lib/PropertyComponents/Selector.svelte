<script lang="ts">
  import Dropdown from '../UI/Dropdown.svelte';
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import Input from '$lib/UI/Input.svelte';
  import TagInput from '$lib/UI/TagInput.svelte';

  // show/hide class & ID input on button click
  function toggleClassId(e: Event) {
    let clickedBtn = e.target as HTMLButtonElement;
    let classInput = <HTMLInputElement>document.querySelector('#class-input');
    let idInput = <HTMLInputElement>document.querySelector('.id-input');

    classInput.classList.toggle('hidden', clickedBtn.id === 'selector-id-btn');
    idInput.classList.toggle('hidden', clickedBtn.id === 'selector-class-btn');
  }
</script>

<div class="flex flex-col px-[14px] py-[12px] gap-[10px]">
  <div class="flex justify-between gap-[8px]">
    <ButtonGroup
      ItemsArray={['Class', 'ID']}
      IdArray={['selector-class-btn', 'selector-id-btn']}
      customFunction={toggleClassId}
    />

    <Dropdown
      DropdownBtnText={'Set State'}
      ItemsArray={['Default', 'On Hover', 'On Press', 'On Focus']}
    />
  </div>

  <TagInput placeholder={'Add a new class'} id={'class-input'} />
  <Input placeholder={'Add a new id'} Class={'id-input hidden'} />
</div>

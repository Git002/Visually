<script lang="ts">
  import { onMount } from 'svelte';
  import Dropdown from '../UIComponents/Dropdown.svelte';
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';
  import Input from '$lib/UIComponents/Input.svelte';
  import Tagify from '@yaireo/tagify';
  import '@yaireo/tagify/dist/tagify.css';

  function toggleClassId(e: Event) {
    let clickedBtn = e.target as HTMLButtonElement;
    let classInput = <HTMLInputElement>document.querySelector('.tagify.tag-input');
    let idInput = <HTMLInputElement>document.querySelector('.id-input');

    if (clickedBtn.id === 'selector-class-btn') {
      classInput.classList.remove('hidden');
      idInput.classList.add('hidden');
    } else if (clickedBtn.id === 'selector-id-btn') {
      idInput.classList.remove('hidden');
      classInput.classList.add('hidden');
    }
  }

  onMount(() => {
    let classInput = <HTMLInputElement>document.querySelector('.tag-input');
    let tagify = new Tagify(classInput);
  });
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

  <Input placeholder={'Add a new class'} Class={'tag-input'} />
  <Input placeholder={'Add a new id'} Class={'id-input hidden'} />
</div>

<style>
  :global(.tag-input) {
    --tag-bg: #0070e7;
    --tag-hover: #0070e7c1;
    --tags-hover-border-color: #0070e7c1;
    --tags-focus-border-color: #0070e7c1;
    --tag-text-color: #ebe9e9;
    --tag-remove-btn-color: #ebe9e9;
    --placeholder-color: #b8b6b6a1;
    --placeholder-color-focus: #b8b6b6a1;
    --input-color: #b8b6b6;
    --tag-hide-transition: 0s;
    --loader-size: 0em;
    --tag-text-color--edit: #b8b6b6;
    --tag-inset-shadow-size: 20px;
    --tag-pad: 4px;
    border-color: #505050;
    border-width: 2px;
    border-radius: 5px;
  }
</style>

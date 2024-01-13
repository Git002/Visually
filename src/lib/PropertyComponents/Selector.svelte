<script lang="ts">
  import Dropdown from '../UI/Dropdown.svelte';
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import InputBar from '../UI/InputBar.svelte';
  import TagInputBar, { tagifyInstance, tagifyInput } from '../UI/TagInputBar.svelte';
  import { clickedElement, currentCSSPseudoClass } from '../../Stores';

  // update the values of each input on click
  $: {
    if ($clickedElement) {
      // for class input --->
      if (tagifyInstance) {
        let clickedElementClassArray = Array.from($clickedElement.classList);

        tagifyInstance.removeAllTags();
        tagifyInstance.addTags(clickedElementClassArray);

        if (tagifyInstance.getCleanValue().length === 0) {
          tagifyInput.setAttribute('data-placeholder', 'Add a class');
        }
      }

      // for ID input --->
      let idInput = <HTMLInputElement>document.getElementById('id-input');
      if (idInput) idInput.value = $clickedElement.id;
    }
  }

  function addClass(e: CustomEvent) {
    if ($clickedElement?.classList.contains(e.detail.tagValue)) return;
    $clickedElement?.classList.add(e.detail.tagValue);
  }

  function removeClass(e: CustomEvent) {
    $clickedElement?.classList.remove(e.detail.tagValue);
  }

  function addId(e: CustomEvent) {
    const idInput = <HTMLInputElement>e.detail.target;
    if ($clickedElement) $clickedElement.id = idInput.value;
  }

  function toggleClassIdButton(e: Event) {
    let clickedBtn = e.target as HTMLButtonElement;

    let tagifyClassInput = <HTMLInputElement>document.getElementById('class-input');
    let idInput = <HTMLInputElement>document.getElementById('id-input');

    tagifyClassInput.classList.toggle('hidden', clickedBtn.id === 'selector-id-btn');
    idInput.classList.toggle('hidden', clickedBtn.id === 'selector-class-btn');
  }

  let allowedPseudoClasses: { [key: string]: '' | 'hover' | 'active' | 'focus' } = {
    default: '',
    'on hover': 'hover',
    'on click': 'active',
    'on focus': 'focus'
  };

  function changeCSSPseudoClass(e: CustomEvent) {
    let clickedBtn = e.detail.target as HTMLButtonElement;

    if (clickedBtn.textContent === null) return;
    let clickedBtnText = clickedBtn.textContent.toLowerCase();

    if (Object.keys(allowedPseudoClasses).includes(clickedBtnText)) {
      $currentCSSPseudoClass = allowedPseudoClasses[clickedBtnText];
    }
  }
</script>

<div class="flex flex-col px-[12px] py-[12px] gap-[10px]">
  <div class="flex justify-between gap-[10px]">
    <ButtonGroup
      Items={[
        { text: 'Class', iconPath: '' },
        { text: 'ID', iconPath: '' }
      ]}
      ButtonIds={['selector-class-btn', 'selector-id-btn']}
      on:click={toggleClassIdButton}
    />

    <Dropdown
      DropdownBtnText={'Default'}
      ItemsArray={['Default', 'On Hover', 'On Click', 'On Focus']}
      on:click={changeCSSPseudoClass}
    />
  </div>

  <TagInputBar on:add={addClass} on:remove={removeClass} placeholder={'Add a class'} id={'class-input'} />

  <InputBar on:blur={addId} id={'id-input'} placeholder={'Add an ID'} Class={'hidden'} />
</div>

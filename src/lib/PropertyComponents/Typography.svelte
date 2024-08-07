<script lang="ts">
  import ButtonGroup from '../UI/ButtonGroup.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import InputBar from '$lib/UI/InputBar.svelte';
  import { CSSUtility } from '$lib/Modules/cssFunctions';
  import { clickedElementStyle } from '../../Stores';
  import { applyChanges } from '$lib/Modules/helperFunctions';

  function setTextAlignment(e: CustomEvent) {
    const clickedBtn = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('text-align', clickedBtn.id.replace('text-align-', ''));
  }

  function setFontFamily(e: CustomEvent) {
    let targetButton = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('font-family', targetButton.textContent as string);
  }

  const fontWeightToValueDictionary: { [key: string]: string } = {
    '100': '100 - Thin',
    '200': '200 - Extra Light',
    '300': '300 - Light',
    '400': '400 - Regular',
    '500': '500 - Medium',
    '600': '600 - Semibold',
    '700': '700 - Bold',
    '800': '800 - Extra Bold',
    '900': '900 - Black'
  };

  function setFontWeight(e: CustomEvent) {
    let targetButton = e.detail.target as HTMLButtonElement;
    // convert '900 - Black' to 900
    let btnTextToInt = parseInt(targetButton.textContent as string);
    if (!isNaN(btnTextToInt)) CSSUtility.writeCSS('font-weight', String(btnTextToInt));
  }

  function setFontStyle(e: CustomEvent) {
    const clickedBtn = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('font-style', clickedBtn.id.replace('font-style-', ''));
  }

  function setTextColor(e: CustomEvent) {
    CSSUtility.writeCSS('color', e.detail.target.value);
  }

  //   function setTextDecoration(e: CustomEvent) {
  //     const clickedBtn = e.detail.target as HTMLButtonElement;
  //     CSSUtility.writeCSS('text-decoration', clickedBtn.id.replace('text-decoration-', ''));
  //   }

  //   function setTextDirection(e: CustomEvent) {
  //     const clickedBtn = e.detail.target as HTMLButtonElement;
  //     $clickedElement.setAttribute('dir', clickedBtn.id.replace('text-direction-', ''));
  //   }

  function setTextTransform(e: CustomEvent) {
    const clickedBtn = e.detail.target as HTMLButtonElement;
    CSSUtility.writeCSS('text-transform', clickedBtn.id.replace('text-transform-', ''));
  }
</script>

<div class="flex flex-col gap-[12px] text-[#b8b6b6] text-[10px]">
  <!-- Text align -->
  <ButtonGroup
    Items={[
      { text: '', popupText: 'Left', iconPath: 'Icons/Typography/text-left.svg' },
      { text: '', popupText: 'Center', iconPath: 'Icons/Typography/text-center.svg' },
      { text: '', popupText: 'Right', iconPath: 'Icons/Typography/text-right.svg' },
      { text: '', popupText: 'Justify', iconPath: 'Icons/Typography/text-justify.svg' }
    ]}
    ButtonIds={['text-align-left', 'text-align-center', 'text-align-right', 'text-align-justify']}
    activeButtonId={'text-align-' + $clickedElementStyle?.textAlign}
    on:click={setTextAlignment}
  />

  <!-- Font family -->
  <Dropdown
    id={'fontFamilyDropdown'}
    DropdownBtnText={$clickedElementStyle?.fontFamily}
    ItemsArray={['Inter', 'Lora', 'Open Sans', 'Poppins', 'Roboto']}
    on:click={setFontFamily}
  />

  <!-- Font weight -->
  <Dropdown
    id={'fontWeightDropdown'}
    DropdownBtnText={fontWeightToValueDictionary[$clickedElementStyle?.fontWeight]}
    ItemsArray={[
      '100 - Thin',
      '200 - Extra Light',
      '300 - Light',
      '400 - Regular',
      '500 - Medium',
      '600 - Semibold',
      '700 - Bold',
      '800 - Extra Bold',
      '900 - Black'
    ]}
    on:click={setFontWeight}
  />

  <!-- Font Color -->
  <InputBar
    id="color"
    type="color"
    value={$clickedElementStyle?.color ?? '#000000'}
    on:input={setTextColor}
    on:blur={applyChanges}
  />

  <!-- Font Size + Height -->
  <div class="grid grid-cols-2 gap-[10px]">
    <MiniInputBar
      id={'font-size'}
      FieldName="Size"
      value={$clickedElementStyle?.fontSize}
      on:blur={applyChanges}
    />
    <MiniInputBar
      id={'line-height'}
      FieldName="Height"
      value={$clickedElementStyle?.lineHeight}
      on:blur={applyChanges}
    />
  </div>

  <!-- Font Style + Text Transform -->
  <div class="flex justify-between gap-[12px]">
    <ButtonGroup
      Items={[
        { text: '', iconPath: 'Icons/Typography/text-regular.svg' },
        { text: '', iconPath: 'Icons/Typography/text-italic.svg' }
      ]}
      ButtonIds={['font-style-normal', 'font-style-italic']}
      activeButtonId={'font-style-' + $clickedElementStyle?.fontStyle}
      on:click={setFontStyle}
    />

    <ButtonGroup
      Items={[
        { text: '', popupText: 'Default', iconPath: 'Icons/Typography/text-decoration-none.svg' },
        { text: 'AA', popupText: 'Uppercase', iconPath: '' },
        { text: 'Aa', popupText: 'Capitalize', iconPath: '' },
        { text: 'aa', popupText: 'Lowercase', iconPath: '' }
      ]}
      ButtonIds={[
        'text-transform-none',
        'text-transform-uppercase',
        'text-transform-capitalize',
        'text-transform-lowercase'
      ]}
      IconSize={13}
      activeButtonId={'text-transform-' + $clickedElementStyle?.textTransform}
      popupAlignment={'bottom'}
      on:click={setTextTransform}
    />
  </div>
</div>

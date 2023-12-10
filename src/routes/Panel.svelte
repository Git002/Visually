<script lang="ts" context="module">
  import { showPanelComponent } from '../Stores';

  export const PanelElements: any = {
    Heading: {
      icon: 'Icons/Panel/heading.svg',
      code: '<h1>Heading</h1>'
    },

    Paragraph: {
      icon: 'Icons/Panel/paragraph.svg',
      code: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget est quis lacus euismod ultricies. Phasellus luctus efficitur dapibus. Nam ultrices faucibus massa non scelerisque. Etiam posuere eget erat non varius. Nam nec urna pulvinar, tincidunt augue a, convallis neque. Vivamus vel erat libero. Mauris id aliquam nibh. Pellentesque tincidunt augue id dui egestas dictum. </p>'
    },

    Button: {
      icon: 'Icons/Panel/button.svg',
      code: '<button>Click here</button>'
    },

    Image: {
      icon: 'Icons/Panel/image.svg',
      code: '<img src="default_image.svg" alt="Default image" width="200">'
    },

    Input: {
      icon: 'Icons/Panel/input.svg',
      code: '<input type="text">'
    },

    Div: {
      icon: 'Icons/Panel/div.svg',
      code: '<div new-empty-div></div>'
    }
  };
</script>

<div
  id="elementsPanel"
  class={$showPanelComponent
    ? 'flex flex-col ml-[44px] py-[20px] px-[26px] h-full bg-[#2e2f31] absolute z-10'
    : 'absolute invisible'}
>
  <div class="font-sans text-[10px] mb-[4px] font-semibold tracking-wider text-[#ded9d9]">ELEMENTS</div>

  <div class="grid grid-cols-2 gap-[20px] pt-[12px]">
    {#each Object.entries(PanelElements) as [key]}
      <div
        class="flex flex-col border-2 border-[#404040] w-[84px] h-[76px] rounded-md items-center justify-between cursor-grab overflow-hidden pb-[6px] pt-[10px] gap-[4px]"
        draggable="true"
        data-tagname={key}
      >
        <img src={PanelElements[key].icon} alt="" class="pointer-events-none" />
        <div class="font-medium text-[11px] text-[#B7B4B4] tracking-wide">{key}</div>
      </div>
    {/each}
  </div>
</div>

<script lang="ts" context="module">
  import { show } from '../Stores';

  export let elements: any = {
    Heading: {
      icon: 'Icons/heading.png',
      code: '<h1>Heading</h1>'
    },

    Text: {
      icon: 'Icons/paragraph.png',
      code: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget est quis lacus euismod ultricies. Phasellus luctus efficitur dapibus. Nam ultrices faucibus massa non scelerisque. Etiam posuere eget erat non varius. Nam nec urna pulvinar, tincidunt augue a, convallis neque. Vivamus vel erat libero. Mauris id aliquam nibh. Pellentesque tincidunt augue id dui egestas dictum. </p>'
    },

    Button: {
      icon: 'Icons/button.png',
      code: '<button>Click here</button>'
    },

    Images: {
      icon: 'Icons/image.png',
      code: '<img src="default_image.svg" alt="Default image" width="200">'
    },

    Input: {
      icon: 'Icons/input.png',
      code: '<input type="text">'
    },

    Div: {
      icon: 'Icons/div.png',
      code: '<div new-empty-div></div>'
    }
  };
</script>

<div
  id="elementsPanel"
  class={$show
    ? 'flex flex-col ml-[42px] py-[20px] px-[26px] h-full bg-[#2e2f31] absolute z-10'
    : 'absolute invisible'}
>
  <div class="font-sans text-[10px] mb-[4px] font-semibold tracking-wider text-[#ded9d9]">
    ELEMENTS
  </div>

  <div class="grid grid-cols-2 gap-[20px] pt-[12px]">
    {#each Object.entries(elements) as [key]}
      <div
        class="flex flex-col border-2 border-[#404040] w-[86px] h-[80px] rounded-md items-center justify-center cursor-grab"
        draggable="true"
        data-tagname={key}
      >
        <img src={elements[key].icon} alt="" class="pointer-events-none" width="70" height="70" />
      </div>
    {/each}
  </div>
</div>

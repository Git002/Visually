<script lang="ts" context="module">
  export const PanelElements: any = {
    Heading: {
      icon: 'Icons/ElementsPanel/heading.svg',
      code: '<h1>Heading</h1>'
    },

    Paragraph: {
      icon: 'Icons/ElementsPanel/paragraph.svg',
      code: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget est quis lacus euismod ultricies. Phasellus luctus efficitur dapibus. Nam ultrices faucibus massa non scelerisque. Etiam posuere eget erat non varius. Nam nec urna pulvinar, tincidunt augue a, convallis neque. Vivamus vel erat libero. Mauris id aliquam nibh. Pellentesque tincidunt augue id dui egestas dictum. </p>'
    },

    Button: {
      icon: 'Icons/ElementsPanel/button.svg',
      code: '<button>Click here</button>'
    },

    Div: {
      icon: 'Icons/ElementsPanel/div.svg',
      code: '<div></div>'
    },

    Input: {
      icon: 'Icons/ElementsPanel/input.svg',
      code: '<input type="text">'
    },

    Image: {
      icon: 'Icons/ElementsPanel/image.svg',
      code: '<img src="default_image.svg" alt="Default image" width="200">'
    }
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { showPanelComponent } from '../../Stores';

  onMount(() => {
    let panel = <HTMLDivElement>document.getElementById('elements-panel');
    panel.addEventListener('dragover', () => ($showPanelComponent = false));
  });
</script>

<div class="font-sans text-[10px] mb-[15px] font-semibold tracking-wider text-[#ded9d9]">ELEMENTS</div>

<div class="grid grid-cols-2 gap-[20px]">
  {#each Object.entries(PanelElements) as [key]}
    <div
      class="flex flex-col border-2 border-[#404040] w-full h-[86px] rounded-md items-center justify-between cursor-grab overflow-hidden pb-[8px] pt-[12px]"
      draggable="true"
      data-tagname={key}
    >
      <img src={PanelElements[key].icon} alt="" class="pointer-events-none" />
      <div class="font-medium text-[11px] text-[#B7B4B4] tracking-wide">{key}</div>
    </div>
  {/each}
</div>

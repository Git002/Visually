<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode } from '../Stores';

  let elements: any = {
    Heading: {
      icon: '../src/Icons/heading.png',
      code: '<h1>Heading</h1>'
    },
    Text: {
      icon: '../src/Icons/text.png',
      code: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>'
    },
    Button: {
      icon: '../src/Icons/button.png',
      code: '<button>Click here</button>'
    },
    Div: {
      icon: '../src/Icons/div.png',
      code: '<div new-empty-div></div>'
    }
  };

  onMount(() => {
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    document.addEventListener('dragstart', (e) => {
      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);

      const ghostText = (e.target as HTMLDivElement).getAttribute('data-name')!;
      ghost_img.innerText = ghostText;

      // get code of the dragged element
      htmlCode.update(() => elements[ghostText].code);
    });

    document.addEventListener('dragend', (e) => {
      ghost_img.style.visibility = 'hidden';
    });
  });
</script>

<div
  id="showPanel"
  class="flex flex-col ml-[46px] py-[20px] px-[26px] h-full bg-[#2e2f31] absolute invisible z-40"
>
  <div class="font-sans text-[10px] mb-[4px] font-semibold tracking-wider text-[#ded9d9]">
    ELEMENTS
  </div>

  <div class="grid grid-cols-2 gap-[16px] pt-[12px]">
    {#each Object.entries(elements) as [key]}
      <div
        class="flex flex-col border-2 border-[#404040] w-[86px] h-[86px] rounded-md items-center justify-center cursor-grab"
        draggable="true"
        data-name={key}
      >
        <img src={elements[key].icon} alt="" class="pointer-events-none" width="70" />
      </div>
    {/each}
  </div>
</div>

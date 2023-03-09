<script lang="ts">
  import { onMount } from 'svelte';
  import { htmlCode } from '../Stores';

  let elements: any = {
    Heading: {
      icon: '../src/Icons/heading.svg',
      description: 'Big section heading',
      code: '<h1>Heading</h1>'
    },
    Text: {
      icon: '../src/Icons/text.svg',
      description: 'Plain paragraph',
      code: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>'
    },
    Button: {
      icon: '../src/Icons/button.svg',
      description: 'Simple clickable button',
      code: '<button>Click here</button>'
    },
    Div: {
      icon: '../src/Icons/div.svg',
      description: 'Container for your elements',
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

    document.addEventListener('dragover', (e) => {
      ghost_img.style.left = e.clientX + 15 + 'px';
      ghost_img.style.top = e.clientY + 15 + 'px';
      ghost_img.style.visibility = 'visible';
    });

    document.addEventListener('dragend', (e) => {
      ghost_img.style.visibility = 'hidden';
    });
  });
</script>

<div
  id="showPanel"
  class="flex flex-col ml-[46px] h-full bg-[#2e2f31] w-[300px] absolute invisible z-40"
>
  <div
    class="font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4] mt-[16px] mb-[6px] px-[16px]"
  >
    ELEMENTS
  </div>

  {#each Object.entries(elements) as [key]}
    <div
      class="flex flex-row gap-[16px] py-[12px] px-[16px] cursor-grab"
      draggable="true"
      data-name={key}
    >
      <div class="flex flex-row border-2 border-[#404040] rounded-md items-center p-[8px]">
        <object data={elements[key].icon} title="" style="pointer-events: none;" />
      </div>
      <div class="flex flex-col justify-evenly">
        <div class="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#ded9d9]">
          {key}
        </div>
        <div class="font-Inter text-[11.5px] font-semibold text-[#acaaaa]">
          {elements[key].description}
        </div>
      </div>
    </div>

    <div class="border-t border-[#202123] w-full" />
  {/each}
</div>

<div
  id="ghost_img"
  class="flex h-min w-min items-center justify-center rounded-full bg-violet-500 px-[14px] py-[4px] font-sans text-[12px] font-semibold tracking-wide text-white drop-shadow-md invisible absolute capitalize z-20"
>
  Ghost
</div>

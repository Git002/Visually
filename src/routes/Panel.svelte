<script lang="ts">
  import { onMount } from 'svelte';

  let components = [
    {
      icon: '../src/Icons/heading.svg',
      text: 'Heading',
      description: 'Add a big heading',
      id: 'HeadingComponent'
    },
    {
      icon: '../src/Icons/text.svg',
      text: 'Text',
      description: 'New paragraph',
      id: 'TextComponent'
    },
    {
      icon: '../src/Icons/button.svg',
      text: 'Button',
      description: 'Simple clickable button',
      id: 'ButtonComponent'
    },
    {
      icon: '../src/Icons/div.svg',
      text: 'Div',
      description: 'Container for your elements',
      id: 'DivComponent'
    }
  ];

  onMount(() => {
    const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');

    document.addEventListener('dragstart', (e) => {
      const blank = document.createElement('div');
      e.dataTransfer!.setDragImage(blank, 0, 0);
      ghost_img.innerText = (e.target as HTMLDivElement).getAttribute('data-name')!;
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
  class="flex flex-col ml-[46.5px] h-full bg-[#2e2f31] w-[300px] absolute invisible z-40"
>
  <div
    class="font-sans text-[10px] font-semibold tracking-wider text-[#b7b4b4] mt-[16px] mb-[6px] px-[16px]"
  >
    ELEMENTS
  </div>

  <!-- Components -->
  {#each components as component}
    <div
      class="flex flex-row gap-[16px] py-[12px] px-[16px] cursor-grab"
      draggable="true"
      id={component.id}
      data-name={component.text}
    >
      <div class="flex flex-row border-2 border-[#404040] rounded-md items-center p-[8px]">
        <object data={component.icon} title="" style="pointer-events: none;" />
      </div>
      <div class="flex flex-col justify-evenly">
        <div class="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#ded9d9]">
          {component.text}
        </div>
        <div class="font-Inter text-[11.5px] font-semibold text-[#acaaaa]">
          {component.description}
        </div>
      </div>
    </div>

    <div class="border-t border-[#202123] w-full" />
  {/each}
</div>

<div
  id="ghost_img"
  class="flex h-min w-min items-center justify-center rounded-full bg-violet-500 px-[14px] py-[4px] font-sans text-[12px] font-semibold tracking-wide text-white drop-shadow-md invisible absolute capitalize"
>
  Ghost
</div>

<script lang="ts">
  let components = [
    {
      icon: '../src/Icons/heading.svg',
      text: 'HEADING',
      description: 'Add a big heading',
      id: 'HeadingComponent'
    },
    {
      icon: '../src/Icons/text.svg',
      text: 'TEXT',
      description: 'New paragraph',
      id: 'TextComponent'
    },
    {
      icon: '../src/Icons/button.svg',
      text: 'BUTTON',
      description: 'Simple clickable button',
      id: 'ButtonComponent'
    },
    {
      icon: '../src/Icons/div.svg',
      text: 'DIV 1',
      description: 'Container for your elements',
      id: 'DivComponent'
    }
  ];
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
    >
      <div class="flex flex-row border-2 border-[#404040] rounded-md items-center p-[8px]">
        <object data={component.icon} title="" style="pointer-events: none;" />
      </div>
      <div class="flex flex-col justify-evenly">
        <div class="font-sans text-[11px] font-semibold tracking-wider text-[#ded9d9]">
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

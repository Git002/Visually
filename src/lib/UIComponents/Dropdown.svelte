<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';

  export let DropdownName: string = 'Select';
  export let ItemsArray: string[] = ['Apple', 'Mango', 'Orange', 'Strawberry'];
  export let customFunction: (() => void) | null = null;
  let dropdownOpen = false;

  function handleDropdownClick(e: Event) {
    const clickedButton = e.target as HTMLButtonElement;
    // set dropdown name to the clicked dropdown item
    DropdownName = clickedButton.innerText;
    // set Open to false to close the dropdown
    dropdownOpen = false;
  }

  // if a custom function is passed then execute it
  afterUpdate(() => {
    if (customFunction) {
      customFunction();
    }
  });
</script>

<Button
  id="selectorBtn"
  btnClass="flex justify-between flex-row rounded-[6px] bg-[#404040] py-[6px] px-[12px] border-2 border-[#505050] items-center text-center text-[12px] font-semibold text-[#b8b6b6] font-sans w-full"
>
  {DropdownName}
  <object data="Icons/dropdown.svg" title="" style="pointer-events: none;" />
</Button>

<Dropdown
  class="text-[12px] text-left text-[#b8b6b6] w-[140px] bg-[#404040] rounded-[6px] overflow-hidden drop-shadow-2xl font-semibold"
  bind:open={dropdownOpen}
>
  {#each ItemsArray as item}
    <DropdownItem
      class="px-[16px] hover:bg-[#0070e7] hover:text-white"
      on:click={(e) => {
        handleDropdownClick(e);
      }}
    >
      {item}
    </DropdownItem>
  {/each}
</Dropdown>

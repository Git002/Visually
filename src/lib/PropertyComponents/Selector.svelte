<script lang="ts">
  import Dropdown from '../UIComponents/Dropdown.svelte';
  import ButtonGroup from '../UIComponents/ButtonGroup.svelte';

  let classInputOpen = true;
  let idInputOpen = false;

  function toggleClassId(e: Event) {
    let clickedBtn = e.target as HTMLButtonElement;
    if (clickedBtn.id === 'selector-class') {
      classInputOpen = true;
      idInputOpen = false;
    } else if (clickedBtn.id === 'selector-id') {
      classInputOpen = false;
      idInputOpen = true;
    }
  }
</script>

<div class="flex flex-col px-[14px] py-[12px] gap-[10px]">
  <div class="flex justify-between gap-[8px]">
    <!-- Button group -->
    <ButtonGroup
      ItemsArray={['Class', 'ID']}
      IdArray={['selector-class', 'selector-id']}
      customFunction={toggleClassId}
    />

    <!-- dropdown -->
    <Dropdown
      DropdownBtnText={'Set State'}
      ItemsArray={['Default', 'On Hover', 'On Press', 'On Focus']}
    />
  </div>

  <input
    id="class-input"
    class={classInputOpen
      ? 'w-full text-[11px] bg-[#404040] font-sans font-semibold placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] px-[10px] py-[7px] outline-none'
      : 'hidden'}
    placeholder="add a new class"
    spellcheck="false"
  />

  <input
    id="id-input"
    class={idInputOpen
      ? 'w-full text-[11px] bg-[#404040] font-sans font-semibold placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] px-[10px] py-[7px] outline-none'
      : 'hidden'}
    placeholder="add a new ID"
    spellcheck="false"
  />
</div>

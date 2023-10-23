<script>
  import InputBar from '$lib/UI/InputBar.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
</script>

<div class="flex flex-col gap-[12px] text-[10px] tracking-wide text-[#b8b6b6]">
  <div class="grid grid-cols-2 gap-[8px]">
    <InputBar FieldName="width" value="100" />
    <InputBar FieldName="height" value="80" />
    <InputBar FieldName="min w" value="50" />
    <InputBar FieldName="min h" value="40" />
    <InputBar FieldName="max w" value="150" />
    <InputBar FieldName="max h" value="120" />
  </div>

  <div class="flex flex-row justify-between items-center gap-[12px]">
    <div class="text-[12px] font-bold">Overflow</div>
    <Dropdown ItemsArray={['Hidden', 'Visible', 'Scroll', 'Auto']} />
  </div>
</div>

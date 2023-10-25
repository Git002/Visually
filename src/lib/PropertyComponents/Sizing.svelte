<script>
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
  import Dropdown from '$lib/UI/Dropdown.svelte';
</script>

<div class="flex flex-col gap-[12px] text-[10px] tracking-wide text-[#b8b6b6]">
  <div class="grid grid-cols-2 gap-[8px]">
    <MiniInputBar FieldName="width" value="100" />
    <MiniInputBar FieldName="height" value="80" />
    <MiniInputBar FieldName="min w" value="50" />
    <MiniInputBar FieldName="min h" value="40" />
    <MiniInputBar FieldName="max w" value="150" />
    <MiniInputBar FieldName="max h" value="120" />
  </div>

  <div class="flex flex-row justify-between items-center gap-[12px]">
    <div class="text-[12px] font-bold">Overflow</div>
    <Dropdown ItemsArray={['Hidden', 'Visible', 'Scroll', 'Auto']} />
  </div>
</div>

<script>
  export let FieldName = 'Input';
  export let value = '10';
</script>

<div
  class="flex justify-between rounded-[6px] bg-[#404040] p-[8px] gap-[10px] border-2 border-[#505050]"
>
  <input
    class="w-full text-[11px] bg-[#404040] rounded-[2px] focus:outline-none focus:ring-2 font-semibold focus:ring-[#505050]"
    {value}
  />
  <div class="flex w-full justify-center items-center font-bold uppercase">{FieldName}</div>
</div>

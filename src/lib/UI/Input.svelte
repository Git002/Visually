<script lang="ts">
  export let value: string = '10';
  export let Class: string = '';

  function incrementDecrementValue(e: KeyboardEvent) {
    const input = <HTMLInputElement>e.target;
    const inputValue = parseInt(input.value);

    if (e.key === 'ArrowUp') {
      input.value = String(inputValue + 1);
    } else if (e.key === 'ArrowDown') {
      input.value = String(inputValue - 1);
    }
  }
</script>

<input
  class={'w-[32px] bg-[#404040] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#505050] text-center tracking-wide ' +
    Class}
  {value}
  autocomplete="off"
  on:keydown={incrementDecrementValue}
/>

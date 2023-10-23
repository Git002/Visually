<script lang="ts">
  import Tagify from '@yaireo/tagify';
  import '@yaireo/tagify/dist/tagify.css';
  import { random } from '$lib/Modules/helperFunctions';
  import { onMount } from 'svelte';

  export let id: string;
  export let placeholder: string = 'placeholder';

  let input: HTMLInputElement;
  let className: string = random(12);

  onMount(() => {
    let tagify = new Tagify(input);

    let tagifyInstance = <HTMLElement>document.querySelector(`.tagify.${className}`);
    tagifyInstance.setAttribute('id', id);

    let tagifiedInput = <HTMLElement>document.querySelector(`.tagify.${className} .tagify__input`);

    tagify.on('add', (e) => {
      tagifiedInput.removeAttribute('data-placeholder');
    });

    tagify.on('remove', () => {
      if (tagify.getCleanValue().length === 1) {
        tagifiedInput.setAttribute('data-placeholder', 'Add a class');
      }
    });
  });
</script>

<input
  bind:this={input}
  class={className +
    ' w-full text-[11px] bg-[#404040] font-sans font-semibold placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] px-[10px] py-[7px] outline-none'}
  {placeholder}
  spellcheck="false"
/>

<style>
  :global(.tagify) {
    --tag-bg: #0070e7;
    --tag-hover: #0070e7c1;
    --tags-hover-border-color: #0070e7c1;
    --tags-focus-border-color: #0070e7c1;
    --tag-text-color: #ebe9e9;
    --tag-remove-btn-color: #ebe9e9;
    --placeholder-color: #b8b6b6a1;
    --placeholder-color-focus: #b8b6b6a1;
    --input-color: #b8b6b6;
    --tag-hide-transition: 0s;
    --loader-size: 0em;
    --tag-text-color--edit: #b8b6b6;
    --tag-inset-shadow-size: 20px;
    --tag-pad: 4px;
    border-color: #505050;
    border-width: 2px;
    border-radius: 5px;
    overflow: hidden;
  }

  :global(.tagify__input) {
    min-width: 0px;
    white-space: nowrap;
  }

  :global(.tagify__tag) {
    max-width: 95%;
  }

  :global(.tagify__tag > div) {
    max-width: 90%;
    overflow: hidden;
  }

  :global(.tagify__tag > div > *) {
    max-width: 100%;
    white-space: nowrap;
  }
</style>

<script lang="ts" context="module">
  export let tagifyInstance: any;
  export let tagifyInput: HTMLElement;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { random } from '$lib/Modules/helperFunctions';
  import Tagify from '@yaireo/tagify';
  import '@yaireo/tagify/dist/tagify.css';

  export let id: string;
  export let placeholder: string = 'placeholder';

  let input: HTMLInputElement;
  let className: string = random(12);

  const dispatch = createEventDispatcher();

  function customAddFunction(tagValue: string) {
    dispatch('add', {
      tagValue
    });
  }

  function customRemoveFunction(tagValue: string) {
    dispatch('remove', {
      tagValue
    });
  }

  onMount(() => {
    tagifyInstance = new Tagify(input, {
      blacklist: ['hover']
    });

    let tagifyInputBar = <HTMLElement>document.querySelector(`.tagify.${className}`);
    tagifyInputBar.id = id;

    tagifyInput = <HTMLElement>document.querySelector(`.tagify.${className} .tagify__input`);

    tagifyInstance.on('add', (e: any) => {
      tagifyInput.setAttribute('data-placeholder', ' ');
      customAddFunction(e.detail.data!.value);
    });

    tagifyInstance.on('remove', (e: any) => {
      if (tagifyInstance.getCleanValue().length <= 1) {
        tagifyInput.setAttribute('data-placeholder', 'Add a class');
      }
      customRemoveFunction(e.detail.data!.value);
    });
  });
</script>

<input
  id={id + '-' + className}
  bind:this={input}
  class={className +
    ' w-full text-[11px] bg-[#404040] font-sans font-semibold tracking-wide placeholder-[#b8b6b6a1] text-[#b8b6b6] border-[2px] border-[#505050] rounded-[5px] outline-none'}
  {placeholder}
  spellcheck="false"
/>

<style>
  :global(.tagify) {
    --tag-bg: #107be7;
    --tag-hover: #107be7c1;
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

  :global(.tagify__tag > div::before) {
    animation: 0;
  }

  :global(.tagify__tag > div > *) {
    max-width: 100%;
    white-space: nowrap;
  }

  :global(.tagify__tag > div > [contenteditable]) {
    text-overflow: clip;
  }

  :global(.tagify__input::before) {
    white-space: pre;
  }
</style>

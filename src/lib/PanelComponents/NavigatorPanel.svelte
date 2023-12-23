<script lang="ts">
  import TreeView from '$lib/UI/TreeView.svelte';
  import { iFrameDocument } from '../../Stores';
</script>

<div class="font-sans px-[20px] text-[10px] mb-[14px] font-semibold tracking-wider text-[#ded9d9]">
  NAVIGATOR
</div>

{#if $iFrameDocument}
  <TreeView
    element={$iFrameDocument?.body}
    Expand={true}
    basePaddingLeft={20}
    childPaddingLeft={10}
    leafNodePaddingLeft={12}
  />
{/if}

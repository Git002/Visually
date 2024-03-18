<script lang="ts">
  import MiniInputBar from '$lib/UI/MiniInputBar.svelte';
</script>

<div class="grid grid-cols-2 gap-[10px]">
  <MiniInputBar id={'border-width'} FieldName="Width" value="10" />
  <MiniInputBar id={'border-radius'} FieldName="Radius" value="10" />
</div>

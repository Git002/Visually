<script lang="ts">
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<slot />

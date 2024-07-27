<script lang="ts">
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup, initializeStores } from '@skeletonlabs/skeleton';
  import { Toast } from '@skeletonlabs/skeleton';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  initializeStores();
</script>

<Toast />

<slot />

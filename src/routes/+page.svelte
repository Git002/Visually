<script lang="ts">
  import '../app.css';
  import Loader from '../routes/Loader.svelte';
  import Header from '../routes/Header.svelte';
  import Sidebar from '../routes/Sidebar.svelte';
  import MainFrame from './MainFrame.svelte';
  import NotSelected from './NotSelected.svelte';
  import Panel from './Panel.svelte';
  import Properties from './Properties.svelte';
  import { clickedElement } from '../Stores';
  import { onMount } from 'svelte';

  $: if ($clickedElement !== undefined) {
    document.getElementById('not_selected')!.style.visibility = 'hidden';
  }

  onMount(() => {
    const loader = document.getElementById('loader')!;
    if (document.readyState === 'complete') {
      setTimeout(() => {
        loader.style.visibility = 'hidden';
      }, 2000);
    }
  });
</script>

<div class="flex flex-row min-h-screen">
  <Loader />

  <div class="flex flex-col w-full">
    <Header />

    <div class="flex flex-row w-full h-full">
      <Sidebar />
      <Panel />

      <div
        id="frame_container"
        class="flex flex-col px-[10px] overflow-hidden w-full h-full bg-[#202123]"
      >
        <MainFrame />
      </div>

      <div
        class="flex flex-col h-full bg-[#2e2f31] w-[270px] shrink-0 overscroll-none"
        id="noscroll"
      >
        <NotSelected />

        <Properties />
        <!-- screen when no element selected -->
      </div>
    </div>
  </div>
</div>

<div
  id="ghost_img"
  class="flex h-min w-min items-center justify-center rounded-full bg-violet-500 px-[14px] py-[4px] font-sans text-[12px] font-semibold tracking-wide text-white drop-shadow-md invisible absolute capitalize z-20"
>
  Ghost
</div>

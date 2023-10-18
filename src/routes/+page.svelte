<script lang="ts">
  import '../app.css';
  import Loader from '../routes/Loader.svelte';
  import Header from '../routes/Header.svelte';
  import Sidebar from '../routes/Sidebar.svelte';
  import MainFrame from './MainFrame.svelte';
  import NotSelected from './NotSelected.svelte';
  import Panel from './Panel.svelte';
  import Properties from './Properties.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    // show the loading screen and hide it after 1.5 seconds when the page is done loading
    setTimeout(() => {
      const loader: HTMLDivElement = <HTMLDivElement>document.getElementById('loader');
      loader.style.visibility = 'hidden';
    }, 1500);
  });
</script>

<div class="flex flex-row min-h-screen">
  <Loader />

  <div class="flex flex-col w-full">
    <Header />

    <div class="flex flex-row w-full h-full">
      <Sidebar />
      <Panel />

      <div class="flex flex-col px-[10px] overflow-hidden w-full h-full bg-[#202123]">
        <MainFrame />
      </div>

      <div class="flex flex-col h-full bg-[#2e2f31] w-[250px] shrink-0">
        <NotSelected />

        <Properties />
        <!-- screen when no element selected -->
      </div>
    </div>
  </div>
</div>

<div
  id="ghost_img"
  class="flex h-min w-min items-center justify-center rounded-full bg-violet-500 px-[14px] py-[4px] font-sans text-[12px] font-semibold tracking-wide text-white drop-shadow-md invisible absolute capitalize z-11"
>
  Ghost
</div>

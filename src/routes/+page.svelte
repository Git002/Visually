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

<div class="flex flex-row h-screen">
  <Loader />

  <div class="flex flex-col w-full">
    <Header />

    <div class="flex flex-row w-full flex-1">
      <Sidebar />
      <Panel />

      <div class="flex flex-col px-[10px] w-full flex-1 bg-[#202123]">
        <MainFrame />
      </div>

      <div class="flex flex-col bg-[#2e2f31] w-[250px] shrink-0 relative">
        <NotSelected />

        <Properties />
        <!-- screen when no element selected -->
      </div>
    </div>
  </div>
</div>

<div
  id="ghost_img"
  class="h-min w-min items-center justify-center rounded-full bg-violet-500 px-[14px] py-[4px] font-sans text-[12px] font-semibold tracking-wide text-white drop-shadow-md absolute capitalize z-20 hidden"
>
  Ghost
</div>

<style>
  :global(.hidden) {
    display: none;
  }
</style>

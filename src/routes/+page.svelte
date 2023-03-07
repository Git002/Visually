<script lang="ts">
  import '../app.css';
  import Loader from '../routes/Loader.svelte';
  import Header from '../routes/Header.svelte';
  import Sidebar from '../routes/Sidebar.svelte';
  import MainFrame from './MainFrame.svelte';
  import NotSelected from './NotSelected.svelte';
  import Panel from './Panel.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    const loader = document.getElementById('loader')!;
    if (document.readyState === 'complete') {
      setTimeout(() => {
        loader.style.visibility = 'hidden';
      }, 1500);
    }
  });
</script>

<div class="flex flex-row h-full">
  <Loader />

  <div class="flex flex-col w-full">
    <Header />

    <div class="flex flex-row w-full h-full">
      <Sidebar />
      <Panel />

      <div id="frame_container" class="flex flex-col p-[10px] w-full h-full bg-[#202123]">
        <MainFrame />
      </div>

      <div class="flex flex-col h-screen bg-[#2e2f31] w-[270px] shrink-0" id="noscroll">
        <NotSelected />
        <!-- screen when no element selected -->
      </div>
    </div>
  </div>
</div>

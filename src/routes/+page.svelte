<script lang="ts">
	import '../app.css';
	import Loader from '../routes/Loader.svelte';
	import Header from '../routes/Header.svelte';
	import Sidebar from '../routes/Sidebar.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const loader = document.getElementById('loader')!;
		if (document.readyState === 'complete') {
			console.log('loaded');
			setTimeout(() => {
				loader.style.visibility = 'hidden';
			}, 1000);
		}
	});
</script>

<main>
	<div class="flex flex-row h-full">
		<Loader />

		<div class="flex flex-col w-full">
			<Header />
			<div class="flex flex-row w-full h-full">
				<Sidebar />
				<div
					id="frame_container"
					class="flex flex-col px-[10px] pb-[50px] w-full h-full bg-[#202123]"
				/>

				<div
					class="flex flex-col h-full bg-[#2e2f31] overflow-auto w-[275px] pb-[60px] z-1 shrink-0"
					id="noscroll"
				>
					<!-- screen when no element selected -->
				</div>
			</div>
		</div>
	</div>
	<div
		id="ghost"
		class="flex h-min w-min items-center justify-center rounded-full bg-violet-500 px-[14px] py-[4px] font-sans text-[12px] font-semibold tracking-wide text-white drop-shadow-md absolute invisible"
	>
		Heading
	</div>
</main>

<script lang="ts">
  if (typeof window !== 'undefined') import('@lottiefiles/lottie-player');
</script>

<div
  class="bg-[#202123] absolute flex flex-col justify-center w-full h-full items-center font-semibold text-[#656667] text-[16px] z-20"
  id="loader"
>
  <lottie-player
    src="./loading.json"
    background="transparent"
    speed="1"
    style="width: 600px; height: 600px;"
    loop
    autoplay
  />
</div>

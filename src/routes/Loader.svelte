<script lang="ts">
  if (typeof window !== 'undefined') {
    import('@lottiefiles/lottie-player');
  }
</script>

<div
  class="bg-[#202123] absolute flex flex-col justify-center w-full h-full items-center font-semibold text-[#656667] text-[16px] z-20 gap-[30px]"
  id="loader"
>
  <lottie-player
    src="https://assets10.lottiefiles.com/packages/lf20_7gwbjxgh.json"
    background="transparent"
    speed="1"
    style="width: 150px; height: 150px;"
    loop
    autoplay
  />

  <div>Loading assets...</div>
</div>

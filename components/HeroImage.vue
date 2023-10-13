<template>
  <div class="relative isolate overflow-hidden pt-[100%]">
    <div
      :class="isHolding ? 'opacity-0' : 'opacity-50'"
      class="h-full w-full absolute inset-0 bg-black flex select-none transition-opacity"
      @pointerdown="isHolding = true"
      @pointerup="isHolding = false"
      @contextmenu.prevent=""
    >
      <IconPoint class="text-white w-8 align-middle mx-auto h-full absolute inset-0" />
    </div>
    <img
      :src="image.src"
      :alt="image.alt"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    image: Object
});

const showOverlay = ref(true);

const isHolding = ref(false);

onMounted(()=> {
    setTimeout(()=> {
        showOverlay.value = false;
    }, 3000);
});
</script>

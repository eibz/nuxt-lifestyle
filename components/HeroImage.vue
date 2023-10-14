<template>
  <div class="relative isolate overflow-hidden pt-[100%]">
    <div
      :class="showOverlay ? 'opacity-50' : 'opacity-0'"
      class="h-full w-full absolute inset-0 bg-black flex select-none transition-opacity"
      @contextmenu.prevent=""
    >
      <IconPoint class="text-white w-8 align-middle mx-auto h-full absolute inset-0" />
    </div>
    <slot
      v-if="!!$slots.default"
    />
    <img
      v-else
      :src="image.src"
      :alt="image.alt"
      :srcset="image.srcSet"
      :sizes="image.sizes"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
  </div>
</template>
<script setup>
const props = defineProps({
    image: Object,
});

const emit = defineEmits(['timeout']);

const showOverlay = ref(true);

onMounted(()=> {
    setTimeout(()=> {
        showOverlay.value = false;
        emit('timeout');
    }, 3000);
});
</script>

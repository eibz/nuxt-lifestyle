<template>
  <div
    class="relative isolate overflow-hidden pt-[100%] md:pt-0"
    @click="detectDoubleClick"
  >
    <div
      :class="showOverlay ? 'opacity-50' : 'opacity-0'"
      class="h-full w-full absolute inset-0 bg-black flex select-none transition-opacity"
      @contextmenu.prevent=""
    >
    </div>
    <IconPoint
      :class="{
        'opacity-0': !showPointIcon,
      }"
      class="text-white w-8 align-middle mx-auto h-full absolute inset-0 transition"
    />
    <slot
      v-if="!!$slots.default"
    />
    <img
      v-else
      :src="image.src"
      :alt="image.alt"
      :srcset="image.srcSet"
      :sizes="image.sizes"
      class="absolute inset-0 -z-10 h-full w-full object-cover md:relative md:h-screen"
    />
  </div>
</template>
<script setup>
const props = defineProps({
    image: Object,
});

const emit = defineEmits(['timeout']);

const showOverlay = ref(true);
const showPointIcon = ref(true);

let dblClickCheck = false;
let timeout;

const detectDoubleClick = () => {
    if(timeout){
        clearTimeout(timeout);
    }

    if(dblClickCheck){
        showPointIcon.value = false;
        return;
    }

    dblClickCheck = true;

    timeout = setTimeout(function () {
        console.log('timeout');
        dblClickCheck = false;
    }, 1000);
};

onMounted(()=> {
    setTimeout(()=> {
        showOverlay.value = false;
        emit('timeout');
    }, 3000);
});
</script>

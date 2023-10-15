<template>
  <div
    class="relative isolate overflow-hidden pt-[100%] md:pt-0"
    @click="detectDoubleClick"
  >
    <div
      :class="showOverlay ? 'opacity-50' : 'opacity-0'"
      class="h-full w-full absolute inset-0 bg-black flex select-none transition-opacity md:hidden"
      @contextmenu.prevent=""
    >
    </div>
    <IconPoint
      :class="{
        'opacity-0': !showPointIcon,
      }"
      class="text-white w-8 align-middle mx-auto h-full absolute inset-0 transition md:hidden"
    />
    <div class="md:hidden">
      <slot
        v-if="!!$slots.default"
      />
      <div v-else>
        <img
          :src="image.src"
          :alt="image.alt"
          :srcset="image.srcSet"
          :sizes="image.sizes"
          class="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <img
          :src="nakedEyeImage?.src"
          :alt="nakedEyeImage?.alt"
          :srcset="nakedEyeImage?.srcSet"
          :sizes="nakedEyeImage?.sizes"
          class="absolute inset-0 -z-10 h-full w-full object-cover transition-opacity"
          :class="showNakedEyeImage ? 'opacity-100' : 'opacity-0'"
        />
      </div>
    </div>
    <div class="hidden md:block">
      <ClientOnly>
        <template #fallback>
          <img
            :src="image.src"
            :alt="image.alt"
            :srcset="image.srcSet"
            :sizes="image.sizes"
            class="w-full object-cover relative h-screen"
          />
        </template>
        <ImgComparisonSlider class="w-full ">
          <!-- eslint-disable -->
      <img
        slot="first"
        class="h-screen object-cover w-full"
        :src="nakedEyeImage?.src"
      />
      <img
        slot="second"
        class="h-screen object-cover w-full"
        :src="image.src"
      />
      <!-- eslint-enable -->
        </ImgComparisonSlider>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup>
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
const props = defineProps({
    image: Object,
    nakedEyeImage: Object,
    showNakedEyeImage: Boolean,
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

<template>
  <div>
    <div class="flex items-center gap-2">
      <div class="inline-block text-xs">
        {{ text.title }}
      </div>
      <div class="inline-block">
        <!-- <div
          v-if="showOverlay"
          class="w-screen h-screen bg-black opacity-70 fixed top-0 left-0 z-10"
        /> -->
        <button ref="tippyTarget">
          <IconTooltip class="h-3 w-3" />
        </button>
      </div>
    </div>
    <div class="text-2xl">
      {{ text.value }}
    </div>
  </div>
</template>

<script setup>
import { useTippy } from 'vue-tippy';
const props = defineProps({
    text: Object,
});

const tippyTarget = ref(null);

// const showOverlay = ref(false);

useTippy(tippyTarget, {
    content: props.text.tooltip,
    // onMount(instance) {
    //     showOverlay.value = true;
    // },
});


</script>

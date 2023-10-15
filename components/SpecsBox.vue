<template>
  <div>
    <div class="flex items-center gap-2">
      <div class="inline-block text-xs">
        {{ text.title }}
      </div>
      <div class="inline-block">
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

useTippy(tippyTarget, {
    content: props.text.tooltip,
});


</script>

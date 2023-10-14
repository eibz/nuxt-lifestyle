<template>
  <Popover
    v-slot="{ open }"
  >
    <FloatingCard
      class="inline-flex items-center justify-center text-base font-medium"
      :class="open ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'"
    >
      <PopoverButton
        class="focus:outline-none"
      >
        <IconLandscape
          v-if="!open"
          class="h-5 w-7 text-off-black"
          aria-hidden="true"
        />
        <IconCross
          v-else
          class="h-4 w-4 text-off-black"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="z-10 origin-top absolute bottom-full left-0"
        >
          <div
            class="overflow-hidden rounded-t-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative grid gap-1 bg-white p-1">
              <button
                v-for="scene of scenes"
                :key="scene.index"
                class="h-12 w-12 flex items-center rounded transition duration-150 ease-in-out focus:outline-none overflow-hidden relative"
                @click="selectedScene = scene"
              >
                <img
                  :src="scene.nakedEyeImage.responsiveImage.src"
                  :srcset="scene.nakedEyeImage.responsiveImage.srcSet"
                  :sizes="scene.nakedEyeImage.responsiveImage.sizes"
                  :alt="scene.nakedEyeImage.responsiveImage.alt"
                />
                <div
                  v-if="scene.sceneName === selectedScene.sceneName"
                  class="absolute sungod-gradient w-12 h-12 opacity-70"
                />
                <div
                  v-if="scene.sceneName === selectedScene.sceneName"
                  class="absolute w-12 h-12 flex items-center justify-center"
                >
                  <IconLandscape class="w-5 text-white" />
                </div>
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </FloatingCard>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
const emit = defineEmits(['sceneChanged']);

const props = defineProps({
    scenes: Array
});

const selectedScene = ref(props.scenes[0]);

watch(selectedScene, () => {
    emit('sceneChanged', selectedScene.value);
    console.log(selectedScene.value);
});

onMounted(() => {
    emit('sceneChanged', selectedScene.value);
});

</script>

<template>
  <Popover
    v-slot="{ open }"
    class="relative md:flex md:flex-row-reverse"
  >
    <PopoverButton class="focus:outline-none">
      <FloatingCard
        class="inline-flex items-center justify-center text-base font-medium"
        :class="open ? 'rounded-b-lg rounded-t-none md:rounded-l-none md:rounded-r-lg w-14' : 'rounded-lg'"
      >
        <template
          #icon
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
        </template>
        <template
          v-if="!open"
          #text
        >
          <div class="hidden md:inline-block">
            Scene
          </div>
        </template>
      </FloatingCard>
    </PopoverButton>

    <transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0 h-24 md:w-0 md:h-auto"
      enter-to-class="translate-y-0 opacity-100 h-40 md:w-40 md:h-auto"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 h-40 md:w-40 md:h-auto"
      leave-to-class="translate-y-1 opacity-0 h-24 md:w-0 md:h-auto"
    >
      <PopoverPanel
        v-show="open"
        static
        class="z-10 origin-top absolute bottom-full left-0 md:relative"
      >
        <div
          class="overflow-hidden rounded-t-lg ring-1 ring-black ring-opacity-5 md:rounded-r-none md:rounded-l-lg"
        >
          <div class="relative grid gap-1 bg-white p-1 md:grid-flow-col">
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

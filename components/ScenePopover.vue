<template>
  <Popover
    v-slot="{ open }"
  >
    <PopoverButton
      :class="open ? 'rounded-b-md' : 'rounded-md'"
      class="group inline-flex items-center bg-white p-3 text-base font-medium text-white focus:outline-none"
    >
      <IconLandscape
        v-if="!open"
        class="h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80"
        aria-hidden="true"
      />
      <IconCross
        v-else
        class="h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80 text-[#1C1B1F]"
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
        class="z-10 origin-top absolute bottom-full"
      >
        <div
          class="overflow-hidden rounded-t-md ring-1 ring-black ring-opacity-5"
        >
          <div class="relative grid gap-1 bg-white p-1">
            <button
              v-for="scene of scenes"
              :key="scene.index"
              class="h-9 w-9 flex items-center rounded-md transition duration-150 ease-in-out focus:outline-none overflow-hidden"
            >
              <img
                :src="scene.nakedEyeImage.responsiveImage.src"
                :srcset="scene.nakedEyeImage.responsiveImage.srcSet"
                :sizes="scene.nakedEyeImage.responsiveImage.sizes"
                :alt="scene.nakedEyeImage.responsiveImage.alt"
                class="flex shrink-0 items-center justify-center text-white"
              />
            </button>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = defineProps({
    scenes: Array
})
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <div class="inline-block text-xs">
        {{ text.title }}
      </div>
      <div class="inline-block relative">
        <Popover
          v-slot="{ open }"
        >
          <PopoverButton
            :class="open ? 'rounded-b-md' : 'rounded-md'"
            class="focus:outline-none"
          >
            <IconTooltip class="h-3 w-3" />
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
              class="relative"
            >
              <div class="bg-black text-white text-xs rounded py-1 px-4 -right-7 bottom-7 z-10 origin-top absolute">
                {{ text.tooltip }}
                <svg
                  class="absolute text-black h-2 w-full left-0 top-full"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xml:space="preserve"
                ><polygon
                  class="fill-current"
                  points="0,0 127.5,127.5 255,0"
                /></svg>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </div>
    <div class="text-2xl">
      {{ text.value }}
    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const props = defineProps({
    text: Object
})
</script>

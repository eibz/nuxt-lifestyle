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
          <PopoverPanel
            class="relative"
          >
            <div class="w-screen h-screen bg-black opacity-70 fixed top-0 left-0" />
            <div class="-right-7 bottom-10 z-10 origin-top absolute">
              <PopoverButton class="block ml-auto">
                <IconCross
                  class="h-5 w-5 text-grey-light mb-2"
                />
              </PopoverButton>
              <div class="bg-grey-light text-xs rounded py-1 px-4">
                {{ text.tooltip }}
                <svg
                  class="absolute text-grey-light h-6 w-full left-0 top-full -m-px"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xml:space="preserve"
                ><polygon
                  class="fill-current"
                  points="0,0 127.5,127.5 255,0"
                /></svg>
              </div>
            </div>
          </PopoverPanel>
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
});
</script>

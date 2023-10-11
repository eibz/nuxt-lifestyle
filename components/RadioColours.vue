<template>
  <div>
    <h3 class="text-sm font-medium text-gray-900">
      {{ selectedColor.name }}
    </h3>

    <RadioGroup
      v-model="selectedColor"
      class="mt-4"
    >
      <RadioGroupLabel class="sr-only">
        Choose a color
      </RadioGroupLabel>
      <div class="flex items-center gap-3 flex-wrap">
        <RadioGroupOption
          v-for="color in colors"
          :key="color.name"
          v-slot="{ active, checked }"
          as="template"
          :value="color"
        >
          <div
            :class="[color.selectedClass, checked ? 'ring-1' : '']"
            class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-1 focus:outline-none"
          >
            <RadioGroupLabel
              as="span"
              class="sr-only"
            >
              {{ color.name }}
            </RadioGroupLabel>
            <span
              aria-hidden="true"
              :class="[color.class, 'rounded-full border border-black border-opacity-10',
                checked ? 'h-10 w-10' : 'h-11 w-11']"
              class="bg-gradient-to-b transition-all ease-in-out"
            />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

// const props = defineProps({
//     options: Array
// })

// const selected = ref(props.options[1])

const colors = [
    { name: 'Gray', class: 'from-[#333] to-[#333]', selectedClass: 'ring-[#333]' },
    { name: 'Lightblue', class: 'from-[#9ED5F4] to-[#639ECE]', selectedClass: 'ring-[#9ED5F4]' },
    { name: 'Blue', class: 'from-[#4FA9F8] to-[#4345F3]', selectedClass: 'ring-[#4FA9F8]' },
    { name: 'Green', class: 'from-[#5EC758] to-[#6A3FBE]', selectedClass: 'ring-[#5EC758]' },
    { name: 'Purple', class: 'from-[#622BD5] to-[#9F3FE2]', selectedClass: 'ring-[#622BD5]' },
    { name: 'Brown', class: 'from-[#BEA057] to-[#5A4524]', selectedClass: 'ring-[#BEA057]' },
    { name: 'Yellow', class: 'from-[#BA3E2E] to-[#D8B13E]', selectedClass: 'ring-[#BA3E2E]' },
    { name: 'Red', class: 'from-[#85190F] to-[#B82419]', selectedClass: 'ring-[#85190F]' },
];

const selectedColor = ref(colors[0])
</script>

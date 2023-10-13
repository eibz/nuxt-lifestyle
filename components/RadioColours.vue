<template>
  <div>
    <h3 class="text-sm font-medium text-gray-900">
      {{ selectedColour.name }}
    </h3>

    <RadioGroup
      v-model="selectedColour"
      class="mt-4"
      @update:modelValue="value => emit('update:modelValue', value)"
    >
      <RadioGroupLabel class="sr-only">
        Choose a color
      </RadioGroupLabel>
      <div class="flex items-center gap-3 flex-wrap">
        <RadioGroupOption
          v-for="color in colours"
          :key="color.name"
          v-slot="{ active, checked }"
          as="template"
          :value="color"
        >
          <div
            :class="[checked ? 'ring-1 ring-black' : '']"
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
              :class="!checked ? 'scale-110' : ''"
              :style="[color.swatchStyle.styles]"
              class="transition-all ease-in-out h-11 w-11 rounded-full border border-black border-opacity-10"
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
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    colours: Array,
});

// const colors = [
//     { name: 'smoke', class: 'from-[#333] to-[#333]', selectedClass: 'ring-[#333]' },
//     { name: 'silverblue', class: 'from-[#9ED5F4] to-[#639ECE]', selectedClass: 'ring-[#9ED5F4]' },
//     { name: 'blue', class: 'from-[#4FA9F8] to-[#4345F3]', selectedClass: 'ring-[#4FA9F8]' },
//     { name: 'green', class: 'from-[#5EC758] to-[#6A3FBE]', selectedClass: 'ring-[#5EC758]' },
//     { name: 'purple', class: 'from-[#622BD5] to-[#9F3FE2]', selectedClass: 'ring-[#622BD5]' },
//     { name: 'brown', class: 'from-[#BEA057] to-[#5A4524]', selectedClass: 'ring-[#BEA057]' },
//     { name: 'fire', class: 'from-[#BA3E2E] to-[#D8B13E]', selectedClass: 'ring-[#BA3E2E]' },
//     { name: 'red', class: 'from-[#85190F] to-[#B82419]', selectedClass: 'ring-[#85190F]' },
// ];

onMounted(() => {
    emit('update:modelValue', selectedColour.value);
});

const selectedColour = ref(props.colours[0]);
</script>

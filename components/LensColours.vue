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

onMounted(() => {
    emit('update:modelValue', selectedColour.value);
});

const selectedColour = ref(props.colours[0]);
</script>

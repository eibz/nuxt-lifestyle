<template>
  <div>
    <RadioGroup
      v-model="selectedType"
      @update:model-value="value => emit('update:model-value', value)"
    >
      <RadioGroupLabel class="sr-only">
        Choose lens type
      </RadioGroupLabel>
      <div class="flex items-center gap-3 justify-center">
        <RadioGroupOption
          v-for="option in types"
          :key="option"
          v-slot="{ checked }"
          as="template"
          :value="option"
        >
          <div
            :class="[checked ? 'sungod-gradient p-0.5' : 'bg-grey p-px ']"
            class="relative cursor-pointer rounded focus:outline-none w-full h-16"
          >
            <div class="bg-white w-full h-full rounded-sm flex cursor-pointer items-center justify-center">
              <RadioGroupLabel
                as="span"
              >
                <img
                  class="text-off-black h-3"
                  :src="`/icons/${option.name}-dark.svg`"
                />
              </RadioGroupLabel>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
const emit = defineEmits(['update:model-value']);
const props = defineProps({
    types: Array,
});

const selectedType = ref();
</script>

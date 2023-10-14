<template>
  <div>
    <h3 class="text-sm font-medium text-gray-900">
      {{ selectedType.name }}
    </h3>

    <RadioGroup
      v-model="selectedType"
      class="mt-4"
      @update:modelValue="value => emit('update:modelValue', value)"
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
            :class="[checked ? 'sungod-gradient' : 'bg-grey']"
            class="relative -m-0.5 cursor-pointer rounded p-px focus:outline-none w-full h-16"
          >
            <div class="transition-all ease-in-out bg-white w-full h-full rounded-sm flex cursor-pointer items-center justify-center">
              <RadioGroupLabel
                as="span"
                class=""
              >
                <img :src="`/icons/${option}.svg`" />
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
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    types: Array,
});

onMounted(() => {
    emit('update:modelValue', selectedType.value);
});

const selectedType = ref(props.types[0]);
</script>

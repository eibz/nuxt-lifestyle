<template>
  <div class="bg-gray-100 rounded-md">
    <RadioGroup
      v-model="selected"
      class="p-1"
    >
      <div class="grid grid-flow-col w-full gap-1">
        <RadioGroupOption
          v-for="option in options"
          :key="option.name"
          v-slot="{ checked }"
          as="template"
          :value="option"
        >
          <div
            :class="[ checked ? 'sungod-gradient text-white' : 'text-gray-900']"
            class="rounded-md focus:outline-none flex items-center justify-center py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
          >
            <RadioGroupLabel as="span">
              {{ option.name }}
            </RadioGroupLabel>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const props = defineProps({
    options: Array,
    modelValue: Object,
});

const emit = defineEmits(['update:model-value']);

const selected = ref(props.options.find(el => el.active === true));

onMounted(()=>{
    emit('update:model-value', selected.value);
});

watch(selected, () => {
    emit('update:model-value', selected.value);
});
</script>

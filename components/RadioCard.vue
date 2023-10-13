<template>
  <div class="bg-gray-100 rounded-md">
    <RadioGroup
      v-model="selected"
      class="p-2"
    >
      {{ selected }}
      <div class="grid grid-flow-col w-full gap-2">
        <RadioGroupOption
          v-for="option in options"
          :key="option.name"
          v-slot="{ checked }"
          as="template"
          :value="option"
        >
          <div
            :class="[ checked ? 'sungod-gradient text-white' : 'bg-white text-gray-900 hover:bg-gray-50', 'flex items-center justify-center py-3 px-3 text-sm font-semibold uppercase sm:flex-1']"
            class="rounded-md focus:outline-none"
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
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const props = defineProps({
    options: Array,
});

const active = props.options.find(el => el.active === true);
console.log(active);

const selected = ref(props.options.find(el => el.active === true));

// onMounted(()=>{
//     selected.value = props.options.find(el => el.active === true);
// });
// watch(selected, () => {
//     console.log(selected.value);
// });
</script>

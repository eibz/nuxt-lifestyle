<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="bg-white flex flex-col md:h-screen md:flex-row-reverse">
    <!-- Image gallery -->
    <div class="overflow-hidden md:flex-grow ">
      <HeroImage
        :image="image"
        :naked-eye-image="nakedEyeImage"
        :show-naked-eye-image="showNakedEyeImage"
        class="bg-grey-light cursor-pointer md:cursor-default"
        @pointerdown="showNakedEyeImage = true"
        @pointerup="showNakedEyeImage = false"
        @timeout="instructionsShown = false"
      >
        <template
          v-if="showGlasses"
          #default
        >
          <DynamicGlasses
            :colour="selectedColour.name"
          />
        </template>
      </HeroImage>
      <div class="relative">
        <div class="absolute bottom-7 w-full flex justify-between items-center px-7">
          <FloatingCard class="overflow-hidden md:hidden">
            <template #icon>
              <button @click="showGlasses = !showGlasses">
                <DynamicGlasses
                  v-if="!showGlasses"
                  :colour="selectedColour?.name"
                />
                <img
                  v-else
                  :src="image.src"
                />
              </button>
            </template>
          </FloatingCard>
          <div
            v-if="!showGlasses"
            class="text-white md:hidden"
          >
            <span v-if="instructionsShown">Press & Hold</span>
            <img
              v-else-if="selectedLens && !showNakedEyeImage"
              class="h-4"
              :src="icons[`${selectedLens.name}-light`]"
            />
            <span v-else-if="showNakedEyeImage && !instructionsShown">Naked Eye</span>
          </div>
          <div class="text-white hidden md:block md:flex-1">
            Naked eye
          </div>
          <div v-if="!showGlasses">
            <ScenePopover
              :scenes="scenesObj"
              @scene-changed="selectedScene = $event"
            />
          </div>
          <div class="hidden md:block md:flex-1">
            <img
              v-if="selectedLens"
              class="h-4 md:ml-auto"
              :src="icons[`${selectedLens.name}-light`]"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Product info -->
    <div class="px-7 py-6 grid items-start md:w-1/3 md:p-16 md:min-w-[496px]">
      <h1 class="hidden text-5xl md:block">
        {{ renegades.name }}
      </h1>
      <DynamicGlasses
        class="hidden relative h-32 w-96 -translate-y-[10%] mx-auto my-16 md:block"
        :colour="selectedColour?.name"
      />
      <RadioCard
        v-model="selectedTab"
        :options="lensTabs"
      />
      <div class="mt-4 min-h-[200px]">
        <div
          v-show="selectedTab.name.includes('Type')"
        >
          <LensType
            v-model="selectedLens"
            :types="lensTypes"
          />
          <div class="mt-4 mb-8">
            {{ selectedProduct?.optionTech?.displaySubtitle }}
          </div>
        </div>
        <LensColours
          v-show="selectedTab.name.includes('Colour')"
          v-model="selectedColour"
          :colours="lensColours"
        >
          <span
            v-if="selectedProduct"
            v-html="selectedProduct.name"
          />
        </LensColours>
      </div>
      <div class="flex justify-between flex-wrap self-end">
        <SpecsBox
          :text="{
            title: 'VLT',
            tooltip: `Couldn't find anything from the API to put here :(`,
            value: selectedProduct ? `${selectedProduct.vlt} %` : '-',
          }"
        />
        <SpecsBox :text="{title: 'UV Protection', tooltip: `Couldn't find anything from the API to put here :(`, value: '100%'}" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { filename } from 'pathe/utils';
const config = useRuntimeConfig();
const { productsApi, scenesApi } = config.public;

const products = await useFetch(productsApi);
const scenes = await useFetch(scenesApi);

const { renegades } = products.data.value;
const { parts } = renegades;
const lenses = parts.find(el => el.name.includes('Lenses'));

const excludeAllTypesRegex = new RegExp('Polarised|8KO|Prescription');
const lensColours = lenses.options.filter(el => !el.name.match(excludeAllTypesRegex));
const lensTypes = [
    { name:'4ko', skuPrefix:'rgle_N' },
    { name:'4kop', skuPrefix:'rgle_P' },
    { name:'8ko', skuPrefix:'rgle_8' },
    { name:'8kop', skuPrefix:'rgle_8P' },
];

const lensTabs = [
    { name: 'Lens Type', active: false },
    { name: 'Lens Colour', active: true },
];

const scenesObj = JSON.parse(scenes.data.value);
const image = ref(scenesObj[0].sceneImages.rgle_8smoke.image.responsiveImage);

const selectedTab = ref(lensTabs.find(el => el.active));
const selectedColour = ref(null);
const selectedLens = ref(null);
const selectedScene = ref(null);
const showNakedEyeImage = ref(false);
const instructionsShown = ref(true);
const showGlasses = ref(false);

// for dynamic images
const glob = import.meta.glob('@/assets/icons/*.svg', { eager: true });
const icons = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const nakedEyeImage = computed(() => selectedScene.value?.nakedEyeImage?.responsiveImage);
const selectedProduct = computed(() => {
    const colourName = selectedColour.value?.name.toLowerCase().replace(/\s/g, '');
    return lenses.options.find(el=> el.sku.includes(`${selectedLens.value?.skuPrefix}${colourName}`));
});

const getImageSku = () => {
    const keys = Object.keys(selectedScene.value.sceneImages);
    const colour = formatColourName(selectedColour.value.name);
    let match = keys.find((el) => el.includes(colour));
    if (selectedLens.value) {
        match = keys.find((el) => el.includes(`${selectedLens.value.skuPrefix}${colour}`));
    }
    return match;
};

const switchImage = () => {
    const sku = getImageSku();
    image.value = selectedScene.value.sceneImages[sku].image.responsiveImage;
};

watch([selectedColour, selectedLens, selectedScene], () => {
    if (selectedColour.value && selectedScene.value) {
        switchImage(false);
    }
});

</script>

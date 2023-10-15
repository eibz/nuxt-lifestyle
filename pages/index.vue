<template>
  <div class="bg-white flex flex-col md:h-screen md:flex-row-reverse">
    <!-- Image gallery -->
    <div class="md:flex-grow">
      <HeroImage
        :image="image"
        :naked-eye-image="nakedEyeImage"
        :show-naked-eye-image="nakedImageShown"
        class="bg-grey-light cursor-pointer md:cursor-default"
        @pointerdown="nakedImageShown = true"
        @pointerup="nakedImageShown = false"
        @timeout="instructionsShown = false"
      >
        <template
          v-if="showGlasses"
          #default
        >
          <GlassLensImage
            :colour="selectedColour.name"
          />
        </template>
      </HeroImage>
      <div class="relative">
        <div class="absolute bottom-7 w-full flex justify-between items-center px-7">
          <FloatingCard class="overflow-hidden md:hidden">
            <button @click="showGlasses = !showGlasses">
              <GlassLensImage
                v-if="!showGlasses"
                :colour="selectedColour?.name"
              />
              <img
                v-else
                :src="image.src"
              />
            </button>
          </FloatingCard>
          <div
            v-if="!showGlasses"
            class="text-white md:hidden"
          >
            <span v-if="instructionsShown">Press & Hold</span>
            <img
              v-else-if="selectedLens && !nakedImageShown"
              class="h-4"
              :src="`/icons/${selectedLens.name}-light.svg`"
            />
            <span v-else-if="nakedImageShown && !instructionsShown">Naked Eye</span>
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
              :src="`/icons/${selectedLens.name}-light.svg`"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Product info -->
    <div class="px-7 py-6 grid items-start md:w-1/3 md:p-16">
      <!-- Options -->
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
      <div class="flex justify-between my-4 flex-wrap self-end">
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
const products = await useFetch('https://www.sungod.co/products/9150/renegades?pdp=1');
const scenes = await useFetch('https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json');

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

const selectedTab = ref(lensTabs.find(el => el.active));

console.log(products.data.value);
const scenesObj = JSON.parse(scenes.data.value);
console.log(scenesObj);
console.log(lenses);

const selectedColour = ref(null);
const selectedLens = ref(null);
const selectedScene = ref(null);

const selectedProduct = computed(() => {
    const colourName = selectedColour.value?.name.toLowerCase().replace(/\s/g, '');
    return lenses.options.find(el=> el.sku.includes(`${selectedLens.value?.skuPrefix}${colourName}`));
});

const nakedEyeImage = computed(() => selectedScene.value?.nakedEyeImage?.responsiveImage);

const image = ref(scenesObj[0].sceneImages.rgle_8smoke.image.responsiveImage);

const nakedImageShown = ref(false);
const instructionsShown = ref(true);

const showGlasses = ref(false);

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

<template>
  <div class="bg-white">
    <!-- Image gallery -->
    <HeroImage
      :image="image"
      @pointerdown="switchImage(true)"
      @pointerup="switchImage(false)"
      @timeout="instructionsShown = false"
    />
    <div class="relative">
      <div class="absolute bottom-4 w-full flex justify-between items-center px-4">
        <div class="h-14 w-14 bg-white rounded-lg relative">
          <button>
            <Glasses />
          </button>
        </div>
        <div class="text-white">
          <span v-if="instructionsShown">Press & Hold</span>
          <img
            v-else-if="selectedLens && !nakedImageShown"
            class="h-4"
            :src="`/icons/${selectedLens.name}-light.svg`"
          />
          <span v-else-if="nakedImageShown && !instructionsShown">Naked Eye</span>
        </div>
        <div>
          <ScenePopover
            :scenes="scenesObj"
            @scene-changed="selectedScene = $event"
          />
        </div>
      </div>
    </div>

    <!-- Product info -->
    <div class="max-w-2xl mx-4 mt-2 grid sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <!-- Options -->
      <div class="mt-4 lg:row-span-3 lg:mt-0">
        <RadioCard
          v-model="selectedTab"
          :options="lensTabs"
        />
      </div>
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
      <div class="flex justify-between my-4 flex-wrap">
        <SpecsBox :text="{title: 'VLT', tooltip: `Couldn't find anything from the API to put here :(`, value: `${selectedProduct?.vlt} %`} " />
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

const image = ref(scenesObj[0].sceneImages.rgle_8smoke.image.responsiveImage);
const nakedImageShown = ref(false);
const instructionsShown = ref(true);

const switchImage = (showNakedEye) => {
    if (showNakedEye) {
        nakedImageShown.value = true;
        image.value = selectedScene.value.nakedEyeImage.responsiveImage;
        return;
    }
    nakedImageShown.value = false;
    const keys = Object.keys(selectedScene.value.sceneImages);
    let match = keys.find((el) => el.includes(selectedColour.value.name.toLowerCase().replace(/\s/g, '')));
    if (selectedLens.value) {
        match = keys.find((el) => el.includes(`${selectedLens.value.skuPrefix}${selectedColour.value.name.toLowerCase().replace(/\s/g, '')}`));
    }
    image.value = selectedScene.value.sceneImages[match].image.responsiveImage;

};

watch([selectedColour, selectedLens, selectedScene], () => {
    if (selectedColour.value && selectedScene.value) {
        switchImage(false);
    }
});

</script>

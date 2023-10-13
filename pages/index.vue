<template>
  <div class="bg-white">
    <!-- Image gallery -->
    <HeroImage
      :image="image"
      @pointerdown="showNakedEyeImage(true)"
      @pointerup="showNakedEyeImage(false)"
    />
    <div class="relative">
      <div class="absolute bottom-4 w-full flex justify-between items-center px-4">
        <div class="h-11 w-11 bg-white rounded-lg relative">
          <button>
            <Glasses />
          </button>
        </div>
        <div class="text-white">
          Text Middle
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
          :options="[
            { name: 'Lens Type', },
            { name: 'Lens Colour', active: showColours },
          ]"
        />
      </div>
      <LensColours
        v-if="showColours"
        class="mt-4 min-h-[300px]"
        :colours="colours"
        @update:model-value="selectedColour = $event"
      />
      <LensType v-else />
      <div class="flex justify-between mb-2">
        <SpecsBox :text="{title: 'VLT', tooltip: 'blabla', value: '14%'}" />
        <SpecsBox :text="{title: 'UV Protection', tooltip: 'blabla', value: '100%'}" />
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
const colours = lenses.options.filter(el => !el.name.match(excludeAllTypesRegex));

console.log('colours', colours);

console.log(products.data.value);
const scenesObj = JSON.parse(scenes.data.value);
console.log(scenesObj);

const selectedColour = ref(null);
const selectedScene = ref(null);

const image = ref(scenesObj[0].nakedEyeImage.responsiveImage);

const showColours = ref(true);

const showNakedEyeImage = (boolean) => {
    if (boolean) {
        image.value = selectedScene.value.nakedEyeImage.responsiveImage;
    } else {
        const keys = Object.keys(selectedScene.value.sceneImages);
        const match = keys.find((el) => el.includes(selectedColour.value.name.toLowerCase().replace(/\s/g, '')));
        image.value = selectedScene.value.sceneImages[match].image.responsiveImage;
    }
};

watch(selectedColour, () => {
    showNakedEyeImage(false);
});

watch(selectedScene, () => {
    showNakedEyeImage(false);
});

</script>

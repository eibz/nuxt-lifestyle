<template>
  <div class="bg-white">
    <!-- Image gallery -->
    <HeroImage :image="scenesObj[0].nakedEyeImage.responsiveImage" />
    <div class="relative">
      <div class="absolute bottom-4 w-full flex justify-between items-center px-4">
        <div class="h-11 w-11 bg-white rounded-md relative">
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
            class=""
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
            { name: 'Lens Type' },
            { name: 'Lens Colour' },
          ]"
        />
      </div>
      <RadioColours class="mt-4 min-h-[300px]" />
      <div class="flex justify-between mb-2">
        <SpecsBox :text="{title: 'VLT', tooltip: 'blabla', value: '14%'}" />
        <SpecsBox :text="{title: 'UV Protection', tooltip: 'blabla', value: '100%'}" />
      </div>
    </div>
    <!-- <Swipe /> -->
  </div>
</template>
<script setup>
const products = await useFetch('https://www.sungod.co/products/9150/renegades?pdp=1');
const scenes = await useFetch('https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json');
console.log(products.data.value);
const scenesObj = JSON.parse(scenes.data.value);
console.log(scenesObj);
</script>

<template>
  <div>
    <div class="bg-white">
      <div>
        <!-- Image gallery -->
        <HeroImage :image="scenesObj[0].nakedEyeImage.responsiveImage" />

        <!-- Product info -->
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ productTemp.name }}
            </h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:row-span-3 lg:mt-0">
            <h2 class="sr-only">
              Product information
            </h2>
            <p class="text-3xl tracking-tight text-gray-900">
              {{ productTemp.price }}
            </p>

            <!-- Reviews -->
            <div class="mt-6">
              <h3 class="sr-only">
                Reviews
              </h3>
              <div class="flex items-center">
                <div class="flex items-center">
                </div>
                <p class="sr-only">
                  {{ reviews.average }} out of 5 stars
                </p>
                <a
                  :href="reviews.href"
                  class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >{{ reviews.totalCount }} reviews</a>
              </div>
            </div>

            <form class="mt-10">
              <!-- Colors -->
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  Color
                </h3>

                <RadioGroup
                  v-model="selectedColor"
                  class="mt-4"
                >
                  <RadioGroupLabel class="sr-only">
                    Choose a color
                  </RadioGroupLabel>
                  <div class="flex items-center space-x-3">
                    <RadioGroupOption
                      v-for="color in productTemp.colors"
                      :key="color.name"
                      v-slot="{ active, checked }"
                      as="template"
                      :value="color"
                    >
                      <div :class="[color.selectedClass, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                        <RadioGroupLabel
                          as="span"
                          class="sr-only"
                        >
                          {{ color.name }}
                        </RadioGroupLabel>
                        <span
                          aria-hidden="true"
                          :class="[color.class, 'h-8 w-8 rounded-full border border-black border-opacity-10']"
                        />
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </div>

              <!-- Sizes -->
              <div class="mt-10">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-900">
                    Size
                  </h3>
                  <a
                    href="#"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >Size guide</a>
                </div>

                <RadioGroup
                  v-model="selectedSize"
                  class="mt-4"
                >
                  <RadioGroupLabel class="sr-only">
                    Choose a size
                  </RadioGroupLabel>
                  <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    <RadioGroupOption
                      v-for="size in productTemp.sizes"
                      :key="size.name"
                      v-slot="{ active, checked }"
                      as="template"
                      :value="size"
                      :disabled="!size.inStock"
                    >
                      <div :class="[size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-2 ring-indigo-500' : '', 'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
                        <RadioGroupLabel as="span">
                          {{ size.name }}
                        </RadioGroupLabel>
                        <span
                          v-if="size.inStock"
                          :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']"
                          aria-hidden="true"
                        />
                        <span
                          v-else
                          aria-hidden="true"
                          class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                        >
                          <svg
                            class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                          >
                            <line
                              x1="0"
                              y1="100"
                              x2="100"
                              y2="0"
                              vector-effect="non-scaling-stroke"
                            />
                          </svg>
                        </span>
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <!-- Description and details -->
            <div>
              <h3 class="sr-only">
                Description
              </h3>

              <div class="space-y-6">
                <p class="text-base text-gray-900">
                  {{ productTemp.description }}
                </p>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">
                Highlights
              </h3>

              <div class="mt-4">
                <ul
                  role="list"
                  class="list-disc space-y-2 pl-4 text-sm"
                >
                  <li
                    v-for="highlight in productTemp.highlights"
                    :key="highlight"
                    class="text-gray-400"
                  >
                    <span class="text-gray-600">{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">
                Details
              </h2>

              <div class="mt-4 space-y-6">
                <p class="text-sm text-gray-600">
                  {{ productTemp.details }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ scenesObj[0] }} -->
    <!-- <img :src="scenesObj[0].nakedEyeImage.responsiveImage.src" /> -->
    <!-- <Glasses /> -->
    <div class="relative">
      <ScenePopover
        :scenes="scenesObj"
        class="absolute bottom-4 right-4"
      />
    </div>
  </div>
</template>
<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
const products = await useFetch('https://www.sungod.co/products/9150/renegades?pdp=1');
const scenes = await useFetch('https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json');
console.log(products.data.value);
const scenesObj = JSON.parse(scenes.data.value);
console.log(scenesObj);


const productTemp = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const selectedColor = ref(productTemp.colors[0])
const selectedSize = ref(productTemp.sizes[2])

</script>

<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->

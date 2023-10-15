// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    app: {
        baseURL: '/nuxt-lifestyle/',
    },
    devServer: {
        port: 4500,
    },
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxtjs/eslint-module',
        '@vueuse/nuxt',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            scenesApi: 'https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json',
            productsApi: 'https://www.sungod.co/products/9150/renegades?pdp=1',
        }
    },
});

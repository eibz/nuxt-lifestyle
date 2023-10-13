// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
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
});

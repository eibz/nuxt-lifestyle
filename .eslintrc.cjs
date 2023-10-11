module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        // 'plugin:vue/essential',
        '@nuxt/eslint-config',
        // '@vue/airbnb',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        // 'vue/html-indent': ['error', 4],
        // 'max-len': ['error', { code: 200 }],
        // 'vue/max-len': ['error', { code: 200 }],
        // 'vue/multi-word-component-names': 'off',
        'no-undef': 'off',
    },
};

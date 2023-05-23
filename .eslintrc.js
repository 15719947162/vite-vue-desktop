module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:vue/vue3-recommended', 'prettier'],
    plugins: ['prettier', 'vue'],
    rules: {
        'vue/no-mutating-props': 0,
    },
};

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint-config-prettier'],
  plugins: ['eslint-config-prettier'],
  rules: {
    'vue/multi-word-component-names': 0,
  },
};

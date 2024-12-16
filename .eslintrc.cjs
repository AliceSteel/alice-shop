require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'vue/max-attributes-per-line': ['error', {
      multiline: {
        max: 1,
      },
      singleline: {
        max: 1,
      }
    }],
    'prettier/prettier': 'error',
    indent: ['error', 2],
  }
}

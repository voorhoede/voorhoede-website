import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt()
  .append({
    rules: {
      'prefer-const': 'off',
      'no-constant-binary-expression': 'off',

      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      'import/first': 'off',
      'import/no-self-import': 'off',

      'vue/attributes-order': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  });

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'vuejs-accessibility',
  ],
  // add your custom rules here
  rules: {
    'no-debugger': 0,
    'no-console': 1,
    'no-unused-vars': 1,
    'no-prototype-builtins': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/self-closing-tag': 0,
    'vue/attributes-order': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'vuejs-accessibility/label-has-for': [2, {
      'required': {
        'some': ['nesting', 'id'],
      },
      'allowChildren': true,
    }],
    'quotes': [2, 'single'],
    'curly': [2, 'multi-line'],
    'object-curly-spacing': [2, 'always'],
    'semi': [1, 'never', { 'beforeStatementContinuationChars': 'never' }],
  },
}

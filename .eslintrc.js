module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-debugger': 0,
    'no-console': 1,
    'no-unused-vars': 1,
    'vue/max-attributes-per-line': 0,
    'comma-dangle': [2, 'always-multiline'],
    'quotes': [2, 'single'],
    'curly': [2, 'multi-line'],
    'object-curly-spacing': [2, 'always'],
    'semi': [2, "never", { "beforeStatementContinuationChars": "never"}]
  }
}

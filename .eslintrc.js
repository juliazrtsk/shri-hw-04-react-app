module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['react', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/no-array-index-key': 'warn',
    'no-unused-vars': 'warn',
    'no-debugger': 'warn',
  },
};

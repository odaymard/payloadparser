module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'eslint:recommended'],
  plugins: ['prettier'],

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',

    indent: [2, 2, { SwitchCase: 1 }],
  },
};

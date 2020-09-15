module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'space-before-function-paren': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  extends: [
    'standard',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'plugin:prettier/recommended'
  ]
}

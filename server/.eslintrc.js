module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'strict': ["error", "global"],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'semi': ['error', 'never'],
    'max-len': ['error', { 'code': 100, 'ignoreComments': true, 'ignoreTrailingComments': true, 'ignoreUrls': true, 'ignoreStrings': true, 'ignoreTemplateLiterals': true, 'ignoreRegExpLiterals': true }],
  },
  parserOptions: {
    sourceType: 'script',
  },
  globals: {
    use: true,
  },
}

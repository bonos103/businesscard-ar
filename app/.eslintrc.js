module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js'),
      },
    },
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    // 'airbnb-base/legacy',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'semi': ['error', 'never'],
    'max-len': ['error', { 'code': 100, 'ignoreComments': true, 'ignoreTrailingComments': true, 'ignoreUrls': true, 'ignoreStrings': true, 'ignoreTemplateLiterals': true, 'ignoreRegExpLiterals': true }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      svg: 'never',
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

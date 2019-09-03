const path = require('path')

function resolve(p) {
  return path.join(__dirname, p)
}

module.exports = {
  plugins: {
    // autoprefixer: {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'color-mod-function': true,
        'media-query-ranges': true,
        'custom-media-queries': {
          importFrom: [
            resolve('./src/assets/stylesheets/media.css'),
          ],
        },
        'custom-properties': {
          preserve: false,
          importFrom: [
            resolve('./src/assets/stylesheets/variables.css'),
          ],
        },
      },
    },
  },
}

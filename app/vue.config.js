module.exports = {
  devServer: {
    host: '0.0.0.0',
    https: true,
    disableHostCheck: true,
    compress: true,
    stats: 'normal',
    clientLogLevel: 'debug',
    quiet: false,
  },
  configureWebpack: (config) => { // eslint-disable-line
    return {
      optimization: {
        splitChunks: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    }
  },
}

const fs = require('fs')
const path = require('path')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.join(__dirname, '../cert/localhost+2-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../cert/localhost+2.pem')),
    },
    disableHostCheck: true,
    compress: true,
    stats: 'normal',
    clientLogLevel: 'debug',
    quiet: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
      },
      '/upload': {
        target: process.env.VUE_APP_API_URL,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule
      .oneOf('component')
      .resourceQuery(/component/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
    svgRule.oneOf('normal').uses.merge(svgRule.uses.entries())
    svgRule.uses.clear()
  },
  configureWebpack: (config) => { // eslint-disable-line
    // console.log(config.optimization.splitChunks)
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 250000,
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      }
    }
    // config.optimization = {
    //   splitChunks: {
    //     cachegroups: {
    //       commons: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendor',
    //         chunks: 'initial',
    //       },
    //     },
    //   },
    // }
    // config.resolve = {
    //   extensions: ['.js', '.vue'],
    // }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'font-family': '"游ゴシック体", "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;',
        },
        javascriptEnabled: true,
      },
    },
  },
}

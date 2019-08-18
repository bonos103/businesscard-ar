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
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'font-family': '"游ゴシック体", "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;'
        },
        javascriptEnabled: true,
      },
    },
  },
}

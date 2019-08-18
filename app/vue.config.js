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
    // config.module.rule('svg-component')
    //   .test(/\.svg?component/)
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader')
    const svgRule = config.module.rule('svg')
    const svgNormalUse = svgRule.uses.store.get('file-loader')
    console.log(svgRule.uses)
    console.log(svgNormalUse)
    svgRule.uses.clear()
    // console.log(svgRule.oneOf('component'))
    svgRule
      .oneOf('component')
      .resourceQuery(/\?component/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
    svgRule.oneOfs.store.set('normal', svgNormalUse)

    console.log(svgRule.oneOfs)
    // svgRule.uses.clear()

    // svgRule
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader')
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

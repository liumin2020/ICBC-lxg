module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: true,
  productionSourceMap: false,
  
  devServer: {
    // port:8088,
    open:true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target:process.env.VUE_APP_URL,
        // target:"http://xh4j5t.natappfree.cc",
        target:'http://120.92.94.95:5000',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
      }
    }
  }
}




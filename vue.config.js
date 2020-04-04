module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/scss/_all.scss";
                `
      }
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/global/_functions.scss";
          @import "@/styles/global/_mixins.scss";
          @import "@/styles/global/_variables.scss";
          @import "@/styles/global/_extends.scss";
        `
      },
      less: {
        javascriptEnabled: true
      }
    }
  }
};

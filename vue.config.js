module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: "http://127.0.0.1:8000/",
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};

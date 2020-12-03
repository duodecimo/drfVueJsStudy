module.exports = {
  outputDir: "../dist",
  devServer: {
    proxy: {
      "^/rest-auth": {
        // target: "http://127.0.0.1:8000",
        target: "http://192.168.25.5:8000",
        ws: false,
        logLevel: "debug"
      },
      "^/api": {
        // target: "http://127.0.0.1:8000",
        target: "http://192.168.25.5:8000",
        ws: false
      },
      "^/registration": {
        // target: "http://127.0.0.1:8000",
        target: "http://192.168.25.5:8000",
        ws: false
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  assetsDir: "static",
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};

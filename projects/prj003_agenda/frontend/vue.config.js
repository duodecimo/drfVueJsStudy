module.exports = {
  outputDir: "../dist",
  devServer: {
    https: false,
    proxy: {
      "^/rest-auth": {
        target: "http://localhost:8000",
        // target: "https://192.168.25.5:8000",
        ws: false,
        logLevel: "debug"
      },
      "^/api": {
        target: "http://localhost:8000",
        // target: "https://192.168.25.5:8000",
        ws: false
      },
      "^/registration": {
        target: "http://localhost:8000",
        // target: "https://192.168.25.5:8000",
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

module.exports = {
  outputDir: "../dist",
  devServer: {
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:8000",
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

// funciona, mas não tem proxy para diferenciar entre dev e prod
// module.exports = {
//   devServer: {
//     host: "127.0.0.1",
//     port: 8080,
//     public: "localhost:8080"
//   }
// };

// funciona, mas prejudica de alguma forma o hot reload
// const BundleTracker = require("webpack-bundle-tracker");

// const BundleTracker = require("webpack-bundle-tracker");

// module.exports = {
//   // on Windows you might want to set publicPath: "http://127.0.0.1:8080/"
//   publicPath: "http://127.0.0.1:8000/",
//   outputDir: "../dist/",

//   chainWebpack: config => {
//     config
//       .plugin("BundleTracker")
//       .use(BundleTracker, [{ filename: "./webpack-stats.json" }]);

//     config.output.filename("bundle.js");

//     config.optimization.splitChunks(false);

//     config.resolve.alias.set("__STATIC__", "static");

//     config.devServer
//       // the first 3 lines of the following code have been added to the configuration
//       .public("http://localhost:8080")
//       .host("localhost")
//       .port(8080)
//       .hotOnly(true)
//       .watchOptions({ poll: 1000 })
//       .https(false)
//       .disableHostCheck(true)
//       .headers({ "Access-Control-Allow-Origin": ["*"] });
//   },
//   // uncomment before executing 'npm run build'
//   css: {
//     extract: {
//       filename: "bundle.css",
//       chunkFilename: "bundle.css"
//     }
//   }
// };

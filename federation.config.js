const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'cadastros',

  exposes: {
    './Component': './src/app.component.ts',
    "./routes": "./src/app.routes.ts",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', transient: true }),
    "@primeng/themes/types": {
      transient: true,
      packageInfo: {
        entryPoint: "node_modules/@primeng/themes/index.mjs",
        version: "19.0.5",
        esm: true,
      },
    },
    "@primeng/themes/lara": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
      transient: true,
      includeSecondaries: false,
      build: "separate",
    },
    '@primeng/themes/lara/accordion': {
      transient: true,
      packageInfo: {
        entryPoint: 'node_modules/@primeng/themes/lara/accordion/index.mjs',
        version: '19.0.5',
        esm: true
      }
    },
    "primeicons": {
      transient: true,
      packageInfo: {
        entryPoint: "node_modules/primeicons/package.json",
        version: "7.0.0",
        esm: true,
      },
    },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

});

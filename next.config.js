const { reject } = require('ramda');

module.exports = {
  distDir: '../build',
  // Use this assetPrefix when app is loading assets from CDN
  assetPrefix: process.env.APP_CONTEXT_ROUTE,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    // Ignore test files in pages directory
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      const isTestFile = fileName => /\.test\.(js|jsx)/.test(fileName);

      const entriesWithoutTestFiles = reject(isTestFile, entries);

      return entriesWithoutTestFiles;
    };

    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    nodeEnv: process.env.NODE_ENV, // Pass through env variables
    contextRoute: process.env.APP_CONTEXT_ROUTE || '',
    assetPrefix: process.env.APP_CONTEXT_ROUTE
  }
};

const withSass = require('@zeit/next-sass');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = withSass({
  cssModules: true,
});

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  },
  webpack: (config) => {
    config.optimization.minimizer = config.optimization.minimizer || [];
    config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    config.optimization.minimizer.push(new TerserPlugin());

    return config;
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};

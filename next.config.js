const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withLess = require('next-with-less');

const nextConfig = (phase) => {
  const env = {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
    NEXT_APP_API_HOST: process.env.NEXT_APP_API_HOST,
  };
  /** @type {import('next').NextConfig} */
  const config = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    env,
    lessLoaderOptions: {
      // cssModules: true,
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
    // Disable css--modules component styling
    webpack(config) {
      //  Source: https://cwtuan.blogspot.com/2022/10/disable-css-module-in-nextjs-v1231-sept.html
      config.module.rules.forEach((rule) => {
        const { oneOf } = rule;
        if (oneOf) {
          oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes('_app')) return;
            one.issuer.and = [path.resolve(__dirname)];
          });
        }
      });
      return config;
    },
  };
  return withBundleAnalyzer(withLess(config));
};

module.exports = nextConfig;

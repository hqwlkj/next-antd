// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withLess = require('next-with-less');
const dayjs = require('dayjs');
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = (phase) => {
  const env = {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
    NEXT_APP_API_HOST: process.env.NEXT_APP_API_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  };
  /** @type {import('next').NextConfig} */
  const config = {
    output: 'standalone',
    reactStrictMode: true,
    transpilePackages: ['@ant-design/icons'],
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    env,
    publicRuntimeConfig: env,
    compiler: {
      // Remove `console.*` output except `console.error`
      removeConsole: isProd
        ? {
            exclude: ['error'],
          }
        : false,
      // Uncomment this to suppress all logs.
      // removeConsole: true,
    },
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
    sentry: {
      // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
      // for client-side builds. (This will be the default starting in
      // `@sentry/nextjs` version 8.0.0.) See
      // https://webpack.js.org/configuration/devtool/ and
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
      // for more information.
      hideSourceMaps: true,
    },
  };
  return withBundleAnalyzer(
    withSentryConfig(withLess(config), {
      debug: !isProd,
      environment: process.env.NODE_ENV,
      release: `${process.env.NODE_ENV}@${dayjs().format('YYYY-MM-DD HH:mm')}`,
    }),
  );
};

module.exports = nextConfig;

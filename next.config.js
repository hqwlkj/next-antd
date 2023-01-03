const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withLess = require("next-with-less");
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD} = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  console.log('process.env:', process.env);
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    IS_DEV: isDev,
    IS_PROD: isProd,
    IS_STAGING: isStaging
  }

  return {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    env
  }
}

module.exports = withBundleAnalyzer(withLess(nextConfig))

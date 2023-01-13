import React from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import '@/styles/mixins.less';
import '@/styles/globals.less';
import '@/styles/fonts.css';
import 'nprogress/nprogress.css';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import ConfigProvider from '@/context/ConfigProvider';
import ShoppingCartProvider from '@/context/ShoppingCartProvider';
import NotFoundPage from '@/pages/404';
import packageInfo from '../../package.json';

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeError', NProgress.done);
Router.events.on('routeChangeComplete', NProgress.done);

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};
if (process.env.NEXT_APP_ENV === 'staging' || process.env.NEXT_APP_ENV === 'production') {
  Sentry.init({
    dsn: 'https://81cc8b0a4eb545449bedad45af7c3496@o907233.ingest.sentry.io/4504489964732416',
    release: 'marketplace@' + packageInfo.version,
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.NEXT_APP_ENV,
    tracesSampleRate: 0.5,
    sampleRate: 0.5,
  });
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // SSR Render
  const cache = createCache();

  return (
    <AntdConfigProvider>
      <Sentry.ErrorBoundary fallback={NotFoundPage}>
        <StyleProvider cache={cache}>
          <ConfigProvider>
            <ShoppingCartProvider>{getLayout(<Component {...pageProps} />)}</ShoppingCartProvider>
          </ConfigProvider>
        </StyleProvider>
      </Sentry.ErrorBoundary>
    </AntdConfigProvider>
  );
}

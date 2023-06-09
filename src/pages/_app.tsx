import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import '@/styles/mixins.less';
import '@/styles/globals.less';
import '@/styles/fonts.css';
import 'nprogress/nprogress.css';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import ConfigProvider from '@/context/ConfigProvider';
import ShoppingCartProvider from '@/context/ShoppingCartProvider';
import { useServerInsertedHTML } from 'next/navigation';
import Script from 'next/script';

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeError', NProgress.done);
Router.events.on('routeChangeComplete', NProgress.done);

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // SSR Render
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <Script
        id="cache-styles"
        dangerouslySetInnerHTML={{
          __html: `<Script>${extractStyle(cache)}</Script>`,
        }}
      />
    );
  });

  return (
    <AntdConfigProvider>
      <StyleProvider cache={cache}>
        <ConfigProvider>
          <ShoppingCartProvider>{getLayout(<Component {...pageProps} />)}</ShoppingCartProvider>
        </ConfigProvider>
      </StyleProvider>
    </AntdConfigProvider>
  );
}

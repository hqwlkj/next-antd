import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

const AppDocument = (props: any) => {
  return (
    <Html lang="en">
      <Head>
        {/*<style>============== antd style start ===============</style>*/}
        <style
          type="text/css"
          data-style-name="ui-style"
          dangerouslySetInnerHTML={{ __html: props?.props?.style }}
        />
        {/*<style>============== antd style end ===============</style>*/}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

AppDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);

  return {
    ...initialProps,
    props: {
      style,
    },
  };
};
export default AppDocument;

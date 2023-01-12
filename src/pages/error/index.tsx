import React from 'react';
import Layout from '@/layouts';
import Head from 'next/head';
import styles from './index.module.less';
import { NextPageWithLayout } from '@/pages/_app';
import { InferGetStaticPropsType } from 'next';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const ErrorPage: NextPageWithLayout<InferGetStaticPropsType<typeof getServerSideProps>> = () => {
  return (
    <div className={styles.errorPageContainer}>
      <h2 className={styles.title}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </h2>
      <span>
        Please make sure you typed in the right URL. You can
        <a target="_blank" href="mailto:creators@pietrastudio.com" rel="noreferrer">
          contact
        </a>
        Pietra to discuss any problems you&apos;re experiencing.
      </span>
      <img src="/images/404_error.png" alt="404" />
    </div>
  );
};

ErrorPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      head={
        <Head>
          <title>The Largest Creator-First Marketplace | Pietra</title>
          <meta
            name="description"
            content="Shop the largest marketplace in the world for creator-branded goods."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="The Largest Creator-First Marketplace | Pietra" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
    >
      {page}
    </Layout>
  );
};

export default ErrorPage;

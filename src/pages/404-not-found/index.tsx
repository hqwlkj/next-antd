import React from 'react';
import Layout from '@/layouts';
import Head from 'next/head';
import styles from './index.module.less';

const NotFoundPage = () => {
  return (
    <div className={styles.errorPageContainer}>
      <h2 className={styles.title}>Sorry, we couldn't find the page you're looking for.</h2>
      <span>
        Please make sure you typed in the right URL. You can
        <a target="_blank" href="mailto:creators@pietrastudio.com" rel="noreferrer">
          contact
        </a>
        Pietra to discuss any problems you're experiencing.
      </span>
      <img src="/images/404_error.png" alt="404" />
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page: React.ReactElement) {
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

export default NotFoundPage;

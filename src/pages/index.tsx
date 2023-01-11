import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
import { NextPageWithLayout } from './_app';
import React from 'react';
import Layout from '../layouts';
import Marketplace from '@/components/Marketplace';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getServerSideProps>> = () => {
  return <Marketplace />;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
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

export default Home;

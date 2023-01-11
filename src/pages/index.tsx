import Head from 'next/head';
import { Inter } from '@next/font/google';
import type { GetServerSidePropsContext, InferGetStaticPropsType } from 'next';
import { NextPageWithLayout } from './_app';
import React from 'react';
import Layout from '../layouts';
import Marketplace from '@/components/Marketplace';
import { isMobileByUserAgent } from '@/shared/utils';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = isMobileByUserAgent(userAgent);
  return {
    props: { isMobile },
  };
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  isMobile,
}) => {
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

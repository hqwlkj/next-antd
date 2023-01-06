import Head from 'next/head';
import { Inter } from '@next/font/google';
import type { InferGetStaticPropsType } from 'next';
import { NextPageWithLayout } from './_app';
import React from 'react';
import Layout from '../layouts';
import Marketplace from '@/components/Marketplace';
import useBusinessSettingsDisplay from '@/lib/hooks/common/useBusinessSettingsDisplay';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps() {
  const res = await fetch('https://ip.me');
  return {
    props: {
      name: 'next-name',
    },
  };
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getServerSideProps>> = () => {
  const { value: heroData } = useBusinessSettingsDisplay('MARKETPLACE');
  return <Marketplace heroData={heroData?.value || {}} />;
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

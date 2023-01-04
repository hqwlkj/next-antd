import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from './index.module.less';
import { NextPageWithLayout } from './_app';
import React from 'react';
import Layout from '../layouts';
import * as process from 'process';
import { Button, DatePicker, Space } from 'antd';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps() {
  const res = await fetch('https://ip.me');
  return {
    props: {
      name: 'next-name',
    },
  };
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getServerSideProps>> = ({ name }) => {
  return (
    <div className={styles.container}>
      Where Brands Tell Their Stories: {name}
      <div>env: {process.env.NODE_ENV}</div>
      <div>build - env: {process.env.NODE_ENV}</div>
      <Space>
        <DatePicker />
        <Button type={'primary'}>Primary Button</Button>
      </Space>
    </div>
  );
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

import type {InferGetStaticPropsType} from "next";
import styles from './index.module.less';
import Layout from "../../layouts";
import Head from "next/head";
import React from "react";
import {NextPageWithLayout} from "../_app";

export async function getStaticProps() {
  const res = await fetch('https://ip.me');
  console.log('getStaticProps - res:', res);
  return {
    props: {
      name: 'next-name',
      age: 23
    },
  }
}
const About: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({name, age}) =>{
  console.log('==========');
  return (
    <div className={styles.aboutPage}> this is about page {name}: {age}</div>
  )
}

About.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout head={<Head>
      <title>about - page</title>
    </Head>}>
      {page}
    </Layout>
  )
}

export default About;
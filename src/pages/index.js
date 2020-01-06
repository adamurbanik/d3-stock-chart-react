import React from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout/layout';

const Home = () => {


  const onClickHandler = async () => {
    console.log('onClickHandler');

    try {
      const response = await fetch(`http://localhost:3000/app/api/stock/request`)
      const data = await response.json();



    } catch (err) {
      console.log('err');
    }

  };

  return (
    <Layout>
      <Head>
        <title>Stock Chart</title>
      </Head>
      <Button variant="outlined" color="primary" onClick={onClickHandler}>
        Click
      </Button>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Home;

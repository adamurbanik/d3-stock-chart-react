import React from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout/layout';
import d3Service from '../services/d3Service';

const Home = () => {


  const onClickHandler = async () => {
    console.log('onClickHandler');

    try {
      const response = await fetch(`http://localhost:3000/app/api/stock/request`)
      const { data } = await response.json();

      const d3 = new d3Service(data);


    } catch (err) {
      console.log('err', err);
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
      <svg className="svg-stock" width="960" height="500"></svg>
      <svg className="svg-chart" width="960" height="500"></svg>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Home;

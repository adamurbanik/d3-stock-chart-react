import { default as React, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout/layout';
import Main from '../components/layout/main';
import Header from '../components/header';
import D3Service from '../services/d3Service';
import { apiRoutes } from '../utils/config';

const Stock = ({ classes }) => {
  let d3 = useRef();

  useEffect(() => {
    d3 = new D3Service();
  }, []);

  const onClickHandler = async () => {
    try {
      const response = await fetch(`${apiRoutes.requestStock}`);
      const { data } = await response.json();

      d3.applyStockData(data);
      d3.applyChartData(data);
    } catch (err) {}
  };

  return (
    <Layout>
      <Head>
        <title>Stock Chart</title>
      </Head>
      <Main>
        <Header />
        <div className="button-wrapper">
          <Button variant="outlined" color="primary" onClick={onClickHandler}>
            Show Chart
          </Button>
          <div className="chart-wrapper">
            <svg className="svg-stock" width="960" height="500"></svg>
            <svg className="svg-chart" width="960" height="500"></svg>
          </div>
        </div>
      </Main>
      <style jsx>{`
        .button-wrapper {
          align-self: center;
        }

        .chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </Layout>
  );
};

export default Stock;

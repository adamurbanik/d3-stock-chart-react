import { default as React, useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Layout from '../components/layout/layout';
import Main from '../components/layout/main';
import Header from '../components/header';
import { apiRoutes } from '../utils/config';
import { withD3Service } from '../hocs';
import Error from '../components/error';
import Loader from '../components/loader';
import SearchForm from '../components/searchForm';

const Stock = ({ d3Service }) => {
  const [indexCode, setIndexCode] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = event => {
    setIndexCode(event.currentTarget.value);
  };

  const onClickHandler = async () => {
    try {
      setIsLoading(true);

      d3Service.removeAll();

      const response = await fetch(
        `${apiRoutes.requestStock}?dataset=${indexCode}`
      );
      const { data } = await response.json();

      d3Service.applyStockData(data);
      d3Service.applyChartData(data);

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitSuccess(false);
    } finally {
      setSubmitted(true);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Stock Chart</title>
      </Head>
      <Main>
        {isLoading && <Loader />}
        {!isLoading && <Header />}
        <div className="container">
          {!isLoading && (
            <SearchForm
              handleOnChange={handleOnChange}
              onClickHandler={onClickHandler}
              indexCode={indexCode}
            />
          )}
          {!isLoading && submitted && !submitSuccess && <Error />}
          <div className={classNames('chart-wrapper', { show: submitSuccess })}>
            <svg className="svg-stock" width="960" height="500"></svg>
            <svg className="svg-chart" width="960" height="500"></svg>
          </div>
        </div>
      </Main>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }

        .chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          visibility: hidden;
          opacity: 0;
          transition: all 1.5s;
        }
        
        .show {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </Layout>
  );
};

export default withD3Service(Stock);

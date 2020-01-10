import { default as React, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import Main from '../components/layout/main';
import Header from '../components/header';
import { apiRoutes } from '../utils/config';
import { colors } from '../components/variables';
import { withD3Service } from '../hocs';

const Stock = ({ d3Service }) => {
  const [indexCode, setIndexCode] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOnChange = event => {
    setIndexCode(event.currentTarget.value);
  };

  const onClickHandler = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.requestStock}?dataset=${indexCode}`
      );
      const { data } = await response.json();

      d3Service.applyStockData(data);
      d3Service.applyChartData(data);

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitSuccess(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Stock Chart</title>
      </Head>
      <Main>
        <Header />
        <div className="container">
          <form className="search-form" action="#">
            <input
              className="search__input"
              type="text"
              placeholder="Enter stock symbol i.e. AAPL, FB"
              onChange={handleOnChange}
            />
            {indexCode && (
              <button className="search__button" onClick={onClickHandler}>
                <svg className="search__icon">
                  <use xlinkHref="app/img/sprite.svg#icon-magnifying-glass"></use>
                </svg>
              </button>
            )}
          </form>
          <div className="chart-wrapper">
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

        .search-form {
          display: flex;
        }

        .search__input {
          font-family: inherit;
          font-size: inherit;
          background-color: ${colors.lighterGrey};
          border: none;
          outline: none;
          padding: 0.7rem 2rem;
          border-radius: 100px;
          transition: all 0.2s;
          margin-right: -3.25rem;
          flex: 0 0 40%;
        }

        .search__input:focus {
          flex: 0 0 43%;
          background-color: #ededed;
        }

        .search__button {
          position: relative;
          top: 1px;
          border: none;
          background-color: unset;
          align-self: center;
          outline: none;
          transition: all 0.2s;
        }

        .search__button:active {
          transform: translateY(2px);
        }

        .search__icon {
          height: 1.3rem;
          width: 1.3rem;
          fill: ${colors.darkerGrey};
        }

        .chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      `}</style>
    </Layout>
  );
};

export default withD3Service(Stock);

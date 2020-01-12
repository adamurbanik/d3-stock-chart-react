import { default as React } from 'react';
import classNames from 'classnames';
import { colors, breakpoints } from '../components/variables';

const SearchForm = ({
  handleOnChange = () => {},
  onClickHandler = () => {},
  indexCode = ''
}) => (
  <>
    <div className="container-form">
      <form className="search-form" action="#">
        <input
          name="search__input"
          className="search__input"
          type="text"
          placeholder="Enter stock symbol i.e. AAPL, FB"
          onChange={handleOnChange}
        />
        <button
          className={classNames('search__button', {
            show: indexCode
          })}
          onClick={onClickHandler}
        >
          <svg className="search__icon">
            <use xlinkHref="app/img/sprite.svg#icon-magnifying-glass"></use>
          </svg>
        </button>
      </form>
      <style jsx>{`
        .container-form {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .search-form {
          display: flex;
          justify-content: center;
          position: relative;
          flex: 0 0 100%;
        }

        .search__input {
          width: 100%;
          font-family: inherit;
          font-size: inherit;
          background-color: ${colors.lighterGrey};
          border: none;
          outline: none;
          padding: 0.7rem 2rem;
          border-radius: 100px;
          transition: all 0.2s;
        }

        .search__input:focus {
          background-color: #ededed;
        }

        .search__button {
          position: absolute;
          right: 15px;
          border: none;
          background-color: unset;
          align-self: center;
          outline: none;
          visibility: hidden;
          transition: all 0.6s;
          opacity: 0;
        }

        .show {
          visibility: visible;
          opacity: 1;
        }

        .search__icon {
          height: 1.3rem;
          width: 1.3rem;
          fill: ${colors.darkerGrey};
        }
        @media screen and (min-width: ${breakpoints.large}) {
          .search-form {
            flex: 0 0 50%;
          }
        }
      `}</style>
    </div>
  </>
);

export default SearchForm;

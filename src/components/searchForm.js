import { default as React } from 'react';
import classNames from 'classnames';
import { colors, breakpoints } from '../components/variables';

const SearchForm = ({
  handleOnChange = () => {},
  onClickHandler = () => {},
  indexCode = ''
}) => (
  <>
    <form className="search-form" action="#">
      <input
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
        flex: 0 0 80%;
      }

      .search__input:focus {
        flex: 0 0 82%;
        background-color: #ededed;
      }

      .search__button {
        position: relative;
        top: 1px;
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

      .search__button:active {
        transform: translateY(2px);
      }

      .search__icon {
        height: 1.3rem;
        width: 1.3rem;
        fill: ${colors.darkerGrey};
      }
      @media screen and (min-width: ${breakpoints.large}) {
        .search__input {
          flex: 0 0 60%;
        }
      }
    `}</style>
  </>
);

export default SearchForm;

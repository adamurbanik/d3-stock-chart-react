import React from 'react';
import { colors, spacing } from './variables';

const Header = () => (
  <header className="header-wrapper">
    <h1>Stock Chart</h1>
    <h2>Select options to see chart data</h2>
    <style jsx>
      {`
        .header-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: ${colors.primary};
          margin-bottom: ${spacing.xl3};
        }

        .header-wrapper > h1 {
          margin-bottom: ${spacing.xl};
        }
      `}
    </style>
  </header>
);

export default Header;

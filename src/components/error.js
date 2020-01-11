import React from 'react';
import { spacing } from './variables';

const Error = () => (
  <div className="error-container">
    <h1 className="error-header">Sorry</h1>
    <p className="error-message">
      This data could not be downloaded. Please try again with a different stock
      code{' '}
    </p>
    <a href="/">Go back</a>
    <style jsx>
      {`
        .error-container {
          margin-top: ${spacing.xl2};
        }

        .error-message {
          margin-top: ${spacing.lg};
          margin-bottom: ${spacing.lg};
        }
      `}
    </style>
  </div>
);

export default Error;

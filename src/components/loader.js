import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { colors, spacing, typography } from "./variables";

const Loader = () => (
  <div className="loading-container">
    <CircularProgress />
    <div className="loading-text">Loading...</div>
    <style jsx>
      {`
        .loading-text {
          font-size: ${typography.xl};
          text-align: center;
          color: ${colors.primary};
          margin-top: ${spacing.md};
        }

        .loading-container {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    </style>
  </div>
);

export default Loader;

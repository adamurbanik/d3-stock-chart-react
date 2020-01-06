//@flow
import * as React from 'react';
import { spacing } from '../variables';

type Props = { children?: React.Node };

const Main = ({ children }: Props): React.Node => (
  <main id="main">
    {children}
    <style jsx>
      {`
        #main {
          margin: 0 auto;
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: ${spacing.xl} ${spacing.lg};
        }
      `}
    </style>
  </main>
);

export default Main;

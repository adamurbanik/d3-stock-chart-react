import * as React from 'react';
import D3Service from '../services/d3Service';
const d3Service = new D3Service();

const withD3Service = Component => props => (
  <Component d3Service={d3Service} {...props} />
);

withD3Service.displayName = 'withD3Service';

export default withD3Service;

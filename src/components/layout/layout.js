import * as React from 'react';
import AppHead from './appHead';

const Layout = ({ children }) => (
  <>
    <AppHead />
    {children}
  </>
);

export default Layout;

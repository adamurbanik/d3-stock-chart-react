//@flow
import * as React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import favicon from '../../public/favicon.ico';
import manifest from '../../public/manifest.json';

const { publicRuntimeConfig } = getConfig();

const getAsset = asset => `${publicRuntimeConfig.assetPrefix}${asset}`;

type PropTypes = {
  children?: React.Node
};

const AppHead = ({ children }: PropTypes) => (
  <Head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href={getAsset(favicon)} />
    <link rel="manifest" href={getAsset(manifest)} />
    {children}
  </Head>
);

export default AppHead;

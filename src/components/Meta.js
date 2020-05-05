import React from 'react';
import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
      <title>Quiz Garden</title>
    </Head>
  );
}

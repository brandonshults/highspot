/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import GlobalContextProvider from './elder-scrolls-viewer/GlobalContextProvider';
import Page from './elder-scrolls-viewer/components/Page';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Page />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
